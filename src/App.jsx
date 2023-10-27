import { useState } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { SearchBar } from "./components/Header/SearchBar";
import { FoundResult } from "./components/Header/FoundResults";
import { ListBox } from "./components/Main/FoundMoviesListBox/ListBox";
import { MoviesList } from "./components/Main/FoundMoviesListBox/MoviesList";
import { Summary } from "./components/Main/WatchedMoviesListBox/Summary";
import { WatchedMoviesList } from "./components/Main/WatchedMoviesListBox/WatchedMoviesList";
import { useEffect } from "react";
import { Loading } from "./components/Loading/Loading";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";
import { MovieDetails } from "./components/Main/MovieDetails/MovieDetails";




const KEY = "8c1320d";

export default function App() {
  // useState
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedMovieId((selectedMovieId) =>
      selectedMovieId === id ? null : id
    );
  }

  function handleCloseMovieDetail() {
    setSelectedMovieId(null);
  }

  // useEffect
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Someting went wrong with fetching movie List");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie no found");
          }

          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Header>
        <SearchBar query={query} setQuery={setQuery} />
        <FoundResult movies={movies} />
      </Header>

      <Main>
        <ListBox>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              onSelectMovie={handleSelectMovie}
              selectedMovieId={selectedMovieId}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>

        <ListBox>
          {selectedMovieId ? (
            <MovieDetails
              selectedId={selectedMovieId}
              onCloseMovieDetail={handleCloseMovieDetail}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
