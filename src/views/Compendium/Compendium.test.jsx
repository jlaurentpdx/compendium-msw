import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Compendium from './Compendium';

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
  expect(headings).toHaveLength(26);
});
