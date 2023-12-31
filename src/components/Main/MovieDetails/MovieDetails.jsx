import { useState } from "react";
import { useEffect } from "react";
import { isConstructorDeclaration } from "typescript";
import { Loading } from "../../Loading/Loading";
import { StarRating } from "../../StarRating/StarRating";

const KEY = "8c1320d";

export function MovieDetails({
  selectedId,
  onCloseMovieDetail,
  onAddWatchMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  const userMovieRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runTime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runTime: Number(runTime.split("").at(0)),
      userRating,
    };
    onAddWatchMovie(newWatchedMovie);
    onCloseMovieDetail();
  }

  useEffect(
    function () {

      function callBack(event) {
        if (event.code === "Escape") {
          onCloseMovieDetail();
        }
      }

      document.addEventListener("keydown",callBack);
      return function(){
        document.removeEventListener('keydown', callBack)
      }
    },
    [onCloseMovieDetail]
  );

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <>
      <div className="details">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovieDetail}>
                &larr;
              </button>

              <img src={poster} alt={`Poster of ${movie} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runTime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span> {imdbRating} IMDb rating
                </p>
              </div>
            </header>

            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxiRating={10}
                      size={22}
                      key={selectedId}
                      onSetRating={setUserRating}
                    />

                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        Add to watched list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    Move already on the list. Reated with {userMovieRating}{" "}
                    <span>⭐️</span>
                  </p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Staring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
}
