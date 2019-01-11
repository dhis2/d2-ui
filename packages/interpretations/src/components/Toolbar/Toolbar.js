import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import PersonAdd from '@material-ui/icons/PersonAdd';
import InsertLink from '@material-ui/icons/InsertLink';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import { LINK, getMarkdown } from './markdownHelper';
import styles from './styles/Toolbar.style';

const link = 'http://';
const linkPlaceholder = '<link-title>';

const mention = '@';
const bold = '*';
const boldPlaceholder = 'bold text';
const italic = '_';
const italicPlaceholder = 'italic text';
const whitespace = ' ';

const smileyFace = ':-)';
const sadFace = ':-(';
const thumbsUp = ':+1';
const thumbsDown = ':-1';

const TEXT_START_INDEX = 0;
const WHITESPACE_LENGTH = 1;
const BOLD_LENGTH = 1;
const BOLD_PLACEHOLDER_LENGTH = 9;
const ITALIC_LENGTH = 1;
const ITALIC_PLACEHOLDER_LENGTH = 11;
const EMOTICON_LENGTH = 3;
const LINK_LENGTH = 7;
const LINK_PLACEHOLDER_LENGTH = 19;



export class Toolbar extends Component {

    state = { displayEmoticons: null }

    onInsertLink = () => {
       let formatted;
        const currentInput = this.props.text;
        const highlightedText = window.getSelection().toString();
        const cursorStart = this.props.element.selectionStart;
        const cursorEnd = this.props.element.selectionEnd;

        formatted = getMarkdown(LINK, currentInput, highlightedText, cursorStart, cursorEnd);
        console.log(formatted);

        this.props.onClick(formatted.text, formatted.cursorStart, formatted.cursorEnd);


      /*  let formatted;
        const highlightedText = window.getSelection().toString();
        const currentInput = this.props.text;
        let highlightStart;
        let highlightEnd;

        const cursorStart = document.getElementById(this.props.id).selectionStart
        const cursorEnd = document.getElementById(this.props.id).selectionEnd

        const previousChar = currentInput.substring(cursorStart - 1, cursorStart);
        const nextChar = currentInput.substring(cursorEnd, cursorEnd + 1);


        if (currentInput.length) {
            if(highlightedText.length) {
                if (cursorStart !== TEXT_START_INDEX && previousChar !== whitespace) {
                    formatted = currentInput
                        .slice(TEXT_START_INDEX, cursorStart)
                        .concat(whitespace + link.concat(highlightedText));

                        highlightStart = cursorStart + WHITESPACE_LENGTH + LINK_LENGTH;
                        highlightEnd = cursorEnd + WHITESPACE_LENGTH + LINK_LENGTH;


                } else {
                    formatted = currentInput
                        .slice(TEXT_START_INDEX, cursorStart)
                        .concat(link.concat(highlightedText));

                        highlightStart = cursorStart + LINK_LENGTH;
                        highlightEnd = cursorEnd + LINK_LENGTH;


                }
                if(cursorEnd !== currentInput.length && nextChar !== whitespace) {
                    formatted += whitespace + currentInput.substring(cursorEnd, currentInput.length);
                    
                } else {
                    formatted += currentInput.substring(cursorEnd, currentInput.length);
                }
   
            } else {
                if (previousChar !== whitespace) {
                    formatted = currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + link.concat(linkPlaceholder));
                    highlightStart = cursorStart + WHITESPACE_LENGTH + LINK_LENGTH;
                    highlightEnd = cursorStart + WHITESPACE_LENGTH + LINK_PLACEHOLDER_LENGTH;

                } else {
                    formatted = currentInput.substring(TEXT_START_INDEX, cursorStart).concat(link.concat(linkPlaceholder));
                    highlightStart = cursorStart + LINK_LENGTH;
                    highlightEnd = cursorStart + LINK_PLACEHOLDER_LENGTH;
                }

                if (cursorStart !== currentInput.length && nextChar !== whitespace) {
                    formatted += whitespace + currentInput.substring(cursorEnd, currentInput.length)
                } else {
                    formatted += currentInput.substring(cursorEnd, currentInput.length);
                }
            }
        } else {
            formatted = link.concat(linkPlaceholder);
            highlightStart = cursorStart + LINK_LENGTH;
            highlightEnd = formatted.length
        }


        this.props.onClick(formatted, highlightStart, highlightEnd);*/
    };

    onMentionClick = () => {
        let formatted;
        const highlightedText = window.getSelection().toString();
        
        highlightedText.length 
            ? formatted = mention + highlightedText
            : formatted = this.props.text + mention;

        this.props.onClick(formatted);
    }

    onBoldClick = () => {
        let formatted;
        const highlightedText = window.getSelection().toString();
        const currentInput = this.props.text;
        let highlightStart;
        let highlightEnd;

        const cursorStart = document.getElementById(this.props.id).selectionStart
        const cursorEnd = document.getElementById(this.props.id).selectionEnd

        const previousChar = this.props.text.substring(cursorStart - 1, cursorStart);
        const nextChar = this.props.text.substring(cursorEnd, cursorEnd + 1);

        if (currentInput.length) {
            if(highlightedText.length) {
                if (cursorStart !== TEXT_START_INDEX && previousChar !== whitespace) {
                    formatted = currentInput
                        .slice(TEXT_START_INDEX, cursorStart)
                        .concat(whitespace + bold + highlightedText + bold);

                        highlightStart = cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH;
                        highlightEnd = cursorEnd + WHITESPACE_LENGTH + BOLD_LENGTH;
                } else {
                    formatted = currentInput
                        .slice(TEXT_START_INDEX, cursorStart)
                        .concat(bold + highlightedText + bold);

                        highlightStart = cursorStart + BOLD_LENGTH;
                        highlightEnd = cursorEnd + BOLD_LENGTH;

                }
                if(cursorEnd !== currentInput.length && nextChar !== whitespace) {
                    formatted += whitespace + currentInput.substring(cursorEnd, currentInput.length);
                    
                    
                } else {
                    formatted += currentInput.substring(cursorEnd, currentInput.length);   
                }

   
            } else {
                if (previousChar !== whitespace) {
                    formatted = currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + bold + boldPlaceholder + bold);
                    highlightStart = cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH;
                    highlightEnd = cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH + BOLD_PLACEHOLDER_LENGTH;

                } else {
                    formatted = currentInput.substring(TEXT_START_INDEX, cursorStart).concat(bold + boldPlaceholder + bold);
                    highlightStart = cursorStart + BOLD_LENGTH;
                    highlightEnd = cursorStart + BOLD_LENGTH + BOLD_PLACEHOLDER_LENGTH;
                }

                if (nextChar !== whitespace) {
                    formatted += whitespace + currentInput.substring(cursorEnd, currentInput.length)
                } else {
                    formatted += currentInput.substring(cursorEnd, currentInput.length);
                }
            }
        } else {
            formatted = currentInput.concat(bold + boldPlaceholder + bold);
            highlightStart = cursorStart + BOLD_LENGTH;
            highlightEnd = cursorStart + BOLD_LENGTH + BOLD_PLACEHOLDER_LENGTH;
        }


        this.props.onClick(formatted, highlightStart, highlightEnd);
    };

    onItalicClick = () => {
        let formatted;
        const highlightedText = window.getSelection().toString();
        const currentInput = this.props.text;
        
        const cursorStart = document.getElementById(this.props.id).selectionStart
        const cursorEnd = document.getElementById(this.props.id).selectionEnd
        


        let highlightStart;
        let highlightEnd;
        const previousChar = this.props.text.substring(cursorStart - 1, cursorStart);
        const nextChar = this.props.text.substring(cursorEnd, cursorEnd + 1);

        if (currentInput.length) {
            if(highlightedText.length) {
                if (cursorStart !== TEXT_START_INDEX && previousChar !== whitespace) {
                    formatted = currentInput
                        .slice(TEXT_START_INDEX, cursorStart)
                        .concat(whitespace + italic + highlightedText + italic);

                        highlightStart = cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH;
                        highlightEnd = cursorEnd + WHITESPACE_LENGTH + ITALIC_LENGTH;
                    
                } else {
                    formatted = currentInput
                        .slice(TEXT_START_INDEX, cursorStart)
                        .concat(italic + highlightedText + italic);

                        highlightStart = cursorStart + ITALIC_LENGTH;
                        highlightEnd = cursorEnd + ITALIC_LENGTH;
                
                }
                if(cursorEnd !== currentInput.length && nextChar !== whitespace) {
                    formatted += whitespace + currentInput.substring(cursorEnd, currentInput.length);
                    
                } else {
                    formatted += currentInput.substring(cursorEnd, currentInput.length);
                    
                }
   
            } else {
                if (previousChar !== whitespace) {
                    formatted = currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + italic + italicPlaceholder + italic);
                    highlightStart = cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH;
                    highlightEnd = cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH + ITALIC_PLACEHOLDER_LENGTH;

                } else {
                    formatted = currentInput.substring(TEXT_START_INDEX, cursorStart).concat(italic + italicPlaceholder + italic);
                    highlightStart = cursorStart + ITALIC_LENGTH;
                    highlightEnd = cursorStart + ITALIC_LENGTH + ITALIC_PLACEHOLDER_LENGTH;
                }

                if (nextChar !== whitespace) {
                    formatted += whitespace + currentInput.substring(cursorEnd, currentInput.length)
                } else {
                    formatted += currentInput.substring(cursorEnd, currentInput.length);
                }
            }
        } else {
            formatted = currentInput.concat(italic + italicPlaceholder + italic);
            highlightStart = cursorStart + ITALIC_LENGTH;
            highlightEnd = cursorStart + ITALIC_LENGTH + ITALIC_PLACEHOLDER_LENGTH;
        }

        this.props.onClick(formatted, highlightStart, highlightEnd);
    };

    onEmoticonClick = emoticon => {
        const cursorStart = document.getElementById(this.props.id).selectionStart
        const currentInput = this.props.text;
        let highlightStart = cursorStart + EMOTICON_LENGTH;
        let highlightEnd = cursorStart + EMOTICON_LENGTH;
        let formatted;


        const previousChar = currentInput.substring(cursorStart - 1, cursorStart);
        const nextChar = currentInput.substring(cursorStart, cursorStart + 1);


        if (currentInput.length) {
            if(cursorStart !== TEXT_START_INDEX && previousChar !== whitespace) {
                formatted = currentInput.substring(TEXT_START_INDEX, cursorStart) + whitespace + emoticon;
                highlightStart++;
                highlightEnd++;
            } else {
                formatted = currentInput.substring(TEXT_START_INDEX, cursorStart) + emoticon;
            }

         if(nextChar !== whitespace) {
            formatted += whitespace + currentInput.substring(cursorStart, currentInput.length);
            highlightStart++;
            highlightEnd++;
            } else {
                formatted += currentInput.substring(cursorStart, currentInput.length);
            }
        
        } else {
            formatted = emoticon + whitespace;
        }

        this.props.onClick(formatted, highlightStart, highlightEnd);
        this.onCloseEmoticons();
    };

    onDisplayEmoticons = event => 
        this.setState({ displayEmoticons: event.currentTarget });


    onCloseEmoticons = () =>
        this.setState({ displayEmoticons: null });

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
                <IconButton onClick={this.onMentionClick}>
                    <PersonAdd />
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