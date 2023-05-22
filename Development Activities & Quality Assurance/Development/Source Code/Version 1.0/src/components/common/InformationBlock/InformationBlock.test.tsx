import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { InformationBlock } from './InformationBlock';

describe('InformationBlock', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <InformationBlock />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "information-block" })).toBeInTheDocument();
    })
  })
});
