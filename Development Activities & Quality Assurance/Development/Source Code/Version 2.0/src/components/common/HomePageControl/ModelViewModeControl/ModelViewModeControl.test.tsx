import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { resetToInitialStatePointSelectionSlice } from 'src/redux/slice';
import { ModelViewModeControl } from './ModelViewModeControl';

describe('ModelViewModeControl', () => {
  beforeEach(() => {
    render(<ModelViewModeControl />)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "model-view-mode-control" })).toBeInTheDocument();
    })
  })

  it("to update the icon to anatomy mode if change mode from default", async () => {
    const controlButton = screen.getByRole("div", { name: "model-view-mode-control" });
    fireEvent.click(controlButton)

    await waitFor(() => {
      const viewModeIcon = screen.getByRole("img", { name: "model-view-mode-control-icon" });
      let getImageName = (viewModeIcon as any).src.split("/")
      getImageName = getImageName[getImageName.length - 1]

      expect(getImageName).toBe("anatomyMode.svg")
    })
  })
});
