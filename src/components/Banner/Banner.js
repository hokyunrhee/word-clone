export const Banner = ({ answer, hasCorrectGuess, attemptsCount }) => {
  return (
    <>
      {hasCorrectGuess ? (
        <HappyBanner attemptsCount={attemptsCount} />
      ) : (
        <SadBanner answer={answer} />
      )}
    </>
  );
};

const HappyBanner = ({ attemptsCount }) => {
  return (
    <div role="banner" className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>{attemptsCount} guesses</strong>.
      </p>
    </div>
  );
};

const SadBanner = ({ answer }) => {
  return (
    <div role="banner" className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );
};
