import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import styles, { MENU_ITEM_WIDTH } from '../header-bar-styles';
import TextField from 'material-ui/lib/text-field';
import { search, handleKeyPress, searchStore$, setHovering, setSearchFieldFocusTo, hideWhenNotHovering } from './search.stores';
import Paper from 'material-ui/lib/paper';
import withStateFrom from '../../component-helpers/withStateFrom';
import HeaderMenuItem from '../menus/HeaderMenuItem';
import IconButton from 'material-ui/lib/icon-button';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import { white } from 'material-ui/lib/styles/colors';
import { config } from 'd2/lib/d2';
import addD2Context from '../../component-helpers/addD2Context';

config.i18n.strings.add('app_search_placeholder');

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

class SearchField extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            searchValue: '',
        };

        this._setSearchValue = this._setSearchValue.bind(this);
        this._focusSearchField = this._focusSearchField.bind(this);
    }

    render() {
        return (
            <div style={styles.searchField}>
                <TextField
                    fullWidth
                    onChange={this._setSearchValue}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                    hintText={this.context.d2.i18n.getTranslation('app_search_placeholder')}
                    hintStyle={styles.searchFieldHintText}
                    inputStyle={styles.searchFieldInput}
                    onKeyUp={this._onKeyUp}
                    ref="searchBox"
                />
                <IconButton onClick={this._focusSearchField}>
                    <SearchIcon color={white} />
                </IconButton>
                <SearchResultsWithState />
            </div>
        );
    }

    _focusSearchField() {
        const searchField = findDOMNode(this.refs.searchBox);

        if (searchField && searchField !== document.activeElement) {
            searchField.querySelector('input').focus();
        }
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

    _onKeyUp(event) {
        handleKeyPress(event, Math.floor(event.currentTarget.clientWidth / MENU_ITEM_WIDTH));
    }
}

export default addD2Context(SearchField);
