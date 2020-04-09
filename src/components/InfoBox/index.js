import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import styles from './InfoBox.module.scss';

const propTypes = {
  id: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
  reposPending: PropTypes.bool,
  reposError: PropTypes.shape({
    message: PropTypes.string,
  }),
};

const defaultProps = {
  repos: [],
  message: '',
  description: '',
};

const InfoBox = ({ id, login, reposPending, repos, reposError }) => {
  const [isRepoShown, setRepoShown] = useState(false);
  return (
    <li key={id} title="User" style={{ width: '100%' }}>
      <h1 title="Username">{login}</h1>
      <button title="Show repositories" onClick={() => setRepoShown(!isRepoShown)}>
        show
      </button>
      {isRepoShown && (
        <>
          <div>{reposPending && 'Loading'}</div>
          <ul title="Repositories list">
            {repos.map((repo) => (
              <li title="Repository" key={repo.id}>
                <h2 title="Repository name">{repo.name}</h2>
                <div title="Repository description">{repo.description}</div>
                <div title="Repository stars">{repo.stargazers_count}</div>
              </li>
            ))}
          </ul>
          <div>{reposError && reposError.message}</div>
        </>
      )}
    </li>
  );
};

InfoBox.propTypes = propTypes;
InfoBox.defaultProps = defaultProps;

export default InfoBox;
