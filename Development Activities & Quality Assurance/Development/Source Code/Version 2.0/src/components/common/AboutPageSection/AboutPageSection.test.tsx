import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AboutPageSection } from './AboutPageSection';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('AboutPageSection', () => {
  beforeEach(() => {

  })

  it("to be rendered successfully", async () => {
    render(<AboutPageSection />)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "about-page-section" })).toBeInTheDocument();
    })
  })

  it("should collapse the information item if clicking on the item and page is collapsable", async () => {
    render(<AboutPageSection
      isCollapsable={true}
      showContent={
        <div className="test-content"></div>}
      sectionName={`test-section`}
      information={`Section`}
      index={0}
    />)

    await waitFor(() => {
      const header = screen.getByRole("about-page-section", { name: "about-page-section-test-section" })
      expect(header).toBeInTheDocument();
      expect(header.innerHTML.includes("test-section")).toBeTruthy();

      fireEvent.click(header);

      const informationBlock = screen.getByRole("div", { name: "about-page-section-information" })
      expect(parseInt(informationBlock.style.height.substring(0, informationBlock.style.height.length - 2))).toBeGreaterThan(0);
      expect(informationBlock.style.overflow).toBe("auto")
    })
  })

  it("should collapse the information item if clicking on the item and is in collapsed state and page is collapsable", async () => {
    render(<AboutPageSection
      isCollapsable={true}
      showContent={
        <div className="test-content"></div>}
      sectionName={`test-section`}
      information={`Section`}
      index={0}
    />)

    await waitFor(() => {
      const header = screen.getByRole("about-page-section", { name: "about-page-section-test-section" })
      expect(header).toBeInTheDocument();
      expect(header.innerHTML.includes("test-section")).toBeTruthy();

      fireEvent.click(header);
      fireEvent.click(header);

      const informationBlock = screen.getByRole("div", { name: "about-page-section-information" })
      expect(parseInt(informationBlock.style.height.substring(0, informationBlock.style.height.length - 2))).toEqual(0);
      expect(informationBlock.style.overflow).toBe("hidden")
    })
  })
});
