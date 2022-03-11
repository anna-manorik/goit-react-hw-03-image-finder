import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './searchBar.module.css';

// const SearchBar = ({ onSubmit }) => (
//   <header className={styles.Searchbar}>
//     <form className={styles.SearchForm} onSubmit={onSubmit}>
//       <button type="submit" className={styles.SearchFormButton}>
//         <span>Search</span>
//       </button>

//       <input
//         className={styles.SearchFormInput}
//         type="text"
//         name="input"
//         autocomplete="off"
//         placeholder="Search images and photos"
//       />
//     </form>
//   </header>
// );

// SearchBar.propTypes = {
//   onSubmit: PropTypes.func,
// };

class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.inputValue);
    this.setState({inputValue: ''})
    e.currentTarget.elements.inputValue.value = '';
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            name="inputValue"
            autocomplete="off"
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
