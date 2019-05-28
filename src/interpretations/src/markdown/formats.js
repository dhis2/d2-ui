export const whitespace = ' ';
const link = 'http://';
const linkPlaceholder = '<link-url>';
const bold = '*';
const boldPlaceholder = 'bold text';
const italic = '_';
const italicPlaceholder = 'italic text';

export const TEXT_START_INDEX = 0;
const WHITESPACE_LENGTH = 1;
const BOLD_LENGTH = 1;
const BOLD_PLACEHOLDER_LENGTH = 9;
const ITALIC_LENGTH = 1;
const ITALIC_PLACEHOLDER_LENGTH = 11;
const EMOTICON_LENGTH = 3;
const LINK_LENGTH = 7;
const LINK_PLACEHOLDER_LENGTH = 17;

export const insertLinkWithSpace = (currentInput, cursorStart) => ({
    text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + link.concat(linkPlaceholder)),
    highlightStart: cursorStart + WHITESPACE_LENGTH + LINK_LENGTH,
    highlightEnd: cursorStart + WHITESPACE_LENGTH + LINK_PLACEHOLDER_LENGTH,
});

export const insertLinkWithoutSpace = (currentInput, cursorStart) => ({
    text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(link.concat(linkPlaceholder)),
    highlightStart: cursorStart + LINK_LENGTH,
    highlightEnd: cursorStart + LINK_PLACEHOLDER_LENGTH,
});

export const concatLinkWithSpace = (currentInput, highlightedText, cursorStart, cursorEnd) => ({
    text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(whitespace + link.concat(highlightedText)),
    highlightStart: cursorStart + WHITESPACE_LENGTH + LINK_LENGTH,
    highlightEnd: cursorEnd + WHITESPACE_LENGTH + LINK_LENGTH,
});

export const concatLinkWithoutSpace = (currentInput, highlightedText, cursorStart, cursorEnd) => ({
    text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(link.concat(highlightedText)),
    highlightStart: cursorStart + LINK_LENGTH,
    highlightEnd: cursorEnd + LINK_LENGTH,
});

export const insertBoldWithSpace = (currentInput, cursorStart) => ({
    text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + bold + boldPlaceholder + bold),
    highlightStart: cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH,
    highlightEnd: cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH + BOLD_PLACEHOLDER_LENGTH,
});

export const insertBoldWithoutSpace = (currentInput, cursorStart) => ({
    text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(bold + boldPlaceholder + bold),
    highlightStart: cursorStart + BOLD_LENGTH,
    highlightEnd: cursorStart + BOLD_LENGTH + BOLD_PLACEHOLDER_LENGTH,
});

export const concatBoldWithSpace = (currentInput, highlightedText, cursorStart, cursorEnd) => ({
    text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(whitespace + bold + highlightedText + bold),
    highlightStart: cursorStart + WHITESPACE_LENGTH + BOLD_LENGTH,
    highlightEnd: cursorEnd + WHITESPACE_LENGTH + BOLD_LENGTH,
});

export const concatBoldWithoutSpace = (currentInput, highlightedText, cursorStart, cursorEnd) => ({
    text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(bold + highlightedText + bold),
    highlightStart: cursorStart + BOLD_LENGTH,
    highlightEnd: cursorEnd + BOLD_LENGTH,
});

export const insertItalicWithSpace = (currentInput, cursorStart) => ({
    text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + italic + italicPlaceholder + italic),
    highlightStart: cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH,
    highlightEnd: cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH + ITALIC_PLACEHOLDER_LENGTH,
});

export const insertItalicWithoutSpace = (currentInput, cursorStart) => ({
    text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(italic + italicPlaceholder + italic),
    highlightStart: cursorStart + ITALIC_LENGTH,
    highlightEnd: cursorStart + ITALIC_LENGTH + ITALIC_PLACEHOLDER_LENGTH,
});

export const concatItalicWithSpace = (currentInput, highlightedText, cursorStart, cursorEnd) => ({
    text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(whitespace + italic + highlightedText + italic),
    highlightStart: cursorStart + WHITESPACE_LENGTH + ITALIC_LENGTH,
    highlightEnd: cursorEnd + WHITESPACE_LENGTH + ITALIC_LENGTH,
});

export const concatItalicWithoutSpace = (currentInput, highlightedText, cursorStart, cursorEnd) => ({
    text: currentInput.slice(TEXT_START_INDEX, cursorStart).concat(italic + highlightedText + italic),
    highlightStart: cursorStart + ITALIC_LENGTH,
    highlightEnd: cursorEnd + ITALIC_LENGTH,
});

export const insertEmoticonWithSpace = (currentInput, cursorStart, emoticon) => ({
    text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + emoticon),
    highlightStart: cursorStart + WHITESPACE_LENGTH + EMOTICON_LENGTH,
    highlightEnd: cursorStart + WHITESPACE_LENGTH + EMOTICON_LENGTH,
});

export const insertEmoticonWithoutSpace = (currentInput, cursorStart, emoticon) => ({
    text: currentInput.substring(TEXT_START_INDEX, cursorStart).concat(emoticon),
    highlightStart: cursorStart + EMOTICON_LENGTH,
    highlightEnd: cursorStart + EMOTICON_LENGTH,
});
