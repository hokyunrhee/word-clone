import { render, screen, within } from "@testing-library/react";

import { GuessResults } from "./GuessResults";

describe("GuessResults", () => {
  it("displays 3 possible statuses", () => {
    const answer = "WORLD";
    const guesses = [
      { id: 0, word: "WHALE" },
      { id: 1, word: "NOVEL" },
    ];

    render(<GuessResults answer={answer} guesses={guesses} />);

    const row1 = screen.getByLabelText("row-1");
    expect(within(row1).getByLabelText("W")).toHaveClass("cell", "correct");
    expect(within(row1).getByLabelText("H")).toHaveClass("cell", "incorrect");
    expect(within(row1).getByLabelText("A")).toHaveClass("cell", "incorrect");
    expect(within(row1).getByLabelText("L")).toHaveClass("cell", "correct");
    expect(within(row1).getByLabelText("E")).toHaveClass("cell", "incorrect");

    const row2 = screen.getByLabelText("row-2");
    expect(within(row2).getByLabelText("N")).toHaveClass("cell", "incorrect");
    expect(within(row2).getByLabelText("O")).toHaveClass("cell", "correct");
    expect(within(row2).getByLabelText("V")).toHaveClass("cell", "incorrect");
    expect(within(row2).getByLabelText("E")).toHaveClass("cell", "incorrect");
    expect(within(row2).getByLabelText("L")).toHaveClass("cell", "misplaced");
  });
});
