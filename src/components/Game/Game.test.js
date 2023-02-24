import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Game from "./Game";

describe("Game", () => {
  it("displays guesses submitted", async () => {
    const user = userEvent.setup();

    render(<Game />);

    await user.type(screen.getByRole("textbox"), "apple{enter}");

    expect(await screen.findByText("APPLE")).toBeInTheDocument();

    await user.type(screen.getByRole("textbox"), "agent{enter}");

    expect(await screen.findByText("AGENT")).toBeInTheDocument();
  });
});
