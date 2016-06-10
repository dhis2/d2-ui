import React from 'react';
import Paper from 'material-ui/lib/paper';
import SearchResultsList from './SearchResultsList';
import HeaderMenuItem from '../menus/HeaderMenuItem';
import withStateFrom from '../../component-helpers/withStateFrom';
import addD2Context from '../../component-helpers/addD2Context';
import { searchStore$, setHovering } from './search.stores';
import styles, { getSearchResultsHeight } from '../header-bar-styles';
import NoResults from './NoResults';
import FlatButton from 'material-ui/lib/flat-button';
import { config } from 'd2/lib/d2';

// App menu strings to be translated
config.i18n.strings.add('more_applications');

function getBaseUrl(d2) {
    if (d2.Api) {
        return d2.Api.getApi().baseUrl.replace('/api', '');
    }
    return './'; // TODO: Get old base url from local storage
}

function SearchResults(props, { d2 }) {
    const menuItems = (props.searchResults || []).map((item, index) => (<HeaderMenuItem key={index} {...item} />));

    const moreAppsButton = (
        <FlatButton
            style={styles.moreAppsButton}
            linkButton={true}
            href={getBaseUrl(d2) + '/dhis-web-commons-about/modules.action'}
        >
            {d2.i18n.getTranslation('Manage my apps')}
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
        }
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
