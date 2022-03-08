import React from 'react';
import PropTypes from 'prop-types';
import styles from './searchBar.module.css';

const SearchBar = ({ onSubmit }) => (
  <header className={styles.Searchbar}>
    <form className={styles.SearchForm} onSubmit={onSubmit}>
      <button type="submit" className={styles.SearchFormButton}>
        <span>Search</span>
      </button>

      <input
        className={styles.SearchFormInput}
        type="text"
        name="input"
        autocomplete="off"
        placeholder="Search images and photos"
      />
    </form>
  </header>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
