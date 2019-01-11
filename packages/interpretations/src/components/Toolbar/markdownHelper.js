import { linkMarkdown } from './link';

export const LINK = 'LINK';
const MENTION = 'MENTION';
const BOLD = 'BOLd';
const ITALIC = 'ITALIC';
const EMOTICON = 'EMOTICON';

export const link = 'http://';
export const linkPlaceholder = '<link-title>';

const mention = '@';
const bold = '*';
const boldPlaceholder = 'bold text';
const italic = '_';
const italicPlaceholder = 'italic text';
export const whitespace = ' ';

const smileyFace = ':-)';
const sadFace = ':-(';
const thumbsUp = ':+1';
const thumbsDown = ':-1';

export const TEXT_START_INDEX = 0;
export const WHITESPACE_LENGTH = 1;
const BOLD_LENGTH = 1;
const BOLD_PLACEHOLDER_LENGTH = 9;
const ITALIC_LENGTH = 1;
const ITALIC_PLACEHOLDER_LENGTH = 11;
const EMOTICON_LENGTH = 3;
export const LINK_LENGTH = 7;
export const LINK_PLACEHOLDER_LENGTH = 19;


export const getMarkdown = (TYPE, currentInput, highlightedText, cursorStart, cursorEnd) => {
    switch (TYPE) {
        case LINK:
            return linkMarkdown(currentInput, highlightedText, cursorStart, cursorEnd);
        case MENTION:

        case BOLD:

        case ITALIC:

        default:
            return {};
    };
};
