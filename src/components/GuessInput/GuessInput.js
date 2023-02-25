import React from "react";

export const GuessInput = ({ onSubmit, disabled }) => {
  const [guess, setGuess] = React.useState("");

  const handleChange = (event) => setGuess(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(guess.toUpperCase());
    setGuess("");
  };

  const isInputDisabled = disabled;
  const isButtondisabled = guess.length < 5 || disabled;

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
        disabled={isInputDisabled}
      />
      <button
        className="visually-hidden"
        type="submit"
        disabled={isButtondisabled}
      />
    </form>
  );
};
