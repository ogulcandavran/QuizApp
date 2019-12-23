import React, { useState, useEffect } from "react";
import QuizQuestions from "./QuizQuestions";
import Result from "./Result";
import ApiError from "./ApiError";
export default function QuizPage({ category, difficulty, handleReset }) {
  const [questionArray, setQuestionArray] = useState(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [answerClickAllowed, setAnswerClickAllowed] = useState(true);
  const [greenAnswer, setGreenAnswer] = useState({
    greenAnswer: "",
    redAnswer: ""
  });
 

  useEffect(() => {
    apiCall(setQuestionArray, category, difficulty);
    // eslint-disable-next-line
  }, []);

  const handleGreenAnswer = correct => {
    setGreenAnswer({ ...greenAnswer, greenAnswer: correct });
  };

  const handleRedAnswer = wrong => {
    setGreenAnswer({ ...greenAnswer, redAnswer: wrong });
  };

  const handleAnswerClickAllowed = () => {
    setAnswerClickAllowed(false);
  };

  const handleArrayFilter = () => {
    setQuestionArray(
      questionArray.filter((item, index, arr) => arr.indexOf(item) !== 0)
    );
    setAnswerClickAllowed(true);
    setGreenAnswer({ greenAnswer: "", redAnswer: "" });
  };
  const handleCorrectAnswer = () => {
    setCorrectAnswerCount(correctAnswerCount + 1);
    setAnswerClickAllowed(false);
  };
  if (!questionArray) {
    return (
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  if (questionArray['response_code'] === 1 ) {
    return <ApiError handleReset={handleReset}/>;
  }

  if (questionArray.length === 0) {
    return (
      <Result
        correctAnswerCount={correctAnswerCount}
        handleReset={handleReset}
      />
    );
  }

  if (questionArray.length !== 0) {
    return (
      <QuizQuestions
        questionArray={questionArray}
        handleCorrectAnswer={handleCorrectAnswer}
        handleArrayFilter={handleArrayFilter}
        answerClickAllowed={answerClickAllowed}
        handleAnswerClickAllowed={handleAnswerClickAllowed}
        handleRedAnswer={handleRedAnswer}
        handleGreenAnswer={handleGreenAnswer}
        greenAnswer={greenAnswer}
      />
    );
  }
}

const apiCall = async (setQuestionArray, category, difficulty) => {
  try {
    await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then(response => response.json())
      .then(
        json => {
          if (json["response_code"] === 1) {
            return setQuestionArray(json);
          } else {
            setQuestionArray(
              json.results
                .map(question => [
                  ...question["incorrect_answers"],
                  question["correct_answer"]
                ])
                .map(item => shuffle(item))
                .map((item, index) => {
                  return { ...json.results[index], questions: item };
                })
            );
          }
        }
      );
  } catch (error) {
    console.log(error);
  }
};

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};
