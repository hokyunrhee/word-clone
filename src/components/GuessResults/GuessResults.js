import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

export const GuessResults = ({ guesses }) => {
  const rows = range(0, NUM_OF_GUESSES_ALLOWED);

  return (
    <div className="guess-results">
      {rows.map((index) => {
        const { id = index, word = "" } = guesses[index] || {};
        const labelText = `row-${index + 1}`;

        return <Guess key={id} word={word} labelText={labelText} />;
      })}
    </div>
  );
};

const Guess = ({ word, labelText }) => {
  const characters = word.split("");

  return (
    <p className="guess" role="group" aria-label={labelText}>
      {range(0, 5).map((index) => {
        const labelText = characters[index] ?? "empty";

        return (
          <span key={index} className="cell" role="img" aria-label={labelText}>
            {characters[index]}
          </span>
        );
      })}
    </p>
  );
};
