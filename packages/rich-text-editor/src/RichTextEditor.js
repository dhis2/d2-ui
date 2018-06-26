import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { Portal } from 'react-portal';
import { findIndex } from 'lodash/fp';
import debounce from 'lodash/debounce';

import i18n from '@dhis2/d2-i18n';

import CKEditor from './CKEditor';

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
    userMention: {
        cursor: 'pointer',
        padding: '5px 15px',
        borderBottom: '1px solid rgb(224, 224, 224)',
        fontSize: '0.75rem',
    },
    userMentionSelected: {
        backgroundColor: '#ACD',
    },
};

class UserMatch extends Component {
    onUserClick = () => {
        this.props.onClick(this.props.user);
    };

    onChangeSelected = isSelected => () => {
        this.props.onMouseSelected(this.props.user, isSelected);
    };

    render() {
        const { user, isSelected, pattern } = this.props;
        const style = { ...styles.userMention, ...(isSelected ? styles.userMentionSelected : {}) };
        const text = `${user.displayName} (${user.userCredentials.username})`;

        let formatted = text;

        if (pattern) {
            formatted = text
                .split(new RegExp(`(${pattern})`, 'gi'))
                .map(
                    (part, idx) =>
                        part.toLowerCase() === pattern.toLowerCase() ? (
                            <b key={idx}>{part}</b>
                        ) : (
                            part
                        )
                );
        }

        return (
            <li
                style={style}
                onClick={this.onUserClick}
                onMouseEnter={this.onChangeSelected(true)}
                onMouseLeave={this.onChangeSelected(false)}
            >
                <span>{formatted}</span>
            </li>
        );
    }
}

const keycodes = { up: 38, down: 40, enter: 13, tab: 9 };

export default class RichTextEditor extends Component {
    static propTypes = {
        ...CKEditor.propTypes,
        d2: PropTypes.object,
    };

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
        const area = ReactDOM.findDOMNode(this.mentionsArea);

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
        if (el) {
            ReactDOM.findDOMNode(el).scrollIntoView();
        }
    };

    onEditorKey = ev => {
        const { matchingUsers, currentUserIndex } = this.state;
        const { keyCode } = ev.data;

        if (currentUserIndex === null) {
            return;
        } else if (keyCode == keycodes.up) {
            ev.cancel();
            this.selectUser(-1);
        } else if (keyCode == keycodes.down) {
            ev.cancel();
            this.selectUser(+1);
        } else if (keyCode == keycodes.enter || keyCode == keycodes.tab) {
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
            const index = findIndex(u => user.id === u.id, this.state.matchingUsers);
            if (index >= 0) this.setState({ currentUserIndex: index });
        }
    };

    setMentionsRef = mentionsArea => {
        this.mentionsArea = mentionsArea;
    };

    setUserMatchRef = (userMatchEl, idx) => {
        this.userMatchRefs[idx] = userMatchEl;
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
                                ref={this.setMentionsRef}
                            >
                                {matchingUsers.map((user, idx) => [
                                    <UserMatch
                                        ref={el => this.setUserMatchRef(el, idx)}
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
