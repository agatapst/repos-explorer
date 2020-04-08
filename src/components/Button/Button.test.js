import React from 'react';
import { render } from '@testing-library/react';

import Button from './';

describe('Container Component', () => {
  it('renders without error', () => {
    render(<Button>Button text</Button>);
  });
  it('displays passed text as children', () => {
    const text = 'Button text';
    const { getByText } = render(<Button>{text}</Button>);
    const buttonText = getByText(/button text/i);
    expect(buttonText).toBeInTheDocument();
  });
});
