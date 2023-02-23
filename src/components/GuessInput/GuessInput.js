import React from "react";

export const GuessInput = ({ onSubmit }) => {
  const [guess, setGuess] = React.useState("");

  const handleChange = (event) => setGuess(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(guess.toUpperCase());
    setGuess("");
  };

  const disabled = guess.length < 5;

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        pattern="[a-zA-Z]{5,}"
        placeholder="longer than 5 characters"
        title="Enter alphabets only"
        value={guess}
        onChange={handleChange}
      />
      <button
        className="visually-hidden"
        type="submit"
        disabled={disabled}
      ></button>
    </form>
  );
};
