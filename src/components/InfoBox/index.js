import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './InfoBox.module.scss';

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
      <div className={styles.usernameBox}>
        <h1 className={styles.username} title="Username">
          {login}
        </h1>
        <button
          title="Show repositories"
          className={styles.arrowButton}
          onClick={() => setRepoShown(!isRepoShown)}
        >
          <img src="/images/down-arrow.png" alt="Down arrow" />
        </button>
      </div>
      {isRepoShown && (
        <>
          <div>{reposPending && 'Loading'}</div>
          <ul className={styles.repoList} title="Repositories list">
            {repos.map((repo) => (
              <li title="Repository" key={repo.id} className={styles.repoBox}>
                <div className={styles.nameBox}>
                  <h2 title="Repository name">{repo.name}</h2>
                  <div title="Repository stars">
                    <span className={styles.starsCount}>{repo.stargazers_count}</span>
                    <img src="/images/star.png" alt="Down arrow" />
                  </div>
                </div>
                <div title="Repository description">{repo.description}</div>
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
