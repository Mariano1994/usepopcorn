import { FoundResult } from "./FoundResults";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import "./Header.css";

export function Header({ movies }) {
  return (
    <>
      <header>
        <nav className="nav-bar">
          <Logo />
          <SearchBar />
          <FoundResult movies={movies}/>
        </nav>
      </header>
    </>
  );
}
