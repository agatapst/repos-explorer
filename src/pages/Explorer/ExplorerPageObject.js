import React from 'react';
import {
  queryByText,
  queryByPlaceholderText,
  fireEvent,
  findByTitle,
  findAllByTitle,
} from '@testing-library/react';
import { renderWithProviders } from 'testUtilities/renderWithProviders';
import { UserElement } from 'testUtilities/helperElements/UserElement';

import { Explorer } from './';

export class ExplorerPageObject {
  static async render() {
    const { container } = renderWithProviders(<Explorer />);
    return new ExplorerPageObject(container);
  }

  constructor(container) {
    this.container = container;
  }

  get searchButton() {
    return queryByText(this.container, 'Search');
  }

  get searchInput() {
    return queryByPlaceholderText(this.container, 'Enter username');
  }

  searchUsername(username) {
    fireEvent.change(this.searchInput, { target: { value: username } });
    fireEvent.click(this.searchButton);
  }

  async getUsersList() {
    const list = await findByTitle(this.container, 'Users list');
    const users = await findAllByTitle(list, 'User');
    return [...users].map((user) => new UserElement(user));
  }
}
