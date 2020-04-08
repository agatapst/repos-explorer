import { fetchReposPending, fetchReposSuccess, fetchReposError } from './actions';

function fetchRepos(username) {
  return (dispatch) => {
    dispatch(fetchReposPending());
    fetch(`https:///api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchReposSuccess(res.repos));
        return res.repos;
      })
      .catch((error) => {
        dispatch(fetchReposError(error));
      });
  };
}

export default fetchRepos;
