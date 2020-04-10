import { searchUsersUrl } from 'config/api';

import { fetchUsersPending, fetchUsersSuccess, fetchUsersError } from './actions';
import fetchRepos from './fetchRepos';

function fetchUsers(username) {
  return (dispatch) => {
    dispatch(fetchUsersPending());
    return fetch(searchUsersUrl(username))
      .then((response) => response.json())
      .then((json) => {
        if (json.message) {
          throw json.message;
        }
        const users = json.items.slice(0, 5);
        dispatch(fetchUsersSuccess(username, users));
        users.forEach((user) => dispatch(fetchRepos(user)));
        return json;
      })
      .catch((error) => {
        dispatch(fetchUsersError(error));
      });
  };
}

export default fetchUsers;
