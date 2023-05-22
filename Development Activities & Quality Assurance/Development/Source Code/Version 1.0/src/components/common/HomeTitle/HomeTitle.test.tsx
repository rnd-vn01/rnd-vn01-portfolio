import { render, screen, waitFor } from '@testing-library/react';
import { HomeTitle } from './HomeTitle';

describe('FooterBar', () => {
  beforeEach(() => {
    render(<HomeTitle />)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "home-title" })).toBeInTheDocument();
    })
  })
});
