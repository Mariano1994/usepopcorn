import { useState } from "react";
import { Star } from "./Star";
import PropTypes from "prop-types"


const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  maxiRating : PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
}

export function StarRating({
  maxiRating = 5,
  color = "#fcc419",
  size = 24,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempoRating] = useState(0);

  const textStyle = {
    lineHeiht: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <>
      <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
          {Array.from({ length: maxiRating }, (__, i) => {
            return (
              <Star
                key={i}
                full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                onRate={() => handleRating(i + 1)}
                onHoverIn={() => setTempoRating(i + 1)}
                onHoverOut={() => setTempoRating(0)}
                color={color}
                size={size}
              />
            );
          })}
        </div>
        <p style={textStyle}>
          {messages.length === maxiRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ""}
        </p>
      </div>
    </>
  );
}
