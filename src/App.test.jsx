import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

test('App should render text from a header', async () => {
  render(<App />);

  const heading = screen.getByRole('heading', { name: /us holidays/i });
  expect(heading).toBeInTheDocument();

  expect(screen.getByText(/please/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/please/i));
});

test('should display a list of all holidays when search returns an empty value', async () => {
  render(<App />);

  const expectedHeadingsCount = 27;
  const button = await screen.findByRole('button', { name: /search/i });
  userEvent.click(button);
  const headings = await screen.findAllByRole('heading');

  expect(headings).toHaveLength(expectedHeadingsCount);
});

test('should display a single holiday when only one match is returned ', async () => {
  render(<App />);

  const expectedHeadingsCount = 3;
  const search = await screen.findByRole('textbox', {
    name: /enter holiday name/i,
  });
  const button = await screen.findByRole('button', { name: /search/i });
  userEvent.type(search, 'chris');
  userEvent.click(button);
  const headings = await screen.findAllByRole('heading');

  expect(headings).toHaveLength(expectedHeadingsCount);
});

test('should display multiple holidays when more than one match is returned ', async () => {
  render(<App />);

  const expectedHeadingsCount = 13;
  const search = await screen.findByRole('textbox', {
    name: /enter holiday name/i,
  });
  const button = await screen.findByRole('button', { name: /search/i });
  userEvent.type(search, 's');
  userEvent.click(button);
  const headings = await screen.findAllByRole('heading');

  expect(headings).toHaveLength(expectedHeadingsCount);
});
