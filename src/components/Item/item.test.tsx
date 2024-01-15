import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Item as ItemProps } from "../types";
import { Item } from "./Item";

// Testing blog
// https://www.robinwieruch.de/react-testing-library/

const mockProps: ItemProps = {
  item: { id: "1", type: "🍒" },
  onDragEnd: jest.fn(),
  onDragOver: jest.fn(),
  onDragStart: jest.fn(),
};

describe("<Item/>", () => {
  it("will render an item with an emoji", () => {
    render(<Item {...mockProps} />);
    expect(screen.getByLabelText("paragraph").childNodes[0]).toHaveTextContent(
      "🍒"
    );
  });
});
