import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../header-bar-styles';

class SearchResultsList extends Component {
    render() {
        return (
            <div style={styles.searchResultList}>
                {this.props.children}
            </div>
        );
    }
}

SearchResultsList.propTypes = {
    children: PropTypes.array.isRequired,
};

export default SearchResultsList;
