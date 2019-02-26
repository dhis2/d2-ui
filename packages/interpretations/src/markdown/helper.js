import { markdownHandler , insertMarkdown } from './markdownHandler';
import {
    insertLinkWithSpace, 
    insertLinkWithoutSpace, 
    insertBoldWithSpace, 
    insertBoldWithoutSpace, 
    insertItalicWithSpace, 
    insertItalicWithoutSpace, 
    concatLinkWithSpace, 
    concatLinkWithoutSpace, 
    concatBoldWithSpace, 
    concatBoldWithoutSpace, 
    concatItalicWithSpace, 
    concatItalicWithoutSpace, 
    insertEmoticonWithSpace,
    insertEmoticonWithoutSpace,
} from './formats';

export const LINK = 'LINK';
export const BOLD = 'BOLD';
export const ITALIC = 'ITALIC';
export const EMOTICON = 'EMOTICON';

export const WITH_SPACE = true;
export const WITHOUT_SPACE = false;

export const getMarkdown = (TYPE, currentInput, highlightedText, cursorStart, cursorEnd) =>
    currentInput.length
        ? markdownHandler(TYPE, currentInput, highlightedText, cursorStart, cursorEnd)
        : insertHelper(TYPE, WITHOUT_SPACE, currentInput, cursorStart);

export const getEmoticon = (emoticon, currentInput, cursorStart) =>
    currentInput.length 
        ? insertMarkdown(EMOTICON, currentInput, cursorStart, emoticon)
        : insertHelper(EMOTICON, WITHOUT_SPACE, currentInput, cursorStart, emoticon);


export const insertHelper = (TYPE, WITH_SPACE, currentInput, cursorStart, emoticon = null) => {
    switch (TYPE) {
        case LINK:
            return WITH_SPACE 
                ? insertLinkWithSpace(currentInput, cursorStart) 
                : insertLinkWithoutSpace(currentInput, cursorStart);
        case BOLD:
            return WITH_SPACE 
                ? insertBoldWithSpace(currentInput, cursorStart) 
                : insertBoldWithoutSpace(currentInput, cursorStart)
        case ITALIC:
            return WITH_SPACE 
                ? insertItalicWithSpace(currentInput, cursorStart) 
                : insertItalicWithoutSpace(currentInput, cursorStart)
        case EMOTICON:
            return WITH_SPACE
                ? insertEmoticonWithSpace(currentInput, cursorStart, emoticon)
                : insertEmoticonWithoutSpace(currentInput, cursorStart, emoticon);
        default:
            return {};
    };
};

export const concatHelper = (TYPE, WITH_SPACE, currentInput, highlightedText, cursorStart, cursorEnd) => {
    switch (TYPE) {
        case LINK:
            return WITH_SPACE 
                ? concatLinkWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) 
                : concatLinkWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd);
        case BOLD:
            return WITH_SPACE 
                ? concatBoldWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) 
                : concatBoldWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd)
        case ITALIC:
            return WITH_SPACE 
                ? concatItalicWithSpace(currentInput, highlightedText, cursorStart, cursorEnd) 
                : concatItalicWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd)
        default:
            return {};
    };
};
