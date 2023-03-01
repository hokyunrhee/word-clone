import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Game from "./Game";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { useAnswer } from "../useAnswer";

jest.mock("../useAnswer", () => ({
  useAnswer: jest.fn(),
}));

describe("Game", () => {
  beforeEach(() => {
    useAnswer.mockReturnValue({ data: "PEARL", refetch: jest.fn() });
  });

  it(`displays ${NUM_OF_GUESSES_ALLOWED} rows and each row has 5 spans`, async () => {
    render(<Game />);

    const rows = screen.getAllByRole("group", { name: /row/i });
    expect(rows).toHaveLength(NUM_OF_GUESSES_ALLOWED);

    rows.forEach((row) => {
      expect(within(row).getAllByRole("img")).toHaveLength(5);
    });
  });

  it("displays word submitted", async () => {
    const user = userEvent.setup();

    render(<Game />);

    await user.keyboard("apple{enter}");

    const row1 = screen.getByLabelText("row-1");
    expect(within(row1).getByLabelText("A")).toBeInTheDocument();
    expect(within(row1).getAllByLabelText("P")).toHaveLength(2);
    expect(within(row1).getByLabelText("L")).toBeInTheDocument();
    expect(within(row1).getByLabelText("E")).toBeInTheDocument();

    const row2 = screen.getByLabelText("row-2");
    expect(within(row2).getAllByLabelText("empty")).toHaveLength(5);
  });

  it("show happy banner if user wins", async () => {
    const user = userEvent.setup();

    render(<Game />);

    await user.keyboard("apple{enter}");
    await user.keyboard("pearl{enter}");

    expect(await screen.findByRole("banner")).toHaveTextContent(
      /congratulations! got it in 2 guesses/i
    );
  });

  it("show sad banner if user loses and blocks user input", async () => {
    const user = userEvent.setup();

    render(<Game />);

    await user.keyboard("apple{enter}");
    await user.keyboard("whale{enter}");
    await user.keyboard("labor{enter}");
    await user.keyboard("grand{enter}");
    await user.keyboard("house{enter}");
    await user.keyboard("great{enter}");

    expect(await screen.findByRole("banner")).toHaveTextContent(
      /sorry, the correct answer is PEARL/i
    );

    const buttons = screen.getAllByRole("button", { name: /^[a-zA-Z]{1}$/i });
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("restart game if user click restart button", async () => {
    const user = userEvent.setup();

    render(<Game />);

    await user.keyboard("apple{enter}");
    await user.keyboard("whale{enter}");
    await user.keyboard("labor{enter}");
    await user.keyboard("grand{enter}");
    await user.keyboard("house{enter}");
    await user.keyboard("great{enter}");

    expect(
      await screen.findByRole("button", { name: /restart/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /restart/i }));

    const rows = screen.getAllByRole("group", { name: /row/i });
    rows.forEach((row) => {
      const cells = within(row).getAllByRole("img");
      cells.forEach((cell) => {
        expect(cell).toHaveTextContent("");
      });
    });
  });
});
