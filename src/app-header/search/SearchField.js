import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Observable } from 'rxjs';
import log from 'loglevel';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import { white } from 'material-ui/styles/colors';
import { config } from 'd2/lib/d2';
import styles, { MENU_ITEM_WIDTH } from '../header-bar-styles';
import { search, handleKeyPress, setSearchFieldFocusTo, hideWhenNotHovering } from './search.stores';
import addD2Context from '../../component-helpers/addD2Context';
import SearchResults from './SearchResults';
import withStateFrom from '../../component-helpers/withStateFrom';
import { searchStore$ } from './search.stores';

config.i18n.strings.add('app_search_placeholder');

class SearchField extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            searchValue: '',
        };

        this.onSearchValueSet = this.onSearchValueSet.bind(this);
        this.onSearchFieldFocused = this.onSearchFieldFocused.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSearchFieldCleared = this.onSearchFieldCleared.bind(this);
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
                this.onSearchFieldFocused,
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
                <div style={Object.assign({ width: this.state.hasFocus ? '100%' : '50%' }, styles.searchFieldInnerWrap)}>
                    <TextField
                        fullWidth
                        value={this.props.searchValue || ''}
                        onChange={this.onSearchValueSet}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        hintText={this.context.d2.i18n.getTranslation('app_search_placeholder')}
                        hintStyle={styles.searchFieldHintText}
                        inputStyle={styles.searchFieldInput}
                        onKeyUp={this.onKeyUp}
                        ref="searchBox"
                        underlineFocusStyle={{ borderColor: white }}
                    />
                    {this.props.searchValue ? <ClearIcon style={styles.clearIcon} color={white} onClick={this.onSearchFieldCleared} /> : ''}
                </div>
                <IconButton onClick={this.onSearchFieldFocused}>
                    <AppsIcon color={white} />
                </IconButton>
                <SearchResults />
            </div>
        );
    }

    onSearchFieldFocused() {
        const searchField = findDOMNode(this.refs.searchBox);

        if (searchField && searchField !== document.activeElement) {
            searchField.querySelector('input').focus();
        }
    }

    onSearchFieldCleared() {
        if (this.state.hasFocus) {
            this.onSearchFieldFocused();
        }
        search('');
    }

    onSearchValueSet(event) {
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

export default withStateFrom(searchStore$, addD2Context(SearchField));
