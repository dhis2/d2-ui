import headerBarStore$ from '../headerBar.store';
import Action from '../../action/Action';
import Store from '../../store/Store';
import { Observable } from 'rx';
import addDeepLinksForMaintenance from './sources/maintenance-app';

const searchResultBoxStateStore$ = Store.create({
    getInitialState() {
        return {
            isSearchFieldFocused: false,
            open: false,
            searchValue: '',
        };
    },
});

export function setSearchValue(searchValue) {
    searchResultBoxStateStore$.setState({ searchValue });
}

export function setHovering(isHoveringOverResults) {
    searchResultBoxStateStore$.setState({
        isHoveringOverResults,
    });
}

export function setSearchFieldFocusTo(value) {
    searchResultBoxStateStore$.setState({
        isSearchFieldFocused: value,
    });
}

export function hideWhenNotHovering() {
    if (searchResultBoxStateStore$.getState() && !searchResultBoxStateStore$.getState().isHoveringOverResults) {
        setSearchFieldFocusTo(false);
    }
}

export const search = Action.create('Search Apps');
search
    .map(action => action.data || '')
    .debounce(200)
    .subscribe(setSearchValue);

const searchSourceStore$ = headerBarStore$
    .map(headerBarState => [].concat(headerBarState.appItems, headerBarState.profileItems))
    .flatMap(addDeepLinksForMaintenance);

export const searchStore$ = Observable
    .combineLatest(
        searchSourceStore$,
        searchResultBoxStateStore$,
        (searchSource, resultState) => {
            return {
                searchSource,
                resultState,
            };
        }
    )
    .map(({searchSource, resultState}) => {
        return {
            ...resultState,
            searchResults: searchSource.filter(item => item.label.toLowerCase().indexOf(resultState.searchValue.toLowerCase()) >= 0),
            open: Boolean(resultState.isSearchFieldFocused && resultState.searchValue),
        };
    });
