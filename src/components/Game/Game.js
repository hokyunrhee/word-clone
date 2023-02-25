import React from "react";

import { GuessInput } from "../GuessInput";
import { GuessResults } from "../GuessResults";
import { Banner } from "../Banner";
import { checkGuess } from "../../game-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function Game({ answer }) {
  const [guesses, setGuesses] = React.useState([]);
  const hasCorrectGuess = guesses.some(({ result }) =>
    result.every(({ status }) => status === "correct")
  );
  const attemptsCount = guesses.length;
  const isGameOver =
    hasCorrectGuess || attemptsCount === NUM_OF_GUESSES_ALLOWED;

  const handleSubmit = (word) => {
    const result = checkGuess(word, answer);
    setGuesses([...guesses, { id: guesses.length, result }]);
  };

  return (
    <>
      <GuessResults guesses={guesses} />
      <GuessInput onSubmit={handleSubmit} disabled={isGameOver} />
      {isGameOver && (
        <Banner
          hasCorrectGuess={hasCorrectGuess}
          attemptsCount={attemptsCount}
          answer={answer}
        />
      )}
    </>
  );
}

export default Game;
