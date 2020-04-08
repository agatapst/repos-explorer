import { FETCH_REPOS_PENDING, FETCH_REPOS_SUCCESS, FETCH_REPOS_ERROR } from '../actions/actions';

const initialState = {
  pending: false,
  repos: [],
  error: null,
};

export default function reposReducer(state = initialState, action) {
  console.log('action', action);
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
        repos: action.repos,
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
