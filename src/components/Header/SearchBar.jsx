// import { useEffect } from "react";

import { useEffect } from "react";
import { useRef } from "react";

export function SearchBar({query, setQuery}) {

  useEffect(() => {
    inputElement.current.focus()
  })

  const inputElement = useRef(null)
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
