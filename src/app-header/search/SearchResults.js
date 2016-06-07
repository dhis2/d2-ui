import React from 'react';
import Paper from 'material-ui/lib/paper';
import SearchResultsList from './SearchResultsList';
import HeaderMenuItem from '../menus/HeaderMenuItem';
import withStateFrom from '../../component-helpers/withStateFrom';
import { searchStore$, setHovering } from './search.stores';
import styles from '../header-bar-styles';

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

// Connect the store to the SearchResults component
// TODO: This means we can only have one search results at all times (Perhaps make this more dynamic?)
const SearchResultsWithState = withStateFrom(searchStore$, SearchResults);

export default SearchResultsWithState;
