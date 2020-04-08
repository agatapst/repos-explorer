import { FETCH_REPOS_PENDING, FETCH_REPOS_SUCCESS, FETCH_REPOS_ERROR } from './actions';

const initialState = {
  pending: false,
  repos: [],
  error: null,
};

export function reposReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REPOS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        pending: false,
        repos: action.payload,
      };
    case FETCH_REPOS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getRepos = (state) => state.repos;
export const getReposPending = (state) => state.pending;
export const getReposError = (state) => state.error;
