import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

export const GuessResults = ({ answer, guesses }) => {
  const rows = range(0, NUM_OF_GUESSES_ALLOWED);

  return (
    <div className="guess-results">
      {rows.map((index) => {
        const { id = index, word = "" } = guesses[index] || {};
        const labelText = `row-${index + 1}`;
        const results =
          checkGuess(word, answer) ||
          range(0, 5).map(() => ({ letter: null, status: null }));

        return <Guess key={id} results={results} labelText={labelText} />;
      })}
    </div>
  );
};

const Guess = ({ results, labelText }) => {
  return (
    <p className="guess" role="group" aria-label={labelText}>
      {range(0, 5).map((index) => {
        const { letter, status } = results[index];
        const labelText = letter ?? "empty";

        return (
          <span
            key={index}
            className={status ? `cell ${status}` : "cell"}
            role="img"
            aria-label={labelText}
          >
            {letter}
          </span>
        );
      })}
    </p>
  );
};
