import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Observable } from 'rxjs';
import log from 'loglevel';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'd2-ui/lib/svg-icon/SvgIcon';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import { white } from 'material-ui/styles/colors';
import { config } from 'd2/lib/d2';
import Notifications from '../notifications/Notifications';
import styles, { MENU_ITEM_WIDTH } from '../header-bar-styles';
import { search, handleKeyPress, setSearchFieldFocusTo, hideWhenNotHovering } from './search.stores';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';
import { searchStore$ } from './search.stores';
import SearchResults from './SearchResults';

config.i18n.strings.add('app_search_placeholder');

class SearchField extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            searchValue: '',
        };

        this.setSearchValue = this.setSearchValue.bind(this);
        this.focusSearchField = this.focusSearchField.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.clearSearchField = this.clearSearchField.bind(this);
    }

    componentDidMount() {
        const isCtrlPressed = event => event.ctrlKey;
        const isSpaceKey = event => event.keyCode === 32 || event.key === 'Space';
        const combineFilters = (...args) => function combinedFiltersFn(event) {
            return args
                .map(filterFn => filterFn(event))
                .every(filterResult => filterResult === true);
        };

        // When Ctrl+Space is pressed focus the search field in the header bar
        this.disposable = Observable
            .fromEvent(window, 'keyup') // TODO: Using the window global directly is bad for testability
            .filter(combineFilters(isCtrlPressed, isSpaceKey))
            .subscribe(
                this.focusSearchField,
                log.error,
            );
    }

    componentWillUnmount() {
        if (this.disposable && this.disposable.unsubscribe) {
            this.disposable.unsubscribe();
        }
    }

    render() {
        return (
            <div style={styles.searchField}>
                <div style={styles.searchIconContainer}>
                    <SvgIcon icon="Search" style={styles.searchIcon} />
                </div>
                <div style={styles.searchFieldInnerWrap}>
                    <TextField
                        fullWidth
                        value={this.props.searchValue || ''}
                        onChange={this.setSearchValue}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        hintText={this.context.d2.i18n.getTranslation('app_search_placeholder')}
                        hintStyle={styles.searchFieldHintText}
                        inputStyle={styles.searchFieldInput}
                        onKeyUp={this.onKeyUp}
                        ref={searchBox => { this.searchBox = searchBox; }}
                        underlineFocusStyle={{ borderColor: white }}
                    />
                    {this.props.searchValue ? <ClearIcon style={styles.clearIcon} color={white} onClick={this.clearSearchField} /> : ''}
                </div>
                <IconButton iconStyle={{ fill: 'white' }} onClick={this.focusSearchField}>
                    <SvgIcon icon="Apps" />
                </IconButton>
                <SearchResults />
            </div>
        );
    }

    focusSearchField() {
        const searchField = this.searchBox;

        if (searchField && searchField !== document.activeElement) {
            searchField.querySelector('input').focus();
        }
    }

    clearSearchField() {
        if (this.state.hasFocus) {
            this.focusSearchField();
        }
        search('');
    }

    setSearchValue(event) {
        this.setState({ hasValue: Boolean(event.target.value) });
        search(event.target.value);
    }

    onFocus() {
        this.setState({ hasFocus: true });
        setSearchFieldFocusTo(true);
    }

    onBlur() {
        this.setState({ hasFocus: false });
        hideWhenNotHovering();
    }

    onKeyUp(event) {
        handleKeyPress(event, Math.floor(event.currentTarget.clientWidth / MENU_ITEM_WIDTH));
    }
}

SearchField.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default withStateFrom(searchStore$, SearchField);
