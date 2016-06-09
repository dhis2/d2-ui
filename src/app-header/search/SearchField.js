import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import styles, { MENU_ITEM_WIDTH } from '../header-bar-styles';
import TextField from 'material-ui/lib/text-field';
import { search, handleKeyPress, setSearchFieldFocusTo, hideWhenNotHovering } from './search.stores';
import IconButton from 'material-ui/lib/icon-button';
import AppsIcon from 'material-ui/lib/svg-icons/navigation/apps';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';
import { white } from 'material-ui/lib/styles/colors';
import { config } from 'd2/lib/d2';
import addD2Context from '../../component-helpers/addD2Context';
import SearchResults from './SearchResults';
import { Observable } from 'rx';
import log from 'loglevel';
import withStateFrom from '../../component-helpers/withStateFrom';
import { searchStore$ } from './search.stores';

config.i18n.strings.add('app_search_placeholder');

class SearchField extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            searchValue: '',
        };

        this._setSearchValue = this._setSearchValue.bind(this);
        this._focusSearchField = this._focusSearchField.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    componentDidMount() {
        const isCtrlPressed = event => event.ctrlKey;
        const isSpaceKey = event => event.keyCode === 32 || event.key === 'Space';
        const combineFilters = (...args) => {
            return function combinedFiltersFn(event) {
                return args
                    .map(filterFn => filterFn(event))
                    .every(filterResult => filterResult === true);
            };
        };

        // When Ctrl+Space is pressed focus the search field in the header bar
        this.disposable = Observable
            .fromEvent(window, 'keyup') // TODO: Using the window global directly is bad for testability
            .filter(combineFilters(isCtrlPressed, isSpaceKey))
            .subscribe(
                this._focusSearchField,
                log.error
            );
    }

    componentWillUnmount() {
        if (this.disposable && this.disposable.dispose) {
            this.disposable.dispose();
        }
    }

    render() {
        return (
            <div style={styles.searchField}>
                <div style={{
                        width: this.state.hasFocus ? '100%' : '50%',
                        transition: 'width .5s cubic-bezier(0.39, -0.04, 0.2, 1)',
                        position: 'relative',
                    }}>
                    <TextField
                        fullWidth
                        value={this.props.searchValue}
                        onChange={this._setSearchValue}
                        onFocus={this._onFocus}
                        onBlur={this._onBlur}
                        hintText={this.context.d2.i18n.getTranslation('app_search_placeholder')}
                        hintStyle={styles.searchFieldHintText}
                        inputStyle={styles.searchFieldInput}
                        onKeyUp={this._onKeyUp}
                        ref="searchBox"
                        underlineFocusStyle={{borderColor: white}}
                    />
                    {this.props.searchValue ? <ClearIcon style={styles.clearIcon} color={white} onClick={this.clearSearchField} /> : ''}
                </div>
                <IconButton onClick={this._focusSearchField}>
                    <AppsIcon color={white} />
                </IconButton>
                <SearchResults />
            </div>
        );
    }

    _focusSearchField() {
        const searchField = findDOMNode(this.refs.searchBox);

        if (searchField && searchField !== document.activeElement) {
            searchField.querySelector('input').focus();
        }
    }

    clearSearchField() {
        if (this.state.hasFocus) {
            this._focusSearchField();
        }
        search('');
    }

    _setSearchValue(event) {
        this.setState({ hasValue: Boolean(event.target.value), });
        search(event.target.value);
    }

    _onFocus() {
        this.setState({ hasFocus: true, });
        setSearchFieldFocusTo(true);
    }

    _onBlur() {
        this.setState({ hasFocus: false, });
        hideWhenNotHovering();
    }

    _onKeyUp(event) {
        handleKeyPress(event, Math.floor(event.currentTarget.clientWidth / MENU_ITEM_WIDTH));
    }
}

export default withStateFrom(searchStore$, addD2Context(SearchField));
