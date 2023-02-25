import Game from "../Game";
import Header from "../Header";
import { sample } from "../../utils";
import { WORDS } from "../../data";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="game-wrapper">
        <Game answer={answer} />
      </div>
    </div>
  );
}

export default App;
