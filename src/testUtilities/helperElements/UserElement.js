import { findByTitle, findAllByTitle, queryByTitle, fireEvent } from '@testing-library/react';

export class UserElement {
  constructor(element) {
    this.element = element;
  }

  get username() {
    return queryByTitle(this.element, 'Username').textContent;
  }

  get expandArrow() {
    return queryByTitle(this.element, 'Show repositories');
  }

  expand() {
    fireEvent.click(this.expandArrow);
  }

  async getRepositories() {
    const list = await findByTitle(this.element, 'Repositories list');
    const repos = await findAllByTitle(list, 'Repository');
    return [...repos].map((repo) => ({
      name: queryByTitle(repo, 'Repository name').textContent,
      description: queryByTitle(repo, 'Repository description').textContent,
      stars: parseInt(queryByTitle(repo, 'Repository stars').textContent),
    }));
  }
}
