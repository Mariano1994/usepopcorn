export function FoundResult({ movies }) {

  const totalMovies = movies.length;
  return (
    <>
      <p className="num-results">
        Found <strong>{totalMovies}</strong> results
      </p>
    </>
  );
}
