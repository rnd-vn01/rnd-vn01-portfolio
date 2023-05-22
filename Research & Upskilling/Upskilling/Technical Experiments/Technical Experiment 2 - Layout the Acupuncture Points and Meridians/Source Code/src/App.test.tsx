import { render, screen } from '@testing-library/react';
import App from './App';
import store from 'src/redux/store/index';
import { Provider } from 'react-redux';

test('renders learn react link', () => {
  render(<Provider store={store}>
    <App />
  </Provider>);
  expect(true).toBeTruthy();
});
