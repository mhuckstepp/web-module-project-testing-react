import React from "react";
import {
  getByLabelText,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";

import Show from "./../Show";

const testShow = {
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
};

test("renders testShow and no selected Season without errors", () => {
  //   arrange
  render(<Show show={testShow} selectedSeason={"none"} />);

  // act
  const loading = screen.queryByText(/fetching/i);

  //   assert
  expect(loading).toBeFalsy;
});

test("renders Loading component when prop show is null", () => {
  //   arrange
  render(<Show show={null} selectedSeason={"none"} />);

  // act
  const loading = screen.queryByText(/fetching/i);

  //   assert
  expect(loading).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  //   arrange
  render(<Show show={testShow} selectedSeason={"none"} />);

  // act
  const seasons = screen.queryAllByTestId(/season-option/i);

  //   assert
  expect(seasons).toHaveLength(2);
});

test("handleSelect is called when an season is selected", async () => {
  const mockSeasonSelect = jest.fn();

  //   arrange
  render(
    <Show
      show={testShow}
      selectedSeason={"none"}
      handleSelect={mockSeasonSelect}
    />
  );

  // act
  const options = screen.getByLabelText(/season/i);
  userEvent.selectOptions(options, screen.getByText(/season 1/i));
  userEvent.selectOptions(options, screen.getByText(/season 2/i));

  //   assert
  expect(mockSeasonSelect.mock.calls.length).toBe(2);
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  //   arrange
  const { rerender } = render(<Show show={testShow} selectedSeason={"none"} />);

  // act
  let episodes = screen.queryByTestId(/episodes-container/i);

  //   assert
  expect(episodes).toBeNull();

  //   arrange
  rerender(<Show show={testShow} selectedSeason={1} />);

  // act
  episodes = screen.queryByTestId(/episodes-container/i);

  //   assert
  expect(episodes).toBeInTheDocument();
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
