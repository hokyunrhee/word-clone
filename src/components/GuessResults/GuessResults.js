import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

export const GuessResults = ({ results }) => {
  const rows = range(0, NUM_OF_GUESSES_ALLOWED);

  return (
    <div className="guess-results">
      {rows.map((index) => {
        const { id = index, result = [] } = results[index] || {};
        const labelText = `row-${index + 1}`;

        return <Guess key={id} result={result} labelText={labelText} />;
      })}
    </div>
  );
};

const Guess = ({ result, labelText }) => {
  return (
    <p className="guess" role="group" aria-label={labelText}>
      {range(0, 5).map((index) => {
        const { letter = null, status = null } = result[index] || {};
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
