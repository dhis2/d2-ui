import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

import { accessObjectToString } from './utils';
import PermissionPicker from './PermissionPicker.component';
import AutoComplete from './AutoComplete.component';

const styles = {
    container: {
        fontWeight: '400',
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
};

const searchDelay = 300;
const searchResultsCount = 10;

class UserSearch extends Component {
    constructor(props, context) {
        super(props);
        context.d2.i18n.addStrings([
            'add_users_and_user_groups',
            'enter_names',
        ]);
    }

    state = {
        defaultAccess: {
            meta: { canView: true, canEdit: true },
            data: { canView: false, canEdit: false },
        },
        searchResult: [],
        searchText: '',
    };

    componentWillMount() {
        this.inputStream
            .pipe(
                debounceTime(searchDelay),
                switchMap(searchText => Observable.from(this.fetchSearchResult(searchText)))
            )
            .subscribe(searchResults => {
                this.handleSearchResult(searchResults)
            });
    }

    onItemSelected = selected => {
        // Material UI triggers an 'onUpdateInput' when a search result is clicked. Therefore, we
        // immediately pushes a new item to the search stream to prevent the stream from searching
        // for the item again.
        this.inputStream.next('');

        const selection = this.state.searchResult.find(
            r => r.id === selected.id
        );

        const type = selection.type;
        delete selection.type;

        if (type === 'userAccess') {
            this.props.addUserAccess({
                ...selection,
                access: accessObjectToString(this.state.defaultAccess),
            });
        } else {
            this.props.addUserGroupAccess({
                ...selection,
                access: accessObjectToString(this.state.defaultAccess),
            });
        }
        this.clearSearchText();
    };

    inputStream = new Subject();

    hasNoCurrentAccess = userOrGroup =>
        this.props.currentAccessIds.indexOf(userOrGroup.id) === -1;

    fetchSearchResult = searchText => {
        if (searchText === '') {
            return Promise.resolve([]);
        } else {
            this.props.onSearch(searchText, searchResultsCount).then(({ users, userGroups }) => {
                const addType = type => result => ({ ...result, type });
                const searchResults = users
                    .map(addType('userAccess'))
                    .filter(this.hasNoCurrentAccess)
                    .concat(
                        userGroups
                            .map(addType('userGroupAccess'))
                            .filter(this.hasNoCurrentAccess)
                    );
                return searchResults
            });
        }
    };

    handleSearchResult = searchResult => {
        this.setState({ searchResult });
    };

    onInputChanged = searchText => {
        this.inputStream.next(searchText);
        this.setState({ searchText });
    };

    accessOptionsChanged = accessOptions => {
        this.setState({
            defaultAccess: accessOptions,
        });
    };

    clearSearchText = () => {
        this.setState({
            searchText: '',
        });
    };

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.title}>
                    {this.context.d2.i18n.getTranslation(
                        'add_users_and_user_groups'
                    )}
                </div>
                <div style={styles.innerContainer}>
                    <AutoComplete
                        suggestions={this.state.searchResult}
                        placeholderText={this.context.d2.i18n.getTranslation(
                            'enter_names'
                        )}
                        onItemSelected={this.onItemSelected}
                        onInputChanged={this.onInputChanged}
                        searchText={this.state.searchText}
                        classes={{}}
                    />
                    <PermissionPicker
                        access={this.state.defaultAccess}
                        accessOptions={{
                            meta: {
                                canView: true,
                                canEdit: true,
                                noAccess: false,
                            },
                            data: this.props.dataShareable && {
                                canView: true,
                                canEdit: true,
                                noAccess: true,
                            },
                        }}
                        onChange={this.accessOptionsChanged}
                    />
                </div>
            </div>
        );
    }
}

UserSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
    addUserAccess: PropTypes.func.isRequired,
    dataShareable: PropTypes.bool.isRequired,
    addUserGroupAccess: PropTypes.func.isRequired,
    currentAccessIds: PropTypes.array.isRequired,
};

UserSearch.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default UserSearch;
