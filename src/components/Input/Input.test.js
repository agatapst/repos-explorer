import React from 'react';
import { render } from '@testing-library/react';

import Input from './';

describe('Container Component', () => {
  it('renders without error', () => {
    render(<Input />);
  });
});
