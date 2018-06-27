import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { Portal } from 'react-portal';
import { findIndex } from 'lodash/fp';
import i18n from '@dhis2/d2-i18n'
import CKEditor from './CKEditor';

const styles = {
    mentions: {
        position: "absolute",
        boxShadow: "rgb(136, 136, 136) 0px 0px 4px 0px",
        margin: 0,
        padding: 4,
        zIndex: 1000000,
        backgroundColor: "#FAFFFA",
        listStyleType: "none",
        fontFamily: "Roboto, sans-serif",
        maxHeight: "200px",
        overflowY: "auto"
    },
    mentionTitle: {
        padding: "5px 15px",
        borderBottom: "1px solid rgb(224, 224, 224)",
        fontSize: "0.75rem",
        fontWeight: 500
    },
    userMention: {
        cursor: "pointer",
        padding: "5px 15px",
        borderBottom: "1px solid rgb(224, 224, 224)",
        fontSize: "0.75rem"
    },
    userMentionSelected: {
        backgroundColor: "#ACD",
    },
};

class UserMatch extends Component {
    constructor(props, context) {
        super(props, context);
        this.onUserClick = this.onUserClick.bind(this);
        this.onMouseEnter = this.onChangeSelected.bind(this, true);
        this.onMouseLeave = this.onChangeSelected.bind(this, false);
    }

    onUserClick() {
        this.props.onClick(this.props.user);
    }

    onChangeSelected(isSelected) {
        this.props.onMouseSelected(this.props.user, isSelected);
    }

    render() {
        const { user, isSelected, pattern } = this.props;
        const style = { ...styles.userMention, ...(isSelected ? styles.userMentionSelected : {}) };
        const text = `${user.displayName} (${user.username})`;
        let formatted;
        if (pattern) {
            formatted = text
                .split(new RegExp(`(${pattern})`, 'gi'))
                .map((part, idx) => part.toLowerCase() === pattern.toLowerCase() ? <b key={idx}>{part}</b> : part);
        }
        else {
            formatted = text;
        }

        return (
            <li
                style={style}
                onClick={this.onUserClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <span>{formatted}</span>
            </li>
        );
    };
}

const keycodes = {up: 38, down: 40, enter: 13, tab: 9};

const userType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
});

export default class RichEditor extends Component {
    static propTypes = {
        ...CKEditor.propTypes,
        mentions: PropTypes.shape({
            allUsers: PropTypes.arrayOf(userType).isRequired,
            mostMentionedUsers: PropTypes.arrayOf(userType).isRequired,
        }),
    };

    constructor(props, context) {
        super(props, context);
        this.onEditorInitialized = this.onEditorInitialized.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.insertUser = this.insertUser.bind(this);
        this.onEditorKey = this.onEditorKey.bind(this);
        this.onMouseSelected = this.onMouseSelected.bind(this);
        this.setMentionsRef = this.setMentionsRef.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.userMatchRefs = {};
        this.state = {matchingUsers: [], currentUserIndex: null, splitListIndex: null, pattern: null, position: null};
    }

    componentDidMount () {
      document.addEventListener('click', this.onDocumentClick);
    }

    componentWillUnmount () {
      document.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentClick(ev) {
      const area = ReactDOM.findDOMNode(this.mentionsArea);

      if (area && !area.contains(ev.target)) {
        this.clearMentions();
      }
    }

    insertUser(user) {
        if (user) {
            this.editor.replaceCurrentWord(`@${user.username}`);
            this.props.onEditorChange(this.editor.getValue());
            this.clearMentions();
        }
    }

    clearMentions() {
        this.setState({matchingUsers: [], currentUserIndex: null});
    }

    onEditorInitialized(editor) {
        this.editor = editor;
        editor.setCursorAtEnd();
    }

    selectUser(offset) {
        const { matchingUsers, currentUserIndex } = this.state;
        const nUsers = matchingUsers.length;
        const newIndex = (currentUserIndex + offset + nUsers) % nUsers;
        this.setState({currentUserIndex: newIndex});
        const el = this.userMatchRefs[newIndex];
        if (el) {
            ReactDOM.findDOMNode(el).scrollIntoView();
        }
    }

    onEditorKey(ev) {
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
    }

    onEditorChange(newValue) {
        const { mentions, onEditorChange } = this.props;
        onEditorChange(newValue);
        if (mentions)
            this.showMentions(mentions);
    }

    showMentions(mentions) {
        const currentWord = this.editor.getCurrentWord();
        let matchingUsers;

        if (currentWord.startsWith("@")) {
            const pattern = currentWord.slice(1);
            const filter = users => users
                .filter(user => user.displayName.includes(pattern) || user.username.includes(pattern));
            const mostMentionedUsersFiltered = filter(mentions.mostMentionedUsers);
            const allUsersFiltered = filter(mentions.allUsers);
            const matchingUsers = mostMentionedUsersFiltered.concat(allUsersFiltered);
            const splitListIndex = mostMentionedUsersFiltered.length;
            const position = this.editor.getPosition({top: 25, left: 0});
            this.setState({ pattern, matchingUsers, currentUserIndex: 0, splitListIndex, position });
        } else {
            this.setState({ pattern: null, matchingUsers: [], currentUserIndex: null });
        }
    }

    onMouseSelected(user, isSelected) {
        if (isSelected) {
            const index = findIndex(u => user.id === u.id, this.state.matchingUsers);
            if (index >= 0)
                this.setState({ currentUserIndex: index });
        }
    }

    setMentionsRef(mentionsArea) {
        this.mentionsArea = mentionsArea;
    }

    setUserMatchRef(userMatchEl, idx) {
        this.userMatchRefs[idx] = userMatchEl;
    }

    render() {
        const { pattern, matchingUsers, currentUserIndex, splitListIndex, position } = this.state;
        const { mentions, ...ckeditorProps } = this.props;
        const getTitleItem = title => (
            <li key="most-mentioned" style={styles.mentionTitle}>
                {title} @{pattern}
            </li>
        );

        return (
            <div>
                {matchingUsers.length > 0 && position &&
                    <Portal>
                        <ul style={{...styles.mentions, ...position}} ref={this.setMentionsRef}>
                            {matchingUsers.map((user, idx) => [
                                idx === 0 && idx !== splitListIndex && getTitleItem(i18n.t("Most common users matching")),
                                idx === splitListIndex && getTitleItem(i18n.t("Other users matching")),
                                <UserMatch
                                    ref={el => this.setUserMatchRef(el, idx)}
                                    key={"user-" + user.id}
                                    pattern={pattern}
                                    isSelected={idx === currentUserIndex}
                                    user={user}
                                    onClick={this.insertUser}
                                    onMouseSelected={this.onMouseSelected}
                                />,
                            ])}
                        </ul>
                    </Portal>
                }

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