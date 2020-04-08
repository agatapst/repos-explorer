import React from 'react';
import { render } from '@testing-library/react';

import Container from './';

describe('Container Component', () => {
  it('renders without error', () => {
    render(<Container>Container text</Container>);
  });
  it('displays passed text as children', () => {
    const childrenText = 'Container children';
    const { getByText } = render(<Container>{childrenText}</Container>);
    const children = getByText(/container children/i);
    expect(children).toBeInTheDocument();
  });
});
