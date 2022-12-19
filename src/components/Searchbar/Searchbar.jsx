import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  const { searchbar, form, form_btn, form_label, form_input } = styles;

  return (
    <header className={searchbar}>
      <form className={form} onSubmit={handleSubmit}>
        <button type="submit" className={form_btn}>
          <span className={form_label}>Search</span>
        </button>

        <input
          className={form_input}
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
