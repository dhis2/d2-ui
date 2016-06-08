import React, { Component, PropTypes } from 'react';
import styles from '../header-bar-styles';

export default class SearchResultsList extends Component {
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
