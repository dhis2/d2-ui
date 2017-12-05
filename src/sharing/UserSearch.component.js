import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'd2/lib/d2';
import AutoComplete from 'material-ui/AutoComplete';
import PermissionPicker from './PermissionPicker.component';
import { Subject, Observable } from 'rxjs';

config.i18n.strings.add('add_users_and_user_groups');
config.i18n.strings.add('enter_names');

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

const searchDelay = 300;

class UserSearch extends Component {
    state = {
        initialViewAccess: true,
        initialEditAccess: true,
        searchText: '',
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

    fetchSearchResult = searchText => {
        searchText === ''
            ? this.setState({ searchResult: [] })
            : this.props.onSearch(searchText).then(result => {
                const alreadyInAccessList = res => !this.props.currentAccesses.some(access => access.id === res.id);
                const searchResult = result.filter(alreadyInAccessList);
                this.setState({ searchResult });
            });
    }

    accessOptionsChanged = ({ canView, canEdit }) => {
        this.setState({
            initialViewAccess: canView,
            initialEditAccess: canEdit,
        });
    }

    groupWasSelected = (chosenRequest, index) => {
        if (index === -1) return;
        this.setState({ searchText: '' });
        const selectedGroup = this.state.searchResult[index];
        this.props.addUserGroupAccess({
            ...selectedGroup,
            canView: this.state.initialViewAccess,
            canEdit: this.state.initialEditAccess,
        });
    }

    handleUpdateInput = (searchText) => {
        this.setState({ searchText });
        this.inputStream.next(searchText);
    }

    generousFilter = () => true;

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.title}>
                    {this.context.d2.i18n.getTranslation('add_users_and_user_groups')}
                </div>
                <div style={styles.innerContainer}>
                    <AutoComplete
                        dataSource={this.state.searchResult}
                        dataSourceConfig={{ text: 'displayName', value: 'id' }}
                        filter={this.generousFilter}
                        fullWidth
                        hintText={this.context.d2.i18n.getTranslation('enter_names')}
                        onNewRequest={this.groupWasSelected}
                        onUpdateInput={this.handleUpdateInput}
                        openOnFocus
                        searchText={this.state.searchText}
                        style={styles.searchBox}
                        underlineShow={false}
                    />
                    <PermissionPicker
                        disableNoAccess
                        onChange={this.accessOptionsChanged}
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
