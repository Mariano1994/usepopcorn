import { FoundMoviesListBox } from "././FoundMoviesListBox/FoundMoviesListBox"
import { WathedMoviesListBox } from "././WatchedMoviesListBox/WatchedMoviesListBox";
import './Main.css'

export function Main() {
  
  return (
    <>
      <main className="main">

        <FoundMoviesListBox/>
        <WathedMoviesListBox/>
        
      </main>
    </>
  );
}
