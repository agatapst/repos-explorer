import * as actions from '../actions/actions';

import usersReducer from './usersReducer';

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual({
      pending: false,
      users: [],
      searchedUsername: '',
      error: null,
    });
  });

  it('should handle FETCH_USERS_PENDING', () => {
    const action = actions.fetchUsersPending();

    expect(usersReducer({}, action)).toEqual({
      pending: true,
    });
  });

  it('should handle FETCH_USERS_SUCCESS', () => {
    const users = [{ id: 1, login: 'johndoe1' }];
    const action = actions.fetchUsersSuccess('johndoe', users);

    expect(usersReducer({ pending: true }, action)).toEqual({
      pending: false,
      searchedUsername: 'johndoe',
      users,
    });
  });

  it('should handle FETCH_USERS_ERROR', () => {
    const action = actions.fetchUsersError('Invalid');

    expect(usersReducer({ pending: true }, action)).toEqual({
      pending: false,
      error: 'Invalid',
    });
  });

  describe('repos actions', () => {
    const state = {
      pending: false,
      users: [{ id: 1 }, { id: 2 }],
    };

    it('should handle FETCH_REPOS_PENDING', () => {
      const action = actions.fetchReposPending(1);

      expect(usersReducer(state, action)).toEqual({
        pending: false,
        users: [{ id: 1, reposPending: true }, { id: 2 }],
      });
    });

    it('should handle FETCH_REPOS_SUCCESS', () => {
      const repos = [{ id: 8 }];
      const action = actions.fetchReposSuccess(2, repos);

      expect(usersReducer(state, action)).toEqual({
        pending: false,
        users: [{ id: 1 }, { id: 2, reposPending: false, repos }],
      });
    });

    it('should handle FETCH_REPOS_ERROR', () => {
      const action = actions.fetchReposError(1, 'Invalid');

      expect(usersReducer(state, action)).toEqual({
        pending: false,
        users: [{ id: 1, reposPending: false, reposError: 'Invalid' }, { id: 2 }],
      });
    });
  });
});
