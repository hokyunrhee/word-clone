import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { GuessInput } from "../GuessInput";
import { GuessResults } from "../GuessResults";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);

  const handleSubmit = (word) => {
    setGuesses([...guesses, { id: guesses.length, word }]);
  };

  return (
    <>
      <GuessResults guesses={guesses} />
      <GuessInput onSubmit={handleSubmit} />
    </>
  );
}

export default Game;
