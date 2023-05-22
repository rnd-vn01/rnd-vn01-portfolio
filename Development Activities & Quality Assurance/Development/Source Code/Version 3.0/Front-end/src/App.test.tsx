import { render, screen } from '@testing-library/react';
import App from './App';
import store from 'src/redux/store/index';
import { Provider } from 'react-redux';
import { mockGetItems } from './api/mocks/items/mockGetItems';

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

test('renders learn react link', () => {
  mockGetItems();

  render(<Provider store={store}>
    <App />
  </Provider>);
  expect(true).toBeTruthy();
});
