import { fetchUsersPending, fetchUsersSuccess, fetchUsersError } from './actions';
import fetchRepos from './fetchRepos';

function fetchUsers(username) {
  return (dispatch) => {
    dispatch(fetchUsersPending());
    fetch(`https:///api.github.com/search/users?q=${username}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        const users = json.items.slice(0, 5);
        dispatch(fetchUsersSuccess(users));
        users.forEach((user) => dispatch(fetchRepos(user)));
        return json;
      })
      .catch((error) => {
        dispatch(fetchUsersError(error));
      });
  };
}

export default fetchUsers;
