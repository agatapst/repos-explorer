import { fetchReposPending, fetchReposSuccess, fetchReposError } from './actions';

function fetchRepos(user) {
  return (dispatch) => {
    dispatch(fetchReposPending(user.id));
    fetch(user.repos_url)
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        dispatch(fetchReposSuccess(user.id, json));
        return json;
      })
      .catch((error) => {
        dispatch(fetchReposError(user.id, error));
      });
  };
}

export default fetchRepos;
