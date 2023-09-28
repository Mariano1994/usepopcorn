import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { StarRating } from "./components/StarRating/StarRating";
// import App from './App.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}

    <StarRating
      maxiRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={20} color="#121214" className="test" defaultRating={3} />

    <Test />
  </React.StrictMode>
);

function Test() {
  const [moveieRating, setMovieRating] = useState(0);
  return (
    <>
      <StarRating
        color="blue"
        size={15}
        maxiRating={10}
        onSetRating={setMovieRating}
      />
      <p>This move was rating {moveieRating} stars</p>
    </>
  );
}
