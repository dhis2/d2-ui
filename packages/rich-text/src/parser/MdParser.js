import MarkdownIt from 'markdown-it';

const emojiDb = {
    ':-)': '\u{1F642}',
    ':)': '\u{1F642}',
    ':-(': '\u{1F641}',
    ':(': '\u{1F641}',
    ':+1': '\u{1F44D}',
    ':-1': '\u{1F44E}',
};

const codes = {
    bold: {
        name: 'bold',
        char: '*',
        domEl: 'strong',
        encodedChar: 0x2a,
        // see https://regex101.com/r/evswdV/8 for explanation of regexp
        regexString: '\\B\\*((?!\\s)[^*]+(?:\\b|[^*\\s]))\\*\\B',
        contentFn: (val) => val,
    },
    italic: {
        name: 'italic',
        char: '_',
        domEl: 'em',
        encodedChar: 0x5f,
        // see https://regex101.com/r/p6LpjK/6 for explanation of regexp
        regexString: '\\b_((?!\\s)[^_]+(?:\\B|[^_\\s]))_\\b',
        contentFn: (val) => val,
    },
    emoji: {
        name: 'emoji',
        char: ':',
        domEl: 'span',
        encodedChar: 0x3a,
        regexString: '^(:-\\)|:\\)|:\\(|:-\\(|:\\+1|:-1)',
        contentFn: (val) => emojiDb[val],
    },
};

let md;
let linksInText;

const markerIsInLinkText = (pos) =>
    linksInText.some((link) => pos >= link.index && pos <= link.lastIndex);

const parse = (code) => (state, silent) => {
    if (silent) return false;

    const start = state.pos;

    // skip parsing emphasis if marker is within a link
    if (markerIsInLinkText(start)) {
        return false;
    }

    const marker = state.src.charCodeAt(start);

    // marker character: "_", "*", ":"
    if (marker !== codes[code].encodedChar) {
        return false;
    }

    const MARKER_REGEX = new RegExp(codes[code].regexString);
    const token = state.src.slice(start);

    if (MARKER_REGEX.test(token)) {
        const markerMatch = token.match(MARKER_REGEX);

        // skip parsing sections where the marker is not at the start of the token
        if (markerMatch.index !== 0) {
            return false;
        }

        const text = markerMatch[1];

        state.push(`${codes[code].domEl}_open`, codes[code].domEl, 1);

        const t = state.push('text', '', 0);
        t.content = codes[code].contentFn(text);

        state.push(`${codes.bold.domEl}_close`, codes[code].domEl, -1);
        state.pos += markerMatch[0].length;

        return true;
    }

    return false;
};

class MdParser {
    constructor() {
        // disable all rules, enable autolink for URLs and email addresses
        md = new MarkdownIt('zero', { linkify: true });

        // *bold* -> <strong>bold</strong>
        md.inline.ruler.push('strong', parse(codes.bold.name));

        // _italic_ -> <em>italic</em>
        md.inline.ruler.push('italic', parse(codes.italic.name));

        // :-) :) :-( :( :+1 :-1 -> <span>[unicode]</span>
        md.inline.ruler.push('emoji', parse(codes.emoji.name));

        md.enable(['linkify', 'strong', 'italic', 'emoji']);

        return this;
    }

    render(text) {
        linksInText = md.linkify.match(text) || [];

        return md.renderInline(text);
    }
}

export default MdParser;
