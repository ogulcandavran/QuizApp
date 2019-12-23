import React from "react";

const htmlEscape = {
  "&#039;": "'",
  "&quot;": "'",
  "&eacute;": "'",
  ".&quot;": "'",
  ".&amp;":"&"
};
export default function QuizQuestions({
  questionArray,
  handleCorrectAnswer,
  handleArrayFilter,
  answerClickAllowed,
  handleAnswerClickAllowed,
  greenAnswer,
  handleGreenAnswer,
  handleRedAnswer
}) {
  return (
    <div>
      {nextQuestion(
        questionArray,
        handleCorrectAnswer,
        handleArrayFilter,
        answerClickAllowed,
        handleAnswerClickAllowed,
        greenAnswer,
        handleGreenAnswer,
        handleRedAnswer
      )}
    </div>
  );
}

const nextQuestion = (
  questionArray,
  handleCorrectAnswer,
  handleArrayFilter,
  answerClickAllowed,
  handleAnswerClickAllowed,
  greenAnswer,
  handleGreenAnswer,
  handleRedAnswer
) => {
  return (
    <div className="questions">
      <div className="page-number">
        {" "}
        <span style={{ fontSize: "14px", color: "#072d29" }}>
          Question
        </span>{" "}
        <span>{10 - questionArray.length + 1}</span> / 10
      </div>
      <h3>
        {questionArray[0]["question"].replace(
          /&#?\w+.;/g,
          match => htmlEscape[match]
        )}
      </h3>
      <div className="selections">
        {questionArray[0]["questions"].map((question, index) => {
          return (
            <p
              key={index}
              className={
                greenAnswer.greenAnswer === question
                  ? "green"
                  : greenAnswer.redAnswer === question
                  ? "red"
                  : null
              }
              onClick={() =>
                correctOrFalse(
                  question,
                  questionArray,
                  handleCorrectAnswer,
                  handleArrayFilter,
                  answerClickAllowed,
                  handleAnswerClickAllowed,
                  handleGreenAnswer,
                  handleRedAnswer
                )
              }
            >
              {question.replace(/&#?\w+;/, match => htmlEscape[match])}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const correctOrFalse = (
  question,
  questionArray,
  handleCorrectAnswer,
  handleArrayFilter,
  answerClickAllowed,
  handleAnswerClickAllowed,
  handleGreenAnswer,
  handleRedAnswer
) => {
  if (question === questionArray[0]["correct_answer"] && answerClickAllowed) {
    handleGreenAnswer(question);
    handleCorrectAnswer();
    setTimeout(() => handleArrayFilter(), 1100);
  }
  if (question !== questionArray[0]["correct_answer"] && answerClickAllowed) {
    handleRedAnswer(question);
    handleAnswerClickAllowed();
    setTimeout(() => handleArrayFilter(), 1100);
  }
  
};
