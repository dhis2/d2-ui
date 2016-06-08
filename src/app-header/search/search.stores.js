import headerBarStore$ from '../headerBar.store';
import Action from '../../action/Action';
import Store from '../../store/Store';
import { Observable, helpers } from 'rx';
import addDeepLinksForMaintenance from './sources/maintenance-app';
import log from 'loglevel';

const searchResultBoxStateStore$ = Store.create({
    getInitialState() {
        return {
            isSearchFieldFocused: false,
            open: false,
            searchValue: '',
            selected: 0,
            searchResults: [],
        };
    },
});

export function setSearchValue(searchValue) {
    searchSourceStore$
        .take(1)
        .subscribe((searchResults) => {
            searchResultBoxStateStore$.setState({
                ...searchResultBoxStateStore$.getState(),
                searchResults: searchResults
                    .filter(item => item.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0),
                searchValue,
            });
        });
}

export function setHovering(isHoveringOverResults) {
    searchResultBoxStateStore$.setState({
        ...searchResultBoxStateStore$.getState(),
        isHoveringOverResults,
    });
}

export function setSearchFieldFocusTo(value) {
    searchResultBoxStateStore$.setState({
        ...searchResultBoxStateStore$.getState(),
        isSearchFieldFocused: value,
    });
}

function setSelectedIndex(selected) {
    const numberOfItems = searchResultBoxStateStore$.getState().searchResults.length;

    if (searchResultBoxStateStore$.getState().selected + selected >= numberOfItems) {
        return;
    }

    if (searchResultBoxStateStore$.getState().selected + selected < 0) {
        return;
    }

    searchResultBoxStateStore$.setState({
        ...searchResultBoxStateStore$.getState(),
        selected: searchResultBoxStateStore$.getState().selected + selected,
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

export const searchStore$ = searchResultBoxStateStore$
    .map((resultState) => ({
        ...resultState,
        searchResults: resultState.searchResults.map((item, index) => Object.assign({}, item, { selected: resultState.selected === index })),
        open: Boolean(resultState.isSearchFieldFocused && resultState.searchValue),
    }));

export const handleKeyPress = Action.create();
const keyPress$ = handleKeyPress
    .map(action => action.data);


// Handle an enter key press to go the location of the first item
keyPress$
    .filter(([event]) => event.keyCode === 13 || event.key === 'Enter')
    .flatMap(() => searchResultBoxStateStore$.take(1))
    // Find the selected menu item in the search results list by the `selected` index
    .map(state => state.searchResults.find((item, index) => index === state.selected))
    .filter(helpers.identity)
    .subscribe(
        itemToGoTo => window.location = itemToGoTo.action,
        log.error
    );

// When the right arrow is pressed move the selected item to the next one
keyPress$
    .map(actionData => actionData[0])
    .filter(event => event.keyCode === 39 || event.key === 'ArrowRight')
    .subscribe(event => setSelectedIndex(1));

// When the left arrow is pressed move the selected item to the next one
keyPress$
    .map(actionData => actionData[0])
    .filter(event => event.keyCode === 37 || event.key === 'ArrowLeft')
    .subscribe(event => setSelectedIndex(-1));

// When the left arrow is pressed move the selected item to the next row
keyPress$
    .filter(([event, itemsOnRow]) => event.keyCode === 38 || event.key === 'ArrowUp')
    .subscribe(([_, itemsOnRow]) => setSelectedIndex(-itemsOnRow));

// When the left arrow is pressed move the selected item to the previous row
keyPress$
    .filter(([event, itemsOnRow]) => event.keyCode === 40 || event.key === 'ArrowDown')
    .subscribe(([_, itemsOnRow]) => setSelectedIndex(itemsOnRow));
