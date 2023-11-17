// import { useEffect } from "react";

import { useEffect } from "react";
import { useRef } from "react";

export function SearchBar({ query, setQuery }) {
  const inputElement = useRef(null);

  useEffect(() => {
    function callBack(event) {

      if(document.activeElement === inputElement.current) return 
      if (event.code == "Enter") {
        inputElement.current.focus();
        setQuery('')
      }
    }

    document.addEventListener("keydown", callBack);
    return () => document.addEventListener("keydown", callBack);
  },[setQuery]);

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
      />
    </>
  );
}
