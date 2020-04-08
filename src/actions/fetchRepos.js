import { fetchReposPending, fetchReposSuccess, fetchReposError } from './actions';

function fetchRepos(username) {
  return (dispatch) => {
    dispatch(fetchReposPending());
    fetch(`https:///api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        dispatch(fetchReposSuccess(json));
        return json;
      })
      .catch((error) => {
        dispatch(fetchReposError(error));
      });
  };
}

export default fetchRepos;
