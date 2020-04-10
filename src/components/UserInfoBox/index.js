import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RepositoryBox from 'components/RepositoryBox';
import { ReactComponent as ArrowIcon } from 'assets/arrow.svg';

import styles from './UserInfoBox.module.scss';

const propTypes = {
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
  reposPending: false,
  reposError: null,
  message: '',
  description: '',
};

const UserInfoBox = ({ login, reposPending, repos, reposError }) => {
  const [reposExpanded, setReposExpanded] = useState(false);
  return (
    <div title="User">
      <button className={styles.box} onClick={() => setReposExpanded(!reposExpanded)}>
        <span className={styles.username} title="Username">
          {login}
        </span>
        <ArrowIcon
          title="Show repositories"
          alt="Arrow"
          className={reposExpanded ? styles.arrowUp : styles.arrowDown}
        />
      </button>
      {reposExpanded && (
        <>
          <div>{reposPending && 'Loading...'}</div>
          <ul className={styles.repoList} title="Repositories list">
            {repos.map(({ id, name, description, html_url, stargazers_count }) => (
              <li key={id}>
                <RepositoryBox
                  key={id}
                  name={name}
                  description={description}
                  url={html_url}
                  stars={stargazers_count}
                />
              </li>
            ))}
          </ul>
          <div>{reposError && reposError.message}</div>
        </>
      )}
    </div>
  );
};

UserInfoBox.propTypes = propTypes;
UserInfoBox.defaultProps = defaultProps;

export default UserInfoBox;
