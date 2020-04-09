import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { FETCH_REPOS_PENDING, FETCH_REPOS_SUCCESS, FETCH_REPOS_ERROR } from './actions';
import fetchRepos from './fetchRepos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchRepos async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FETCH_REPOS_SUCCESS when fetching repos has been done', () => {
    const reposUrl = 'http://example.com/repos';
    const repos = [{ name: 'Repo 1' }];
    const user = { id: 1, repos_url: reposUrl };

    fetchMock.getOnce(reposUrl, {
      body: repos,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: FETCH_REPOS_PENDING, userId: user.id },
      { type: FETCH_REPOS_SUCCESS, userId: user.id, repos },
    ];
    const store = mockStore();

    return store.dispatch(fetchRepos(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_REPOS_ERROR when fetching repos fails', () => {
    const reposUrl = 'http://example.com/repos';
    const user = { id: 1, repos_url: reposUrl };

    fetchMock.getOnce(reposUrl, {
      status: 404,
      body: { message: 'User not found' },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: FETCH_REPOS_PENDING, userId: user.id },
      { type: FETCH_REPOS_ERROR, userId: user.id, error: 'User not found' },
    ];
    const store = mockStore();

    return store.dispatch(fetchRepos(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
