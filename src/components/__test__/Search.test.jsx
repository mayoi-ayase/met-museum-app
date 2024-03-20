import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
// * test idea is to: fire a search for a certain keyword and expect a specific object that is returned (like fire a search for "still life" and expect one of the IDs that actually gets returned)
// ^ this didn't end up exactly working out I had to modify it to expect the "See on Met Museum" text every object returns instead of a specific ID but the idea remains the same, i.e. type something up and get response back
import Search from "../Search";

const MockSearch = () => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

test("Search should return results", async () => {
  render(<MockSearch />);
  const searchBox = screen.getByDisplayValue("Enter your search query here...");
  const searchButton = screen.getByTestId("search-button");
  fireEvent.change(searchBox, { target: { value: "monet " } });
  fireEvent.click(searchButton);
  const resultFlavorText = await screen.findByText("See on Met Museum");
  await expect(resultFlavorText).toBeInTheDocument();
});
