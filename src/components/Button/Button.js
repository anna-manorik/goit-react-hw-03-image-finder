import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className={styles.Button}>
    LOAD MORE
  </button>
);

Button.propTpes = {
  onClick: PropTypes.func,
};

export default Button;
