import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GuessInput } from "./GuessInput";

describe("GuessInput", () => {
  it("renders a form", () => {
    render(<GuessInput />);

    expect(screen.getByText(/enter guess/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("submits user input in uppercase", async () => {
    const spy = jest.spyOn(console, "log");
    const user = userEvent.setup();

    render(<GuessInput />);

    await user.click(screen.getByText(/enter guess/i));

    await user.keyboard("hello{enter}");

    expect(spy).toHaveBeenCalledWith("HELLO");
    expect(screen.getByRole("textbox")).toHaveValue('')
  });

  it("does not submit less than 5 characters", async () => {
    const spy = jest.spyOn(console, "log");
    const user = userEvent.setup();

    render(<GuessInput />);

    await user.type(screen.getByRole("textbox"), "hi{enter}");

    expect(spy).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox")).toHaveValue('hi')
  });
});
