import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import UserList from './UserList';

const defaultState = {
    element: null,
    listIsOpen: false,
    captureText: false,
    captureStartPosition: null,
    capturedText: null,
    users: [],
    selectedUserIndex: 0,
};

class MentionsWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;

        this.lookupUser = debounce(this.lookupUser, 250);
    }

    lookupUser = query => {
        this.props.d2.Api.getApi()
            .get('users.json', {
                query,
                fields: 'id,displayName,userCredentials[username]',
            })
            .then(response => {
                if (response.users.length) {
                    this.setState({
                        users: response.users,
                        listIsOpen: true,
                    });
                }
            });
    };

    // event bubbles up from the wrapped input/textarea
    onKeyDown = event => {
        const { key, shiftKey } = event;
        const element = event.target;
        const { selectionStart, selectionEnd } = element;

        // '@' triggers the user lookup/suggestion
        if (!this.state.captureText && key === '@' && shiftKey === true) {
            this.setState({
                element,
                captureText: true,
                captureStartPosition: selectionStart + 1,
            });
        } else if (this.state.captureText) {
            if (
                key === ' ' ||
                (key === 'Backspace' && selectionStart <= this.state.captureStartPosition)
            ) {
                // XXX
                this.setState(defaultState);
            } else if (this.state.users.length) {
                const selectedUserIndex = this.state.selectedUserIndex;

                switch (key) {
                    case 'Enter':
                        event.preventDefault();
                        if (selectedUserIndex >= 0) {
                            this.onUserSelect(this.state.users[selectedUserIndex]);
                        }
                        break;
                    case 'ArrowDown':
                        event.preventDefault();

                        if (this.state.selectedUserIndex < this.state.users.length - 1) {
                            this.setState({ selectedUserIndex: this.state.selectedUserIndex + 1 });
                        }

                        break;
                    case 'ArrowUp':
                        event.preventDefault();

                        if (this.state.selectedUserIndex > 0) {
                            this.setState({ selectedUserIndex: this.state.selectedUserIndex - 1 });
                        }

                        break;
                }
            }
        }

        // this is to make sure the state has been updated
        // otherwise the last character is not included in the captured text
        // also debounce
        setTimeout(() => {
            if (this.state.captureText) {
                const spacePosition = element.value.indexOf(
                    ' ',
                    this.state.captureStartPosition - 1
                );

                const filterValue = element.value.substring(
                    this.state.captureStartPosition,
                    spacePosition > 0 ? spacePosition : selectionEnd + 1
                );

                if (!filterValue || filterValue !== this.state.capturedText) {
                    this.lookupUser(filterValue);

                    this.setState({ capturedText: filterValue });
                } else if (filterValue.length === 0) {
                    this.setState({ capturedText: null, users: [] });
                }
            }
        }, 0);
    };

    onUserListClose = () => {
        this.setState(defaultState);
    };

    onUserSelect = user => {
        const originalValue = this.state.element.value;
        const newValue = `${originalValue.slice(
            0,
            this.state.captureStartPosition - 1
        )}${originalValue
            .slice(this.state.captureStartPosition - 1)
            .replace(/^@\w*/, `@${user.userCredentials.username}`)}`;

        const component = this.props.children;

        // for a controlled component
        // trigger onChange on the component to keep its state aligned
        // otherwise try to set the value directly
        if (component.props.onChange) {
            component.props.onChange(newValue);
        } else {
            this.state.element.value = newValue;
        }

        // need to refocus on the input/textarea
        this.state.element.focus();

        this.setState(defaultState);
    };

    render() {
        const { children } = this.props;
        const { element, listIsOpen, users, selectedUserIndex } = this.state;

        return (
            <div onKeyDown={this.onKeyDown}>
                {children}
                <UserList
                    anchorEl={element}
                    open={listIsOpen}
                    users={users}
                    selectedUser={users[selectedUserIndex]}
                    onClose={this.onUserListClose}
                    onSelect={this.onUserSelect}
                />
            </div>
        );
    }
}

MentionsWrapper.defaultProps = {
    d2: null,
};

MentionsWrapper.propTypes = {
    d2: PropTypes.object,
};

export default MentionsWrapper;
