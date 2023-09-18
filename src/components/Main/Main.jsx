import { FoundMoviesListBox } from "././FoundMoviesListBox/FoundMoviesListBox"
import { WathedMoviesListBox } from "././WatchedMoviesListBox/WatchedMoviesListBox";
import './Main.css'

export function Main({movies}) {
  
  return (
    <>
      <main className="main">

        <FoundMoviesListBox movies={movies}/>
        <WathedMoviesListBox/>
        
      </main>
    </>
  );
}
