import React from 'react';
import { renderWithProviders } from 'testUtilities/renderWithProviders';

import App from './App';

test('renders learn react link', () => {
  const { container } = renderWithProviders(<App />);
  expect(container).toBeInTheDocument();
});
