import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'd2/lib/d2';
import { Subject, Observable } from 'rxjs';
import AutoComplete from 'material-ui/AutoComplete';

import { accessObjectToString } from './utils';
import PermissionPicker from './PermissionPicker.component';

config.i18n.strings.add('add_users_and_user_groups');
config.i18n.strings.add('enter_names');

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

    searchBox: {
        backgroundColor: 'white',
        boxShadow: '2px 2px 2px #cccccc',
        padding: '0px 16px',
        marginRight: '16px',
    },
};

const searchDelay = 300;

class UserSearch extends Component {
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
            .debounce(() => Observable.timer(searchDelay))
            .subscribe((searchText) => {
                this.fetchSearchResult(searchText);
            });
    }

    onResultClick = (_, index) => {
        // Material UI triggers an 'onUpdateInput' when a search result is clicked. Therefore, we
        // immediately pushes a new item to the search stream to prevent the stream from searching
        // for the item again.
        this.inputStream.next('');

        const selection = this.state.searchResult[index];
        const type = selection.type;
        delete selection.type;

        if (type === 'userAccess') {
            this.props.addUserAccess({ ...selection, access: accessObjectToString(this.state.defaultAccess) });
        } else this.props.addUserGroupAccess({ ...selection, access: accessObjectToString(this.state.defaultAccess) });

        this.clearSearchText();
    }

    inputStream = new Subject();

    hasNoCurrentAccess = userOrGroup => this.props.currentAccessIds.indexOf(userOrGroup.id) === -1;

    fetchSearchResult = (searchText) => {
        if (searchText === '') {
            this.handleSearchResult([]);
        } else {
            this.props.onSearch(searchText).then(({ users, userGroups }) => {
                const addType = type => result => ({ ...result, type });
                const searchResult = users
                    .map(addType('userAccess'))
                    .filter(this.hasNoCurrentAccess)
                    .concat(userGroups
                        .map(addType('userGroupAccess'))
                        .filter(this.hasNoCurrentAccess),
                    );

                this.handleSearchResult(searchResult);
            });
        }
    }

    handleSearchResult = (searchResult) => {
        this.setState({ searchResult });
    }

    handleUpdateInput = (searchText) => {
        this.inputStream.next(searchText);
        this.setState({ searchText });
    }

    accessOptionsChanged = (accessOptions) => {
        this.setState({
            defaultAccess: accessOptions,
        });
    }

    clearSearchText = () => {
        this.setState({
            searchText: '',
        });
    }

    noFilter = () => true;

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.title}>
                    {this.context.d2.i18n.getTranslation('add_users_and_user_groups')}
                </div>
                <div style={styles.innerContainer}>
                    <AutoComplete
                        fullWidth
                        openOnFocus
                        filter={this.noFilter}
                        dataSource={this.state.searchResult}
                        dataSourceConfig={{ text: 'displayName', value: 'id' }}
                        hintText={this.context.d2.i18n.getTranslation('enter_names')}
                        onNewRequest={this.onResultClick}
                        onUpdateInput={this.handleUpdateInput}
                        style={styles.searchBox}
                        searchText={this.state.searchText}
                        underlineShow={false}
                    />
                    <PermissionPicker
                        access={this.state.defaultAccess}
                        accessOptions={{
                            meta: { canView: true, canEdit: true, noAccess: false },
                            data: this.props.dataShareable && { canView: true, canEdit: true, noAccess: true },
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
