import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Game from "./Game";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

describe("Game", () => {
  it(`displays ${NUM_OF_GUESSES_ALLOWED} rows and each row has 5 spans`, async () => {
    render(<Game />);

    const rows = screen.getAllByRole("group");
    expect(rows).toHaveLength(NUM_OF_GUESSES_ALLOWED);

    rows.forEach((row) => {
      expect(within(row).getAllByRole("img")).toHaveLength(5);
    });
  });

  it("displays word submitted", async () => {
    const user = userEvent.setup();

    render(<Game />);

    await user.type(screen.getByRole("textbox"), "apple{enter}");

    const row1 = screen.getByLabelText("row-1");
    expect(within(row1).getByLabelText("A")).toBeInTheDocument();
    expect(within(row1).getAllByLabelText("P")).toHaveLength(2);
    expect(within(row1).getByLabelText("L")).toBeInTheDocument();
    expect(within(row1).getByLabelText("E")).toBeInTheDocument();

    const row2 = screen.getByLabelText("row-2");
    expect(within(row2).getAllByLabelText("empty")).toHaveLength(5);
  });
});
