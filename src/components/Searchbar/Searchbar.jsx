import { useState } from 'react';

import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

export const Searchbar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        onSearch(query);

        setQuery("");
    }
    
    const handleChange = (event) => {
        setQuery(event.target.value);
    };
    
    return (
        <header className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={styles.SearchFormButton}>
                    <span className={styles.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    className={styles.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={handleChange}
                    name="input"
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};