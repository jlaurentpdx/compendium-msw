import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockHolidays } from './utils/mockHolidays';
import userEvent from '@testing-library/user-event';
import App from './App';

const server = setupServer(
  rest.get(
    'https://date.nager.at/api/v3/PublicHolidays/2022/US',
    (req, res, ctx) => {
      return res(ctx.json(mockHolidays));
    }
  )
);

beforeAll(() => server.listen());

afterAll(() => server.close());

test('App should render text from a header', async () => {
  render(<App />);

  const heading = screen.getByRole('heading', { name: /us holidays/i });

  expect(heading).toBeInTheDocument();
  expect(screen.getByText(/please/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/please/i));
});

test('should display a list of all holidays when search returns an empty value', async () => {
  render(<App />);

  const headingsCount = 29; // an actual count, two headings per holiday rendered plus 1 page title header
  const button = await screen.findByRole('button', { name: /search/i });
  userEvent.click(button);
  const headings = await screen.findAllByRole('heading');

  expect(headings).toHaveLength(headingsCount);
});

test('should display a single holiday when only one match is returned ', async () => {
  render(<App />);

  const headingsCount = 3; // an actual count, two headings per holiday rendered plus 1 page title header
  const search = await screen.findByRole('textbox', {
    name: /enter holiday name/i,
  });
  const button = await screen.findByRole('button', { name: /search/i });
  userEvent.type(search, 'federation');
  userEvent.click(button);
  const headings = await screen.findAllByRole('heading');

  expect(headings).toHaveLength(headingsCount);
});

test('should display multiple holidays when more than one match is returned ', async () => {
  render(<App />);

  const headingsCount = 7; // an actual count, two headings per holiday rendered plus 1 page title header
  const search = await screen.findByRole('textbox', {
    name: /enter holiday name/i,
  });
  const button = await screen.findByRole('button', { name: /search/i });
  userEvent.type(search, 'f');
  userEvent.click(button);
  const headings = await screen.findAllByRole('heading');

  expect(headings).toHaveLength(headingsCount);
});
