export const FETCH_REPOS_PENDING = 'FETCH_REPOS_PENDING';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_ERROR = 'FETCH_REPOS_ERROR';

export function fetchReposPending() {
  return {
    type: FETCH_REPOS_PENDING,
  };
}

export function fetchReposSuccess(repos) {
  return {
    type: FETCH_REPOS_SUCCESS,
    repos: repos,
  };
}

export function fetchReposError(error) {
  return {
    type: FETCH_REPOS_ERROR,
    error: error,
  };
}
