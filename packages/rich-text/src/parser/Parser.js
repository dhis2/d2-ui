import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        regexString: '^\\*((?!\\s)[^*]+(?:[^\\s]))\\*',
        contentFn: val => val,
    },
    italic: {
        name: 'italic',
        char: '_',
        domEl: 'em',
        encodedChar: 0x5f,
        regexString: '^_((?!\\s)[^_]+(?:[^\\s]))_',
        contentFn: val => val,
    },
    emoji: {
        name: 'emoji',
        char: ':',
        domEl: 'span',
        encodedChar: 0x3a,
        regexString: '^(:-\\)|:\\)|:\\(|:-\\(|:\\+1|:-1)',
        contentFn: val => emojiDb[val],
    },
};

const parse = code => (state, silent) => {
    if (silent) return false;

    const start = state.pos;
    const marker = state.src.charCodeAt(start);

    // marker character: "_", "*", ":"
    if (marker !== codes[code].encodedChar) {
        return false;
    }

    const MARKER_REGEX = new RegExp(codes[code].regexString);
    const token = state.src.slice(start);

    if (MARKER_REGEX.test(token)) {
        const markerMatch = token.match(MARKER_REGEX);
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

const initParser = () => {
    // disable all rules, enable autolink for URLs and email addresses
    const md = new MarkdownIt('zero', { linkify: true });

    // *bold* -> <strong>bold</strong>
    md.inline.ruler.push('strong', parse(codes.bold.name));

    // _italic_ -> <em>italic</em>
    md.inline.ruler.push('italic', parse(codes.italic.name));

    // :-) :) :-( :( :+1 :-1 -> <span>[unicode]</span>
    md.inline.ruler.push('emoji', parse(codes.emoji.name));

    md.enable(['linkify', 'strong', 'italic', 'emoji']);

    return md;
};

class Parser extends Component {
    constructor(props) {
        super(props);

        this.parser = initParser();
    }

    render() {
        const { children, style } = this.props;

        return (
            <p
                style={style}
                dangerouslySetInnerHTML={{
                    __html: this.parser.renderInline(children),
                }}
            />
        );
    }
}

Parser.defaultProps = {
    style: null,
};

Parser.propTypes = {
    style: PropTypes.object,
};

export default Parser;
