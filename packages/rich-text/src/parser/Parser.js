import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MarkdownIt from 'markdown-it';

const initParser = () => {
    // disable all rules, enable autolink for URLs and email addresses
    const md = new MarkdownIt('zero', { linkify: true });

    // *bold* -> <strong>bold</strong>
    md.inline.ruler.push('strong', (state, silent) => {
        if (silent) return false;

        const start = state.pos;
        const marker = state.src.charCodeAt(start);

        // marker character: "*"
        if (marker !== 0x2a) {
            return false;
        }

        const BOLD_RE = /^\*([^*]+)\*/;

        const token = state.src.slice(start);

        if (BOLD_RE.test(token)) {
            const boldMatch = token.match(BOLD_RE);

            const text = boldMatch[0].slice(1, -1);

            state.push('strong_open', 'strong', 1);

            const t = state.push('text', '', 0);
            t.content = text;

            state.push('strong_close', 'strong', -1);

            state.pos += boldMatch[0].length;

            return true;
        }

        return false;
    });

    // _italic_ -> <em>italic</em>
    md.inline.ruler.push('italic', (state, silent) => {
        if (silent) return false;

        const start = state.pos;
        const marker = state.src.charCodeAt(start);

        // marker character: "_"
        if (marker !== 0x5f) {
            return false;
        }

        const ITALIC_RE = /^_([^_]+)_/;

        const token = state.src.slice(start);

        if (ITALIC_RE.test(token)) {
            const italicMatch = token.match(ITALIC_RE);

            const text = italicMatch[0].slice(1, -1);

            state.push('em_open', 'em', 1);

            const t = state.push('text', '', 0);
            t.content = text;

            state.push('em_close', 'em', -1);

            state.pos += italicMatch[0].length;

            return true;
        }

        return false;
    });

    // :-) :) :-( :( :+1 :-1 -> <span>[unicode]</span>
    md.inline.ruler.push('emoji', (state, silent) => {
        if (silent) return false;

        const start = state.pos;
        const marker = state.src.charCodeAt(start);

        // marker character: ":"
        if (marker !== 0x3a) {
            return false;
        }

        const emojiDb = {
            ':-)': '\u{1F642}',
            ':)': '\u{1F642}',
            ':-(': '\u{1F641}',
            ':(': '\u{1F641}',
            ':+1': '\u{1F44D}',
            ':-1': '\u{1F44E}',
        };

        const EMOJI_RE = /^(:-\)|:\)|:\(|:-\(|:\+1|:-1)/;

        const token = state.src.slice(start);

        if (EMOJI_RE.test(token)) {
            const emojiMatch = token.match(EMOJI_RE);

            const emoji = emojiMatch[0];

            state.push('emoji_open', 'span', 1);

            const t = state.push('text', '', 0);
            t.content = emojiDb[emoji];

            state.push('emoji_close', 'span', -1);

            state.pos += emojiMatch[0].length;

            return true;
        }

        return false;
    });

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
