import { 
    link, 
    linkPlaceholder, 
    whitespace, 
    TEXT_START_INDEX, 
    WHITESPACE_LENGTH, 
    LINK_LENGTH, 
    LINK_PLACEHOLDER_LENGTH 
} from './markdownHelper'

export const linkMarkdown = (currentInput, highlightedText, cursorStart, cursorEnd) => {
    let formatted;
    console.log(currentInput, highlightedText, cursorStart, cursorEnd);
    
    if (currentInput.length) {
        formatted = getHighlightedLink(currentInput, highlightedText, cursorStart, cursorEnd);    
    } else {
        formatted = {
            text: link.concat(linkPlaceholder),
            cursorStart: cursorStart + LINK_LENGTH,
            cursorEnd: LINK_LENGTH + LINK_PLACEHOLDER_LENGTH,
        }
    }

    return formatted;
};

const getHighlightedLink = (currentInput, highlightedText, cursorStart, cursorEnd) =>
    highlightedText.length
        ? highlightInput(currentInput, highlightedText, cursorStart, cursorEnd)
        : insertLink(currentInput, cursorStart)

const highlightInput = (currentInput, highlightedText, cursorStart, cursorEnd) => {
    let formatted = {
        text: '',
        cursorStart: 0,
        cursorEnd: 0,
    };

    formatted = formatFirstHalf(currentInput, highlightedText, cursorStart, cursorEnd);
    console.log(formatted);
    console.log(formatSecondHalf(currentInput, cursorEnd));
    formatted.text += formatSecondHalf(currentInput, cursorEnd);
    //Object.assign({}, formatted, formatSecondHalf(currentInput, cursorEnd));

    return formatted;
};

const formatFirstHalf = (currentInput, highlightedText, cursorStart, cursorEnd) => {
    let formatted;
    const previousChar = currentInput.substring(cursorStart - 1, cursorStart);
    const needWhiteSpace = cursorStart !== TEXT_START_INDEX && previousChar !== whitespace

    if (needWhiteSpace) {
        formatted = firstHalfWithSpace(currentInput, highlightedText, cursorStart, cursorEnd)
    } else {
        formatted = firstHalfWithoutSpace(currentInput, highlightedText, cursorStart, cursorEnd)
    }

    return formatted;
};

const firstHalfWithSpace = (currentInput, highlightedText, cursorStart, cursorEnd) => {
    const formatted = currentInput
        .slice(TEXT_START_INDEX, cursorStart)
        .concat(whitespace + link.concat(highlightedText));

    return {
        text: formatted,
        cursorStart: cursorStart + WHITESPACE_LENGTH + LINK_LENGTH,
        cursorEnd: cursorEnd + WHITESPACE_LENGTH + LINK_LENGTH,
    };
};

const firstHalfWithoutSpace = (currentInput, highlightedText, cursorStart, cursorEnd) => {
    const formatted = currentInput
        .slice(TEXT_START_INDEX, cursorStart)
        .concat(link.concat(highlightedText));

    return {
        text: formatted,
        cursorStart: cursorStart + LINK_LENGTH,
        cursorEnd: cursorEnd + LINK_LENGTH,
    };

};

const formatSecondHalf = (currentInput, cursorEnd) => {
    let formatted; 
    const nextChar = currentInput.substring(cursorEnd, cursorEnd + 1);
    const needWhiteSpace = cursorEnd !== currentInput.length && nextChar !== whitespace;

    if(needWhiteSpace) {
        formatted += whitespace + currentInput.substring(cursorEnd, currentInput.length);    
    } else {
        formatted += currentInput.substring(cursorEnd, currentInput.length);
    }

    console.log(formatted);
    return formatted;
};

const insertLink = (currentInput, cursorStart, cursorEnd) => {
    let formatted = concatFirstHalf(currentInput, cursorStart);
    formatted.text += concatSecondHalf(currentInput, cursorStart, cursorEnd);

    return formatted;
};

const concatFirstHalf = (currentInput, cursorStart) => {
    let formatted;
    const previousChar = currentInput.substring(cursorStart - 1, cursorStart);

    if (previousChar !== whitespace) {
        formatted.text = currentInput.substring(TEXT_START_INDEX, cursorStart).concat(whitespace + link.concat(linkPlaceholder));
        formatted.cursorStart = cursorStart + WHITESPACE_LENGTH + LINK_LENGTH;
        formatted.cursorEnd = cursorStart + WHITESPACE_LENGTH + LINK_PLACEHOLDER_LENGTH;

    } else {
        formatted = currentInput.substring(TEXT_START_INDEX, cursorStart).concat(link.concat(linkPlaceholder));
        formatted.cursorStart = cursorStart + LINK_LENGTH;
        formatted.cursorEnd = cursorStart + LINK_PLACEHOLDER_LENGTH;
    }

    return formatted;
}

const concatSecondHalf = (currentInput, cursorStart, cursorEnd) => {
    const nextChar = currentInput.substring(cursorStart + 1, cursorStart);
    const needWhiteSpace = cursorStart !== currentInput.length && nextChar !== whitespace;
    let formatted;

    if(needWhiteSpace) {
        formatted += whitespace + currentInput.substring(cursorEnd, currentInput.length)
    } else {
        formatted += currentInput.substring(cursorEnd, currentInput.length);   
    }
    
    return formatted;
};