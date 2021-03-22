import React from "react";
import {
  getByLabelText,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";

import mockFetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const getButton = () => {
  const button = screen.getByRole("button");
  return button;
};

test("renders Display without errors", () => {
  //   arrange
  render(<Display />);
});

test("When fetch is called the show component will display", async () => {
  //   arrange
  render(<Display />);
  mockFetchShow.mockResolvedValueOnce({
    name: "show name",
    summary: "show summary",
    seasons: [
      {
        id: 5555,
        name: "season 1",
        episodes: [],
      },
      {
        id: 5552,
        name: "season 2",
        episodes: [],
      },
    ],
  });

  const button = getButton();

  userEvent.click(button);

  // assert
  const shows = await screen.findByTestId(/show-container/i);
});

test("When fetch is called the show component will display", async () => {
  //   arrange
  render(<Display />);
  mockFetchShow.mockResolvedValueOnce({
    name: "show name",
    summary: "show summary",
    seasons: [
      {
        id: 5555,
        name: "season 1",
        episodes: [],
      },
      {
        id: 5552,
        name: "season 2",
        episodes: [],
      },
    ],
  });

  const button = getButton();

  userEvent.click(button);

  // assert
  const shows = await screen.findAllByTestId(/season-option/i);
  expect(shows).toHaveLength(2);
});

test("When fetch is called the show component will display", async () => {
  //   arrange
  const mockGetData = jest.fn();
  render(<Display displayFunc={mockGetData} />);
  mockFetchShow.mockResolvedValueOnce({
    name: "show name",
    summary: "show summary",
    seasons: [
      {
        id: 5555,
        name: "season 1",
        episodes: [],
      },
      {
        id: 5552,
        name: "season 2",
        episodes: [],
      },
    ],
  });

  const button = getButton();
  userEvent.click(button);

  // assert
  const shows = await screen.findAllByTestId(/season-option/i);
  expect(shows).toHaveLength(2);
  expect(mockGetData).toHaveBeenCalled();
  expect(mockGetData).toHaveBeenCalledTimes(1);
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
