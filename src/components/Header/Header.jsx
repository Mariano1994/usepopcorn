import "./Header.css";
import { Logo } from "./Logo";

export function Header({ children }) {
  return (
    <>
      <header>
        <nav className="nav-bar">
        <Logo />
          {children}
        </nav>
      </header>
    </>
  );
}
