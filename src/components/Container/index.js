import React from 'react';
import PropTypes from 'prop-types';

import styles from './Container.module.scss';

const propTypes = {
  // @todo: add type
  children: PropTypes.any.isRequired,
};

const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

Container.propTypes = propTypes;

export default Container;
