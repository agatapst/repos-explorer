import fetchMock from 'fetch-mock';

import { ExplorerPageObject } from './ExplorerPageObject';

const users = [
  { id: 1, login: 'johndoe1', repos_url: 'https://api.github.com/repos/johndoe1' },
  { id: 2, login: 'johndoe2', repos_url: 'https://api.github.com/repos/johndoe2' },
];

const repos = [
  { id: 1, name: 'test-repo-1', description: 'Super repo', stargazers_count: 10 },
  { id: 2, name: 'test-repo-2', description: 'Another repo', stargazers_count: 5 },
];

describe('Explorer Page', () => {
  let page;

  beforeEach(async () => {
    fetchMock.get('https://api.github.com/search/users?q=johndoe', { items: users });
    fetchMock.get('https://api.github.com/repos/johndoe1', { body: repos });
    fetchMock.get('https://api.github.com/repos/johndoe2', { body: [] });
    page = await ExplorerPageObject.render();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('shows search button and search input', () => {
    expect(page.searchButton).toBeInTheDocument();
    expect(page.searchInput).toBeInTheDocument();
  });

  it('shows list of matching users', async () => {
    page.searchUsername('johndoe');
    const usersList = await page.getUsersList();
    expect(usersList.map((user) => user.username)).toEqual(['johndoe1', 'johndoe2']);
  });

  it('shows list of repositories for the selected user', async () => {
    page.searchUsername('johndoe');
    const usersList = await page.getUsersList();
    usersList[0].expand();
    expect(await usersList[0].getRepositories()).toEqual([
      { name: 'test-repo-1', description: 'Super repo', stars: 10 },
      { name: 'test-repo-2', description: 'Another repo', stars: 5 },
    ]);
  });
});
