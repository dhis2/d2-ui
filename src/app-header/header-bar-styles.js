import { white, black } from 'material-ui/lib/styles/colors';
import { Observable } from 'rx';
import log from 'loglevel';
import curry from 'lodash/fp/curry';

export const MENU_ITEM_WIDTH = 125;

export function applyUserStyle(user, style) {
    switch (user.userSettings.keyStyle) {
    case 'vietnam/vietnam.css':
        return Object.assign({}, style, { background: '#B40303' });
    case 'india/india.css':
        return Object.assign({}, style, { background: '#EA5911' });
    case 'green/green.css':
        return Object.assign({}, style, { background: '#467E4A' });
    default:
        break;
    }

    return style;
}

let styles = {};

export function getWindowWidth() {
    if (!global.document) {
        return 0;
    }

    return Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0);
}

export const toggleStyle = curry(function toggleStyle(predicateFn, whenTrue, whenFalse) {
    console.log(predicateFn());
    return predicateFn() ? whenTrue : whenFalse;
});

export const whenWidthLargerThan1150 = toggleStyle(() => getWindowWidth() > 1150);

/**
 * Calculates the height of the search results box. When the user has a large screen height we fit a max of four rows
 * of search results onto the screen. If four rows is too big for the current screen size we limit the search results box
 * to 80% of the current viewport height.
 *
 * @returns {number} The height of the search result box in pixels.
 */
export function getSearchResultsHeight() {
    const maxResultRowsHeight = MENU_ITEM_WIDTH * 4;

    if (!global.document) {
        return maxResultRowsHeight;
    }

    const eightyPercentHeight = Math.max(global.document.documentElement.clientHeight, window.innerHeight || 0) * 0.8;

    if (eightyPercentHeight < maxResultRowsHeight) {
        return eightyPercentHeight;
    }
    return maxResultRowsHeight;
}

// Only attach the window resize listener when we have a document
if (global.document) {
    // Track the resize event on the window to recalculate the height of the search results box.
    Observable
        .fromEvent(global, 'resize')
        .debounce(300)
        .subscribe(
            () => Object.assign(styles.searchResults, { maxHeight: getSearchResultsHeight() }),
            log.error
        );
}

styles = {
    avatar: {
        fontSize: '1.3rem',
        letterSpacing: -2,
        lineHeight: '32px',
    },

    avatarBig: {
        fontSize: '34px',
        letterSpacing: -2,
        lineHeight: '60px',
    },

    headerBar: {
        boxSizing: 'border-box',
        background: '#276696',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: 48,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1400,
    },

    headerTitle: {
        flex: 1,
        color: '#FFF',
    },

    headerMenu: {
        flex: '0 0 auto',
        padding: '0 1rem',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },

    menusWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: '2rem',
    },

    dropDownWrap: {
        position: 'absolute',
        display: 'none',
        padding: '1rem',
        right: 40,
        overflow: 'hidden',
        width: 400,
        flexDirection: 'column',
        top: 48,
    },

    searchField: {
        display: 'flex',
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        maxWidth: 550,
        justifyContent: 'flex-end',
        minWidth: 420,
    },

    searchResultList: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    searchResults: {
        position: 'absolute',
        top: 48,
        left: 0,
        right: 0,
        maxWidth: 673,
        maxHeight: getSearchResultsHeight(),
        overflow: 'auto',
        transition: 'padding-top .3s cubic-bezier(0.39, -0.04, 0.2, 1), padding-bottom .3s cubic-bezier(0.39, -0.04, 0.2, 1), height .3s cubic-bezier(0.39, -0.04, 0.2, 1)',
        boxSizing: 'border-box',
    },

    searchFieldInput: {
        color: white,
        flex: 1,
    },

    searchFieldHintText: {
        color: '#CCC',
    },

    menuItemLink: {
        padding: '1rem',
        display: 'flex',
        width: MENU_ITEM_WIDTH,
        height: MENU_ITEM_WIDTH,
        boxSizing: 'border-box',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: black,
    },

    menuItemIcon: {
        height: 48,
        width: 48,
    },

    moreAppsButton: {
        marginTop: '1rem',
        width: '100%',
        display: 'block',
        textAlign: 'center',
    },

    moreAppsButtonWrap: {
        width: '100%',
        padding: '1rem', boxSizing: 'border-box',
    },

    clearIcon: {
        position: 'absolute',
        top: '10px',
        right: '5px',
    },
};

export default styles;
