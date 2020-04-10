import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as StarIcon } from 'assets/star.svg';

import styles from './RepositoryBox.module.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
};

const defaultProps = {
  description: '',
};

const RepositoryBox = ({ name, description, url, stars }) => (
  <div title="Repository" className={styles.box}>
    <div className={styles.header}>
      <h2 title="Repository name" className={styles.name}>
        <a href={url}>{name}</a>
      </h2>
      <StarsBadge count={stars} />
    </div>
    <div title="Repository description">{description}</div>
  </div>
);

const StarsBadge = ({ count }) => (
  <div title="Repository stars" className={styles.starsBadge}>
    <span className={styles.starsCount}>{count}</span>
    <StarIcon className={styles.starsIcon} alt="Star" />
  </div>
);
StarsBadge.propTypes = {
  count: PropTypes.number.isRequired,
};

RepositoryBox.propTypes = propTypes;
RepositoryBox.defaultProps = defaultProps;

export default RepositoryBox;
