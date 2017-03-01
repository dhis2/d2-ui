/* eslint react/jsx-no-bind: 0 */

import React, { Component, PropTypes } from 'react';
import { config } from 'd2/lib/d2';
import AutoComplete from 'material-ui/AutoComplete';
import PermissionPicker from './PermissionPicker.component';

config.i18n.strings.add('add_users_and_user_groups');

const styles = {
    container: {
        fontWeight: '400',
        marginTop: 16,
        padding: 16,
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },

    title: {
        color: '#818181',
        paddingBottom: 8,
    },

    searchBox: {
        backgroundColor: 'white',
        boxShadow: '2px 2px 2px #cccccc',
        padding: '0px 16px',
        marginRight: '16px',
    },
};

// TOOD: Use RxJs instead.
function debounce(inner, ms = 0) {
    let timer = null;
    let resolves = [];

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const result = inner(...args);
            resolves.forEach(r => r(result));
            resolves = [];
        }, ms);

        return new Promise(r => resolves.push(r));
    };
}

class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialViewAccess: true,
            initialEditAccess: true,
            searchResult: [],
        };
    }

    accessOptionsChanged(initialViewAccess, initialEditAccess) {
        this.setState({ initialViewAccess, initialEditAccess });
    }

    fetchSearchResult(searchText) {
        if (searchText === '') {
            this.setState({ searchResult: [] });
        } else {
            this.props.onSearch(searchText)
            .then((searchResult) => {
                const noDuplicates = searchResult.filter(
                    result => !this.props.currentAccesses.some(access => access.id === result.id))
                this.setState({ searchResult: noDuplicates });
            });
        }
    }

    groupWasSelected(index) {
        const selectedGroup = this.state.searchResult[index];
        this.props.addUserGroupAccess({
            ...selectedGroup,
            canView: this.state.initialViewAccess,
            canEdit: this.state.initialEditAccess,
        });
    }

    render() {
        const debouncedSearch = debounce(this.fetchSearchResult.bind(this), 300);
        return (
            <div style={styles.container}>
                <div style={styles.title}>
                    {this.context.d2.i18n.getTranslation('add_users_and_user_groups')}
                </div>
                <div style={styles.innerContainer}>
                    <AutoComplete
                        fullWidth
                        openOnFocus
                        dataSource={this.state.searchResult}
                        dataSourceConfig={{ text: 'displayName', value: 'id' }}
                        onUpdateInput={debouncedSearch}
                        onNewRequest={(chosenRequest, index) => this.groupWasSelected(index)}
                        filter={() => true}
                        underlineShow={false}
                        hintText="Enter names"
                        style={styles.searchBox}
                    />
                    <PermissionPicker
                        disableNoAccess
                        onChange={(access) => { this.accessOptionsChanged(access.canView, access.canEdit); }}
                        accessOptions={{
                            canView: this.state.initialViewAccess,
                            canEdit: this.state.initialEditAccess,
                        }}
                    />
                </div>
            </div>
        );
    }
}

UserSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
    addUserGroupAccess: PropTypes.func.isRequired,
    currentAccesses: PropTypes.array.isRequired,
};

UserSearch.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default UserSearch;
