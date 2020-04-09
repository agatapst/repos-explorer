import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from '../store';

const store = configureStore();

export const renderWithProviders = (Component) => {
  return render(<Provider store={store}>{Component}</Provider>);
};
