import React from 'react';
import { shallow } from 'enzyme';

import Parser from '../Parser';

describe('RichText: Parser component', () => {
    let richTextParser;
    const defaultProps = {
        style: { color: 'blue' },
    };

    const renderComponent = (props, text) => {
        return shallow(<Parser {...props}>{text}</Parser>);
    };

    it('should have rendered a result', () => {
        richTextParser = renderComponent({}, 'test');

        expect(richTextParser).toHaveLength(1);
    });

    it('should have rendered a result with the style prop', () => {
        richTextParser = renderComponent(defaultProps, 'test prop');

        expect(richTextParser.props().style).toEqual(defaultProps.style);
    });

    it('should have rendered a plain text content', () => {
        richTextParser = renderComponent({}, 'plain text');

        expect(richTextParser.html()).toEqual('<p>plain text</p>');
    });

    it('should have rendered markdown converted into HTML', () => {
        const tests = [
            ['_italic_', '<em>italic</em>'],
            ['*bold*', '<strong>bold</strong>'],
            ['* not bold because there is a space *', '* not bold because there is a space *'],
            ['_ not italic because there is a space _', '_ not italic because there is a space _'],
            [':-)', '<span>\u{1F642}</span>'],
            [':)', '<span>\u{1F642}</span>'],
            [':-(', '<span>\u{1F641}</span>'],
            [':(', '<span>\u{1F641}</span>'],
            [':+1', '<span>\u{1F44D}</span>'],
            [':-1', '<span>\u{1F44E}</span>'],
            [
                'mixed _italic_ *bold* and :+1',
                'mixed <em>italic</em> <strong>bold</strong> and <span>\u{1F44D}</span>',
            ],
            ['_italic with * inside_', '<em>italic with * inside</em>'],
            ['*bold with _ inside*', '<strong>bold with _ inside</strong>'],
            // italic marker inside an italic string not allowed
            ['_italic with _ inside_', '_italic with _ inside_'],
            // bold marker inside a bold string not allowed
            ['*bold with * inside*', '*bold with * inside*'],
            [
                '_multiple_ italic in the _same line_',
                '<em>multiple</em> italic in the <em>same line</em>',
            ],
            // nested italic/bold combinations not allowed
            ['_italic with *bold* inside_', '<em>italic with *bold* inside</em>'],
            ['*bold with _italic_ inside*', '<strong>bold with _italic_ inside</strong>'],
            ['text with : and :)', 'text with : and <span>\u{1F642}</span>'],
            ['(parenthesis and :))', '(parenthesis and <span>\u{1F642}</span>)'],
            [':((parenthesis:))', '<span>\u{1F641}</span>(parenthesis<span>\u{1F642}</span>)'],
            [':+1+1', '<span>\u{1F44D}</span>+1'],
            ['-1:-1', '-1<span>\u{1F44E}</span>'],
        ];

        tests.forEach(test => {
            richTextParser = renderComponent({}, test[0]);

            expect(richTextParser.html()).toEqual(`<p>${test[1]}</p>`);
        });
    });
});
