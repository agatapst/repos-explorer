import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './actions';
import fetchRepos from './fetchRepos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const reposUrl = 'http://example.com/repos';
const user = { id: 1, repos_url: reposUrl };
const repos = [{ name: 'Repo 1' }, { name: 'Repo 2' }];

describe('fetchRepos async actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('creates success action when fetching has been done', () => {
    fetchMock.get(reposUrl, { body: repos });

    const expectedActions = [
      { type: actions.FETCH_REPOS_PENDING, userId: user.id },
      { type: actions.FETCH_REPOS_SUCCESS, userId: user.id, repos },
    ];

    return store.dispatch(fetchRepos(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates error action when fetching repos fails', () => {
    fetchMock.get(reposUrl, { status: 404, body: { message: 'User not found' } });

    const expectedActions = [
      { type: actions.FETCH_REPOS_PENDING, userId: user.id },
      { type: actions.FETCH_REPOS_ERROR, userId: user.id, error: 'User not found' },
    ];
    return store.dispatch(fetchRepos(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
