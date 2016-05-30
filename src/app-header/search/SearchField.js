import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import styles from '../header-bar-styles';
import TextField from 'material-ui/lib/text-field';
import { search, searchStore$, setHovering, setSearchFieldFocusTo, hideWhenNotHovering } from './search.stores';
import Paper from 'material-ui/lib/paper';
import withStateFrom from '../../component-helpers/withStateFrom';
import HeaderMenuItem from '../menus/HeaderMenuItem';
import { Observable } from 'rx';

class SearchResultsList extends Component {
    render() {
        return (
            <div style={styles.searchResultList}>
                {this.props.children}
            </div>
        );
    }
}

function SearchResults(props) {
    if (!props.open) {
        return <div />;
    }

    const menuItems = (props.searchResults || []).map((item, index) => (<HeaderMenuItem key={index} {...item} />));

    return (
        <Paper style={styles.searchResults} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <SearchResultsList>
                {menuItems}
            </SearchResultsList>
        </Paper>
    );
}

const SearchResultsWithState = withStateFrom(searchStore$, SearchResults);

export default class SearchField extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            searchValue: '',
        };

        this._setSearchValue = this._setSearchValue.bind(this);
    }

    render() {
        return (
            <div style={styles.searchField}>
                <TextField
                    fullWidth
                    onChange={this._setSearchValue}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                    hintText="Super search for DHIS2! :)" // TODO Translate
                    hintStyle={styles.searchFieldHintText}
                    inputStyle={styles.searchFieldInput}
                />
                <SearchResultsWithState />
            </div>
        );
    }

    _setSearchValue(event) {
        search(event.target.value);
    }

    _onFocus() {
        setSearchFieldFocusTo(true);
    }

    _onBlur() {
        hideWhenNotHovering();
    }
}
