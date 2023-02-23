import React from "react";

export const GuessInput = () => {
  const [guess, setGuess] = React.useState("");

  const handleChange = (event) => setGuess(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(guess.toUpperCase());
    setGuess("");
  };

  const disabled = guess.length < 5;

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit} >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        pattern="[a-zA-Z]{5,}"
        title="Must be longer than 5 characters"
        value={guess}
        onChange={handleChange}
         
      />
      <button className="visually-hidden" type='submit' disabled={disabled}></button>
    </form>
  );
};
