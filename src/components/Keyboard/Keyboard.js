import { useEffect } from "react";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

export const Keyboard = ({ onKeyPress, pressedKeys, disabled }) => {
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (event) => onKeyPress(event.key);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, onKeyPress]);

  return (
    <div className="keyboard" role="group" aria-label="keyboard">
      {KEYS.map((row, index) => (
        <div key={index} className={`keyboard-row row-${index + 1}`}>
          {row.map((key) => {
            const status = pressedKeys[key];
            const className = status
              ? `key key-${key.toLowerCase()} ${status}`
              : `key key-${key.toLowerCase()}`;

            return (
              <button
                key={key}
                type="button"
                data-key={key}
                className={className}
                disabled={disabled}
                onClick={(event) => onKeyPress(event.target.dataset.key)}
              >
                {key === "Backspace" ? <Backspace /> : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Backspace = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
    </svg>
  );
};
