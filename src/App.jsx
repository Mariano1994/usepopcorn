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

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "8c1320d";

export default function App() {
  // useState
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState("");
  // useEffect
  useEffect(function () {
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

        if(data.Response === 'False') throw new Error('Movie no found')
        setMovies(data.Search);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if(query.length < 4){
      setMovies([]);
      setError('')
      return
    }

    fetchMovies();
  }, [query]);


  // function handleSetNewQuery(event) {
  //   event.preventDefault();
  //   setQuery(event.target.value)
  // }

  return (
    <>
      <Header>
        <SearchBar query={query} setQuery={setQuery}/>
        <FoundResult movies={movies} />
      </Header>

      <Main>
        <ListBox>
          {/* {isLoading ? <Loading /> : <MoviesList movies={movies} />} */}

          {isLoading && <Loading />}
          {!isLoading && !error && <MoviesList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </ListBox>

        <ListBox>
          <Summary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </ListBox>
      </Main>
    </>
  );
}
