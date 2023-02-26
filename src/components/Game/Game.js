import React from "react";

import { GuessResults } from "../GuessResults";
import { Banner } from "../Banner";
import { checkGuess } from "../../game-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { Keyboard } from "../Keyboard";

function Game({ answer }) {
  const [guesses, setGuesses] = React.useState([]);
  const [numOfCheckedGuess, setNumOfCheckedGuess] = React.useState(0);

  const results = guesses.map((guess, index) => {
    if (index < numOfCheckedGuess) {
      return { id: index, result: checkGuess(guess, answer) };
    }

    return {
      id: index,
      result: guess.split("").map((letter) => ({ letter, status: null })),
    };
  });

  const pressedKeys = results.slice(0, numOfCheckedGuess).reduce((acc, cur) => {
    const keysStatus = cur["result"].reduce((acc, cur) => {
      const { letter, status } = cur;
      acc[letter] = status;

      return acc;
    }, {});

    const statusMap = {
      "correct-correct": "correct",
      "correct-misplaced": "correct",
      "correct-incorrect": "correct",
      "misplaced-correct": "correct",
      "misplaced-misplaced": "misplaced",
      "misplaced-incorrect": "misplaced",
      "incorrect-correct": "correct",
      "incorrect-misplaced": "misplaced",
      "incorrect-incorrect": "incorrect",
    };

    for (const key in acc) {
      const hasKey = keysStatus[key];
      if (hasKey) {
        const newStatus = statusMap[`${acc[key]}-${keysStatus[key]}`];
        keysStatus[key] = newStatus;
      }
    }

    return { ...acc, ...keysStatus };
  }, {});

  const hasCorrectGuess = results.some(({ result }) => {
    const hasResult = Boolean(result.length);

    if (!hasResult) return false;

    return result.every(({ status }) => status === "correct");
  });

  const isGameOver =
    hasCorrectGuess || numOfCheckedGuess === NUM_OF_GUESSES_ALLOWED;

  const handleKeyPress = (key) => {
    if (/^[a-zA-Z]{1}$/.test(key)) {
      const guess = (guesses.slice(-1).join("") + key).slice(0, 5);
      const newGuesses = [...guesses.slice(0, -1), guess];
      setGuesses(newGuesses);
      return;
    }

    if ("Backspace" === key) {
      const guess = guesses.slice(-1).join("").slice(0, -1);
      const newGuesses = [...guesses.slice(0, -1), guess];
      setGuesses(newGuesses);
      return;
    }

    if ("Enter" === key) {
      const lengthOfWord = guesses.slice(-1).join("").length;
      if (lengthOfWord < 5) {
        window.alert("Not enough letters");
        return;
      }
      setNumOfCheckedGuess(numOfCheckedGuess + 1);
      setGuesses([...guesses, ""]);
      return;
    }
  };

  return (
    <>
      <GuessResults results={results} />
      <Keyboard
        onKeyPress={handleKeyPress}
        pressedKeys={pressedKeys}
        disabled={isGameOver}
      />
      {isGameOver && (
        <Banner
          hasCorrectGuess={hasCorrectGuess}
          attemptsCount={numOfCheckedGuess}
          answer={answer}
        />
      )}
    </>
  );
}

export default Game;
