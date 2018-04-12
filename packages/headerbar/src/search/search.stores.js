import { Observable } from 'rxjs/Observable';
import log from 'loglevel';
import uniqBy from 'lodash/fp/uniqBy';
import curry from 'lodash/fp/curry';
import get from 'lodash/fp/get';
import { Action } from 'd2-ui-core';
import { Store } from 'd2-ui-core';
import addDeepLinksForMaintenance from './sources/maintenance-app';
import addDeepLinksForSettings from './sources/settings-app';
import headerBarStore$ from '../headerBar.store';
import { appsMenuItems$ } from '../headerBar.store';

const identity = v => v;

const searchResultBoxStateStore$ = Store.create({
    getInitialState() {
        return {
            isSearchFieldFocused: false,
            open: false,
            searchValue: '',
            selected: 0,
            searchResults: [],
        };
    }
});

const getParentApp = get('parentApp');
const hasParentApp = item => !!getParentApp(item);
const uniqueByName = uniqBy(item => item.name);
const filterByValue = curry((searchTerms, item) => searchTerms.every(term => item.label.toLowerCase().includes(term)));
const isFullApp = item => !hasParentApp(item);
const isNotAFullApp = item => !isFullApp(item);
// Only allow deep links for apps for which the user has access to the parentApp
const hasAvailableFullApp = curry((fullApps, item) => fullApps.some(app => app.name === item.parentApp));

export function setSearchValue(searchValue) {
    const matchesSearchValue = filterByValue(searchValue.trim().toLowerCase().split(/\s+/));

    searchSourceStore$
        .take(1)
        .subscribe((searchResults) => {
            const fullApps = searchResults.filter(isFullApp);
            const fullAppsThatMatchSearchString = fullApps.filter(matchesSearchValue);
            const deepLinksThatMatchSearchString = searchResults
                .filter(matchesSearchValue)
                .filter(isNotAFullApp)
                .filter(hasAvailableFullApp(fullApps));

            // Determine which parent apps we need to show at the end of the list.
            // When we have deep links in the search results we should also shown their parent app.
            const parentAppsForMatchedItems = fullApps
                .filter(item => deepLinksThatMatchSearchString
                    .map(getParentApp)
                    .some(parentApp => parentApp === item.name),
                );

            // Combine all results
            // - Full applications that match the search string
            // - Deep links that match the search string
            // - Full apps for deep links that match the search string
            // As it might be possible that Full apps are in the results twice we only show the first one
            // by running the result list through unique by name.
            const allSearchResults = uniqueByName([].concat(
                fullAppsThatMatchSearchString,
                deepLinksThatMatchSearchString,
                parentAppsForMatchedItems),
            );

            searchResultBoxStateStore$.setState({
                ...searchResultBoxStateStore$.getState(),
                searchResults: allSearchResults,
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
    .subscribe(setSearchValue);

const searchSourceStore$ = headerBarStore$
    .map(headerBarState => [].concat(headerBarState.appItems, headerBarState.profileItems))
    .flatMap(addDeepLinksForMaintenance)
    .flatMap(addDeepLinksForSettings);

export const searchStore$ = Observable
    .combineLatest(
        searchResultBoxStateStore$,
        appsMenuItems$,
        (searchResult, appsMenuItems) => {
            if (!searchResult.searchValue) {
                return {
                    ...searchResult,
                    searchResults: appsMenuItems,
                };
            }

            return searchResult;
        },
    )
    .map(resultState => ({
        ...resultState,
        searchResults: resultState.searchResults
            .map((item, index) => Object.assign({}, item, { selected: resultState.selected === index })),
        open: Boolean(resultState.isSearchFieldFocused),
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
    .filter(identity)
    .subscribe(
        itemToGoTo => window.location = itemToGoTo.action,
        log.error,
    );

// When the right arrow is pressed move the selected item to the next one
keyPress$
    .map(actionData => actionData[0])
    .filter(event => event.keyCode === 39 || event.key === 'ArrowRight')
    .subscribe(() => setSelectedIndex(1));

// When the left arrow is pressed move the selected item to the next one
keyPress$
    .map(actionData => actionData[0])
    .filter(event => event.keyCode === 37 || event.key === 'ArrowLeft')
    .subscribe(() => setSelectedIndex(-1));

// When the left arrow is pressed move the selected item to the next row
keyPress$
    .filter(([event, itemsOnRow]) => event.keyCode === 38 || event.key === 'ArrowUp')
    .subscribe(([_, itemsOnRow]) => setSelectedIndex(-itemsOnRow));

// When the left arrow is pressed move the selected item to the previous row
keyPress$
    .filter(([event, itemsOnRow]) => event.keyCode === 40 || event.key === 'ArrowDown')
    .subscribe(([_, itemsOnRow]) => setSelectedIndex(itemsOnRow));
