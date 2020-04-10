import React from 'react';
import { render } from '@testing-library/react';

import UserInfoBox from './';

describe('User Info Box Component', () => {
  const props = {
    login: 'login',
    repos: [
      { name: 'reponame1', description: 'repo description 1' },
      { name: 'reponame2', description: 'repo description 2' },
    ],
  };

  it('renders without error', () => {
    render(<UserInfoBox {...props} />);
  });
});
