import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import UserListContainer from './UserList';

export const defaultState = {
    element: null,
    listIsOpen: false,
    captureText: false,
    captureStartPosition: null,
    capturedText: null,
    selectedUserIndex: 0,
};

class MentionsWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = { ...defaultState, users: [] };

        this.lookupUser = debounce(this.lookupUser, 250);
    }

    reset = () => {
        this.state.element.removeEventListener('input', this.onInput);

        this.setState(defaultState);
    };

    onInput = event => {
        this.computeFilter(event.target);
    };

    lookupUser = (query = '') => {
        this.props.d2.Api.getApi()
            .get('users.json', {
                query,
                fields: 'id,displayName,userCredentials[username]',
                order: 'displayName:iasc',
            })
            .then(response => {
                this.setState({
                    users: response.users,
                    listIsOpen: true,
                });
            });
    };

    computeFilter = element => {
        const { selectionEnd, value } = element;

        if (this.state.captureText) {
            const spacePosition = value.indexOf(' ', this.state.captureStartPosition - 1);

            const filterValue = value.substring(
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
    };

    // event bubbles up from the wrapped input/textarea
    onKeyDown = event => {
        const { key } = event;
        const element = event.target;
        const { selectionStart } = element;

        // '@' triggers the user lookup/suggestion
        if (!this.state.captureText && key === '@') {
            element.addEventListener('input', this.onInput);

            this.setState({
                element,
                captureText: true,
                captureStartPosition: selectionStart + 1,
            });

            this.lookupUser();
        } else if (this.state.captureText) {
            if (
                key === ' ' ||
                (key === 'Backspace' && selectionStart <= this.state.captureStartPosition)
            ) {
                this.reset();
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
                    default:
                    // other key strokes, typically the text typed
                    // the onInput event handler set on the input element is triggering the user lookup
                }
            }
        }
    };

    onUserSelect = user => {
        const originalValue = this.state.element.value;
        const newValue = `${originalValue.slice(
            0,
            this.state.captureStartPosition - 1
        )}${originalValue
            .slice(this.state.captureStartPosition - 1)
            .replace(/^@\w*/, `@${user.userCredentials.username} `)}`;

        this.reset();

        // typically for connected components we want the state to be updated too
        // but the logic belongs to the wrapped component, so we just invoke the supplied callback
        if (this.props.onUserSelect) {
            this.props.onUserSelect(newValue);
        }

        // need to refocus on the input/textarea
        this.state.element.focus();

        // position the cursor at the end
        const element = this.state.element;

        setTimeout(() => element.setSelectionRange(-1, -1), 0);
    };

    render() {
        const { children } = this.props;
        const { element, listIsOpen, users, selectedUserIndex, capturedText } = this.state;

        return (
            <div onKeyDown={this.onKeyDown}>
                {children}
                <UserListContainer
                    open={listIsOpen}
                    anchorEl={element}
                    users={users}
                    selectedUser={users[selectedUserIndex]}
                    filter={capturedText}
                    onClose={this.reset}
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
    onUserSelect: PropTypes.func.isRequired,
};

export default MentionsWrapper;
