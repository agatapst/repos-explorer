import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_REPOS_PENDING,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_ERROR,
} from '../actions/actions';

const initialState = {
  pending: false,
  users: [],
  searchedUsername: '',
  error: null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        pending: false,
        searchedUsername: action.username,
        users: action.users,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case FETCH_REPOS_PENDING:
      return {
        ...state,
        pending: false,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, reposPending: true } : user
        ),
      };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        pending: false,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, repos: action.repos, reposPending: false } : user
        ),
      };
    case FETCH_REPOS_ERROR:
      return {
        ...state,
        pending: false,
        users: state.users.map((user) =>
          user.id === action.userId
            ? { ...user, reposError: action.error, reposPending: false }
            : user
        ),
      };
    default:
      return state;
  }
}
