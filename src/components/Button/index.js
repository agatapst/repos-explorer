import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const propTypes = {
  children: PropTypes.string.isRequired,
};

const Button = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
