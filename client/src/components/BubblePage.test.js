import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import {getColorList as mockColorList} from "../api/getColorList";

jest.mock("../api/getColorList");

test("Fetches data and renders the bubbles", async () => {
  // Finish this test
  mockColorList.mockResolvedValue(mockColors);
  const {getByText} = render(<BubblePage/>);

  const bubbleTest = await getByText(/bubbles/i);
  expect(bubbleTest).toBeInTheDocument();
});

let mockColors = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  }
];