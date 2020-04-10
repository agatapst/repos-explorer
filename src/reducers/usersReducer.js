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

function updateUser(users, userId, data) {
  return users.map((user) => (user.id === userId ? { ...user, ...data } : user));
}

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
        users: updateUser(state.users, action.userId, {
          reposPending: true,
        }),
      };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        pending: false,
        users: updateUser(state.users, action.userId, {
          reposPending: false,
          repos: action.repos,
        }),
      };
    case FETCH_REPOS_ERROR:
      return {
        ...state,
        pending: false,
        users: updateUser(state.users, action.userId, {
          reposError: action.error,
          reposPending: false,
        }),
      };
    default:
      return state;
  }
}
