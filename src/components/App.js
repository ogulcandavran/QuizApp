import React, { useState } from "react";
import StartPage from "./StartPage";
import QuizPage from "./QuizPage";

const categories = {
  animals: 27,
  politics: 24,
  history: 23,
  sports: 21,
  film: 11,
  books: 10,
  "video games": 15
};

export default function App() {
  const [appState, setAppState] = useState({
    category: "",
    difficulty: "",
    canWeStart: false
  });
  const handleReset = () => {
    setAppState({ canWeStart: false, difficulty: "", category: "" });
  };

  const handleStartButton = () => {
    setAppState({ ...appState, canWeStart: true });
  };

  const handleCategory = cat => {
    setAppState({ ...appState, category: cat });
  };

  const handleDifficulty = dif => {
    setAppState({ ...appState, difficulty: dif });
  };
  const conditionalRender = () => {
    if (!appState.category || !appState.difficulty || !appState.canWeStart) {
      return (
        <StartPage
          categories={categories}
          handleCategory={handleCategory}
          categoryToggle={appState.category}
          difficultyToggle={appState.difficulty}
          handleDifficulty={handleDifficulty}
          handleStartButton={handleStartButton}
        />
      );
    }
    if (appState.category && appState.difficulty && appState.canWeStart) {
      return (
        <QuizPage
          category={appState.category}
          difficulty={appState.difficulty}
          handleReset={handleReset}
        />
      );
    }
  };

  return (
    <div className="container">
      <div className="section">{conditionalRender()}</div>
    </div>
  );
}

/* export default class App extends React.Component {
  state = { category: "", difficulty: "", canWeStart: false };
  conditionalRender = () => {
    if (
      !this.state.category ||
      !this.state.difficulty ||
      !this.state.canWeStart
    ) {
      return (
        <StartPage
          categories={categories}
          handleCategory={this.handleCategory}
          categoryToggle={this.state.category}
          difficultyToggle={this.state.difficulty}
          handleDifficulty={this.handleDifficulty}
          handleStartButton={this.handleStartButton}
        />
      );
    }
    if (this.state.category && this.state.difficulty && this.state.canWeStart) {
      return (
        <QuizPage
          category={this.state.category}
          difficulty={this.state.difficulty}
          handleReset={this.handleReset}
        />
      );
    }
  };

  handleReset = () => {
    this.setState({ canWeStart: false, difficulty: "", category: "" });
  };

  handleStartButton = () => {
    this.setState({ canWeStart: true });
  };

  handleCategory = cat => {
    this.setState({ category: cat });
  };

  handleDifficulty = dif => {
    this.setState({ difficulty: dif });
  };
  render() {
    return (
      <div className="container">
        <div className="section">{this.conditionalRender()}</div>
      </div>
    );
  }
}
 */
