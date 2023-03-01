export const Banner = ({
  answer,
  hasCorrectGuess,
  attemptsCount,
  onClickRestart,
}) => {
  const bannerType = hasCorrectGuess ? "happy" : "sad";

  const messageMap = {
    happy: (
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>{attemptsCount} guesses</strong>.
      </p>
    ),
    sad: (
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    ),
  };

  return (
    <div role="banner" className={`${bannerType} banner`}>
      {messageMap[bannerType]}
      <button className="restart-game" onClick={onClickRestart}>
        restart
      </button>
    </div>
  );
};
