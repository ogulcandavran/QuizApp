import React from "react";

export default function Result({ correctAnswerCount, handleReset }) {
  return (
    <div className="result-container">
      <p>Your Score</p>
      <div className="outer-div">
        %{correctAnswerCount * 10}{" "}
        <div
          className="inner-div"
          style={{ width: `${correctAnswerCount * 50}px` }}
        ></div>
      </div>
      <button onClick={() => handleReset()}>Play Again</button>
    </div>
  );
}
