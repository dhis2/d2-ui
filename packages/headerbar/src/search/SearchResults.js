import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { config } from 'd2/lib/d2';
import SearchResultsList from './SearchResultsList';
import HeaderMenuItem from '../menus/HeaderMenuItem';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';
import addD2Context from 'd2-ui/lib/component-helpers/addD2Context';
import { searchStore$, setHovering } from './search.stores';
import styles, { getSearchResultsHeight } from '../header-bar-styles';
import NoResults from './NoResults';
import getBaseUrlFromD2ApiUrl from '../utils/getBaseUrlFromD2ApiUrl';

// App menu strings to be translated
config.i18n.strings.add('manage_my_apps');

const getBaseUrl = getBaseUrlFromD2ApiUrl;

function SearchResults(props, { d2 }) {
    const menuItems = (props.searchResults || []).map(item => (<HeaderMenuItem key={item.name} {...item} />));

    const moreAppsButton = (
        <FlatButton
            style={styles.moreAppsButton}
            href={`${getBaseUrl(d2)}/dhis-web-menu-management`}
        >
            {d2.i18n.getTranslation('manage_my_apps')}
        </FlatButton>
    );

    const searchResultBoxContent = menuItems.length ? (<SearchResultsList>{menuItems}</SearchResultsList>) : (<NoResults />);

    const searchResultsWrap = Object.assign(
        {},
        styles.searchResults,
        {
            display: 'flex',
            flexDirection: 'column',
            height: props.open ? getSearchResultsHeight() : 0,
            overflow: props.open ? undefined : 'hidden',
        },
    );

    return (
        <Paper style={searchResultsWrap} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
                {searchResultBoxContent}
            </div>
            <div style={styles.moreAppsButtonWrap}>
                {moreAppsButton}
            </div>
        </Paper>
    );
}

// Connect the store to the SearchResults component
// TODO: This means we can only have one search results at all times (Perhaps make this more dynamic?)
const SearchResultsWithState = withStateFrom(searchStore$, addD2Context(SearchResults));

export default SearchResultsWithState;
