import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Compendium from './Compendium';

const server = setupServer(
  rest.get(
    'https://date.nager.at/api/v3/PublicHolidays/2022/US',
    (req, res, ctx) => {
      return res(ctx.json(mockHolidays));
    }
  )
);

test('Compendium renders an initial loading state', async () => {
  render(<Compendium />);

  expect(screen.getByText(/please/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/please/i));
});

test('Compendium renders a search bar', async () => {
  render(<Compendium />);

  const search = await screen.findByRole('textbox');
  expect(search).toBeInTheDocument();
});

test('Compendium renders a button', async () => {
  render(<Compendium />);

  const button = await screen.findByRole('button', { name: /search/i });
  expect(button).toBeInTheDocument();
});

test('Compendium renders a default list of headings', async () => {
  render(<Compendium />);

  await waitForElementToBeRemoved(() => screen.getByText(/please/i));
  const headings = await screen.findAllByRole('heading');
  expect(headings).toHaveLength(24);
});
