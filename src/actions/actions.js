export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const FETCH_REPOS_PENDING = 'FETCH_REPOS_PENDING';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_ERROR = 'FETCH_REPOS_ERROR';

export function fetchUsersPending() {
  return {
    type: FETCH_USERS_PENDING,
  };
}

export function fetchUsersSuccess(username, users) {
  return {
    type: FETCH_USERS_SUCCESS,
    username: username,
    users: users,
  };
}

export function fetchUsersError(error) {
  return {
    type: FETCH_USERS_ERROR,
    error: error,
  };
}

export function fetchReposPending(userId) {
  return {
    type: FETCH_REPOS_PENDING,
    userId: userId,
  };
}

export function fetchReposSuccess(userId, repos) {
  return {
    type: FETCH_REPOS_SUCCESS,
    userId: userId,
    repos: repos,
  };
}

export function fetchReposError(userId, error) {
  return {
    type: FETCH_REPOS_ERROR,
    userId: userId,
    error: error,
  };
}
