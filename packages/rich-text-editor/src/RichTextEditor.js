import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import debounce from 'lodash/debounce';

import CKEditor from './CKEditor';
import UserMatch from './UserMatch';

const styles = {
    mentions: {
        position: 'absolute',
        boxShadow: 'rgb(136, 136, 136) 0px 0px 4px 0px',
        margin: 0,
        padding: 4,
        zIndex: 1000000,
        backgroundColor: '#FAFFFA',
        listStyleType: 'none',
        fontFamily: 'Roboto, sans-serif',
        maxHeight: '200px',
        overflowY: 'auto',
    },
};

const keycodes = { up: 38, down: 40, enter: 13, tab: 9 };

export class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        this.userMatchRefs = {};
        this.state = {
            matchingUsers: [],
            currentUserIndex: null,
            pattern: null,
            position: null,
        };
        this.showMentions = debounce(this.showMentions, 250);
    }

    componentDidMount() {
        document.addEventListener('click', this.onDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentClick = event => {
        const area = this.mentionsArea;

        if (area && !area.contains(event.target)) {
            this.clearMentions();
        }
    };

    insertUser = user => {
        this.editor.replaceCurrentWord(`@${user.userCredentials.username}`);

        if (this.props.onEditorChange) {
            this.props.onEditorChange(this.editor.getValue());
        }

        this.clearMentions();
    };

    clearMentions = () => {
        this.setState({ matchingUsers: [], currentUserIndex: null });
    };

    onEditorInitialized = editor => {
        this.editor = editor;
        editor.setCursorAtEnd();
    };

    selectUser = offset => {
        const { matchingUsers, currentUserIndex } = this.state;
        const nUsers = matchingUsers.length;
        const newIndex = (currentUserIndex + offset + nUsers) % nUsers;

        this.setState({ currentUserIndex: newIndex });

        const el = this.userMatchRefs[newIndex];
        el.scrollIntoView();
    };

    onEditorKey = ev => {
        const { matchingUsers, currentUserIndex } = this.state;
        const { keyCode } = ev.data;

        if (currentUserIndex === null) return;

        if (keyCode === keycodes.up) {
            ev.cancel();

            this.selectUser(-1);
        } else if (keyCode === keycodes.down) {
            ev.cancel();

            this.selectUser(+1);
        } else if (keyCode === keycodes.enter || keyCode === keycodes.tab) {
            ev.cancel();

            const currentUser = matchingUsers[currentUserIndex];
            this.insertUser(currentUser);
        }
    };

    onEditorChange = newValue => {
        const { onEditorChange } = this.props;

        if (onEditorChange) {
            onEditorChange(newValue);
        }

        this.showMentions();
    };

    showMentions = () => {
        const currentWord = this.editor.getCurrentWord();

        if (currentWord.startsWith('@')) {
            const pattern = currentWord.slice(1);

            this.props.d2.Api.getApi()
                .get('users.json', {
                    query: pattern,
                    fields: 'id,displayName,userCredentials[username]',
                })
                .then(response => {
                    this.setState({
                        pattern,
                        matchingUsers: response.users,
                        currentUserIndex: 0,
                        position: this.editor.getPosition({ top: 25, left: 0 }),
                    });
                });
        } else {
            this.setState({ pattern: null, matchingUsers: [], currentUserIndex: null });
        }
    };

    onMouseSelected = (user, isSelected) => {
        if (isSelected) {
            const index = this.state.matchingUsers.findIndex(u => user.id === u.id);

            if (index >= 0) this.setState({ currentUserIndex: index });
        }
    };

    render() {
        const { ckeditorProps } = this.props;
        const { pattern, matchingUsers, currentUserIndex, position } = this.state;

        return (
            <div>
                {matchingUsers.length > 0 &&
                    position && (
                        <Portal>
                            <ul
                                style={{ ...styles.mentions, ...position }}
                                ref={node => (this.mentionsArea = node)}
                            >
                                {matchingUsers.map((user, idx) => [
                                    <UserMatch
                                        ref={el => (this.userMatchRefs[idx] = el)}
                                        key={`user-${user.id}`}
                                        pattern={pattern}
                                        isSelected={idx === currentUserIndex}
                                        user={user}
                                        onClick={this.insertUser}
                                        onMouseSelected={this.onMouseSelected}
                                    />,
                                ])}
                            </ul>
                        </Portal>
                    )}

                <CKEditor
                    {...ckeditorProps}
                    onEditorChange={this.onEditorChange}
                    onEditorKey={this.onEditorKey}
                    onEditorInitialized={this.onEditorInitialized}
                />
            </div>
        );
    }
}

RichTextEditor.propTypes = {
    ...CKEditor.propTypes,
    d2: PropTypes.object,
};

RichTextEditor.defaultProps = {
    d2: null,
};

export default RichTextEditor;
