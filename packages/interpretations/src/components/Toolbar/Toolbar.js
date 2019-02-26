import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import InsertLink from '@material-ui/icons/InsertLink';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import { LINK, BOLD, ITALIC, getMarkdown, getEmoticon } from '../../markdown/helper';
import styles from './styles/Toolbar.style';

const smileyFace = ':-)';
const sadFace = ':-(';
const thumbsUp = ':+1';
const thumbsDown = ':-1';

export class Toolbar extends Component {

    state = { displayEmoticons: null }

    onDisplayEmoticons = event => 
        this.setState({ displayEmoticons: event.currentTarget });

    onCloseEmoticons = () =>
        this.setState({ displayEmoticons: null }); 

    onInsertLink = () =>
        this.getMarkdown(LINK);

    onBoldClick = () => 
        this.getMarkdown(BOLD);

    onItalicClick = () =>
        this.getMarkdown(ITALIC);
    
    onEmoticonClick = type => {
        const currentInput = this.props.text;
        const cursorStart = this.props.element.selectionStart;
        const newText = getEmoticon(type, currentInput, cursorStart);

        this.props.onClick(newText.text, newText.highlightStart, newText.highlightEnd);
        this.onCloseEmoticons();
    };

    getMarkdown = type => {
        const currentInput = this.props.text;
        const highlightedText = window.getSelection().toString();
        const cursorStart = this.props.element.selectionStart;
        const cursorEnd = this.props.element.selectionEnd;
        const markdown = getMarkdown(type, currentInput, highlightedText, cursorStart, cursorEnd);

        this.props.onClick(markdown.text, markdown.highlightStart, markdown.highlightEnd);
    };

    renderEmoticons = () => 
        this.state.displayEmoticons && (
                <Menu
                    anchorEl={this.state.displayEmoticons}
                    open={Boolean(this.state.displayEmoticons)}
                    onClose={this.onCloseEmoticons}
                    placement="top"
                    disableAutoFocusItem
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    MenuListProps={{ style: styles.menu }}
                >
                    <MenuItem onClick={() => this.onEmoticonClick(smileyFace)}>                    
                        <RichTextParser style={styles.emoticon}>
                            {smileyFace}
                        </RichTextParser>
                    </MenuItem>
                    <MenuItem onClick={() => this.onEmoticonClick(sadFace)}>
                        <RichTextParser style={styles.emoticon}>
                            {sadFace}
                        </RichTextParser>
                    </MenuItem>
                    <MenuItem onClick={() => this.onEmoticonClick(thumbsUp)}>
                        <RichTextParser style={styles.emoticon}>
                            {thumbsUp}
                        </RichTextParser>
                    </MenuItem>
                    <MenuItem onClick={() => this.onEmoticonClick(thumbsDown)}>
                        <RichTextParser style={styles.emoticon}>
                            {thumbsDown}
                        </RichTextParser>
                    </MenuItem>
                </Menu>
        );

    render() {
        const Emoticons = this.renderEmoticons();

        return (
            <div className={this.props.classes.toolbarContainer}>
                <IconButton onClick={this.onInsertLink}>
                    <InsertLink />
                </IconButton>
                <IconButton onClick={this.onBoldClick}>
                    <FormatBold />
                </IconButton>
                <IconButton onClick={this.onItalicClick}>
                    <FormatItalic />
                </IconButton>
                <IconButton onClick={this.onDisplayEmoticons}>
                    <InsertEmoticon />
                </IconButton>
                {Emoticons}
            </div>
        );
    }
};

export default withStyles(styles)(Toolbar);

Toolbar.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
