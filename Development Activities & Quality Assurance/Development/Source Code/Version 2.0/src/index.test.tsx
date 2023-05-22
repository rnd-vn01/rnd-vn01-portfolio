import { render, screen } from '@testing-library/react';
import ReactDOM from "react-dom";
import App from './App';

jest.mock("react-dom");

describe('Bookstore app', () => {
  it('renders without crash', () => {
    require("./index");
    expect(document.querySelector('.app')).not.toBeNull;
  })
})
