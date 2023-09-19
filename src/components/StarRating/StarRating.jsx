import { useState } from "react";
import { Star } from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const textStyle = {
  lineHeiht: "1",
  margin: "0",
};

export function StarRating({ maxiRating = 5 }) {
  const [rating, setRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }

  return (
    <>
      <div style={containerStyle}>
        <div style={starContainerStyle}>
          {Array.from({ length: maxiRating }, (__, i) => {
            return (
              <Star
                key={i}
                onRate={() => handleRating(i + 1)}
                full={rating >= i + 1}
              />
            );
          })}
        </div>
        <p style={textStyle}>{rating || ""}</p>
      </div>
    </>
  );
}
