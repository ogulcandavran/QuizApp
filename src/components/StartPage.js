import React, { useState } from "react";
import icon from "../assets/icon.png";

export default function StartPage(props) {
  const [categoryNextButton, setCategoryNextButton] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedDiff, setSelectedDiff] = useState(null);
  const [startButton, setStartButton] = useState(false);
  return (
    <div>
      {conditionalRender(
        props,
        categoryNextButton,
        setCategoryNextButton,
        selected,
        setSelected,
        selectedDiff,
        setSelectedDiff,
        startButton,
        setStartButton
      )}
    </div>
  );
}
//Helpers
const conditionalRender = (
  props,
  categoryNextButton,
  setCategoryNextButton,
  selected,
  setSelected,
  selectedDiff,
  setSelectedDiff,
  startButton,
  setStartButton
) => {
  const categories = Object.keys(props.categories);
  const difficulty = {
    easy: "easy",
    medium: "medium",
    hard: "hard"
  };
  if (!props.categoryToggle || !categoryNextButton) {
    return (
      <div className="start-page-container">
        <div className="page-number">
          <span>1</span> / 2
        </div>
        <h3
          className={
            !props.categoryToggle && categoryNextButton ? "bouncy" : null
          }
        >
          Please Select a Category
        </h3>
        {categories.map((category, index) => {
          return (
            <p
              onClick={() => {
                props.handleCategory(props.categories[category]);
                setSelected(category);
                setCategoryNextButton(false);
              }}
              key={index}
              className={category === selected ? "selected" : null}
            >
              {category}
            </p>
          );
        })}
        <button
          onClick={() => {
            categoryNextButton
              ? setCategoryNextButton(false)
              : setCategoryNextButton(true);
          }}
        >
          NEXT >
        </button>
      </div>
    );
  }
  // PAGE 2
  if (props.categoryToggle && categoryNextButton) {
    return (
      <div className="start-page-container pseudo">
        <div className="page-number">
          <span>2</span> / 2
        </div>
        <div className="previous-page">
          <img
            src={icon}
            alt="icon"
            onClick={() => setCategoryNextButton(false)}
          ></img>
          Back
        </div>
        <h3
          className={!props.difficultyToggle && startButton ? "bouncy" : null}
        >
          Please Select a Difficulty Level
        </h3>
        {Object.keys(difficulty).map((item, i) => {
          return (
            <p
              key={i}
              onClick={() => {
                props.handleDifficulty(difficulty[item]);
                setSelectedDiff(difficulty[item]);
                setStartButton(false);
              }}
              className={difficulty[item] === selectedDiff ? "selected" : null}
            >
              {difficulty[item]}
            </p>
          );
        })}
        <button
          onClick={() => {
            startButton ? setStartButton(false) : setStartButton(true);
            handleStartHelper(props);
          }}
        >
          START
        </button>
      </div>
    );
  }
};

const handleStartHelper = props => {
  if (props.difficultyToggle) {
    return props.handleStartButton();
  }
};

