import React from 'react';
import PropTypes from 'prop-types';

import styles from './InfoBox.module.scss';

const propTypes = {
  // @todo: add type
  children: PropTypes.any.isRequired,
};

const RepoBox = () => {
  return (
    <div>
      <h2>Repo title</h2>
      <span>Repo desc</span>
    </div>
  );
};

const InfoBox = () => {
  return (
    <div>
      <h1 className={styles.username}>Exampleuser</h1>
      <RepoBox />
    </div>
  );
};

InfoBox.propTypes = propTypes;

export default InfoBox;
