import { render, screen, waitFor } from '@testing-library/react';
import { PersonalRecordsPage } from './PersonalRecordsPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { Context as ResponsiveContext } from "react-responsive";
import { mockQuizRecords } from 'src/api/mocks/quizRecords/mockQuizRecords';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { })
      }
    }
  }
}));

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: '/advanced_search?query=search',
    search: 'query=search'
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

describe('PersonalRecordsPage', () => {
  beforeEach(() => {
    mockQuizRecords();
  })

  it("to be rendered the desktop viewport successfully", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <PersonalRecordsPage />
      </Provider>
    </ResponsiveContext.Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "personal-records-page-desktop" })).toBeInTheDocument();
      expect(screen.getByRole("div", { name: "title-bar" })).toBeInTheDocument();
    })
  })

  it("to be rendered the mobile viewport successfully", async () => {
    render(<ResponsiveContext.Provider value={{ width: 500 }}>
      <Provider store={store}>
        <PersonalRecordsPage />
      </Provider>
    </ResponsiveContext.Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "personal-records-page" })).toBeInTheDocument();
      expect(screen.getByRole("div", { name: "mobile-title-bar" })).toBeInTheDocument();
      expect(screen.getByRole("div", { name: "side-menu" })).toBeInTheDocument();
    })
  })
});
