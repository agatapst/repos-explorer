import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './actions';
import fetchUsers from './fetchUsers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const usersUrl = 'https://api.github.com/search/users?q=testuser';
const users = [
  { id: 1, login: 'testuser1', repos_url: 'https://api.github.com/repos/johndoe1' },
  { id: 2, login: 'testuser2', repos_url: 'https://api.github.com/repos/johndoe2' },
];

describe('fetchRepos async actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('creates success action and schedules fetching repos after successful request', () => {
    fetchMock.get(usersUrl, { items: users });
    fetchMock.get(users[0].repos_url, { body: [] });
    fetchMock.get(users[1].repos_url, { body: [] });

    const expectedActions = [
      { type: actions.FETCH_USERS_PENDING },
      { type: actions.FETCH_USERS_SUCCESS, username: 'testuser', users },
      { type: actions.FETCH_REPOS_PENDING, userId: 1 },
      { type: actions.FETCH_REPOS_PENDING, userId: 2 },
    ];

    return store.dispatch(fetchUsers('testuser')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_USERS_ERROR when fetching users fails', () => {
    fetchMock.get(usersUrl, { status: 422, body: { message: 'Validation Failed' } });

    const expectedActions = [
      { type: actions.FETCH_USERS_PENDING },
      { type: actions.FETCH_USERS_ERROR, error: 'Validation Failed' },
    ];

    return store.dispatch(fetchUsers('testuser')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
