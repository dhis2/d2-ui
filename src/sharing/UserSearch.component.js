import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'd2/lib/d2';
import AutoComplete from 'material-ui/AutoComplete';
import PermissionPicker from './PermissionPicker.component';
import { Subject, Observable } from 'rxjs';
import { accessObjectToString } from './utils';

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
            meta: { canView: true, canEdit: true },
            data: { canView: false, canEdit: false },
        },
        searchResult: [],
    };

    inputStream = new Subject();

    componentWillMount() {
        this.inputStream
            .debounce(() => Observable.timer(searchDelay))
            .subscribe(searchText => {
                this.fetchSearchResult(searchText);
            });
    }

    hasNoCurrentAccess = userOrGroup => this.props.currentAccessIds.indexOf(userOrGroup.id) === -1;

    fetchSearchResult = searchText => {
        searchText === ''
            ? this.handleSearchResult([])
            : this.props.onSearch(searchText).then(({ users, userGroups }) => {

                // Add type to object to support dataSourceConfig in AutoComplete
                const addType = type => result => ({ ...result, type });
                const searchResult = users
                    .map(addType('userAccess'))
                    .filter(this.hasNoCurrentAccess)
                    .concat(userGroups
                        .map(addType('userGroupAccess'))
                        .filter(this.hasNoCurrentAccess)
                    );
                
                this.handleSearchResult(searchResult);
            });
    }

    handleSearchResult = searchResult => {
        this.setState({ searchResult });
    }

    handleUpdateInput = searchText => {
        this.inputStream.next(searchText);
    }

    accessOptionsChanged = accessOptions => {
        this.setState({
            defaultAccess: accessOptions,
        });
    }

    onResultClick = (_, index) => {
        const selection = this.state.searchResult[index];
        const type = selection.type;
        delete selection.type;

        type === 'userAccess'
            ? this.props.addUserAccess({ ...selection, access: accessObjectToString(this.state.defaultAccess) })
            : this.props.addUserGroupAccess({ ...selection, access: accessObjectToString(this.state.defaultAccess) })
    }

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
                        filter={() => true}
                        dataSource={this.state.searchResult}
                        dataSourceConfig={{ text: 'displayName', value: 'id' }}
                        hintText={this.context.d2.i18n.getTranslation('enter_names')}
                        onNewRequest={this.onResultClick}
                        onUpdateInput={this.handleUpdateInput}
                        style={styles.searchBox}
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
