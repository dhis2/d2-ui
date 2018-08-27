import React from 'react';
import { shallow } from 'enzyme';

import RichTextWrapper from '../RichTextWrapper';

describe('RichText: RichTextWrapper component', () => {
    let richTextWrapper;
    const props = {
        style: { color: 'blue' },
    };

    const renderComponent = (props, text) => {
        return shallow(<RichTextWrapper {...props}>{text}</RichTextWrapper>);
    };

    it('should have rendered a result', () => {
        richTextWrapper = renderComponent({}, 'test');

        expect(richTextWrapper).toHaveLength(1);
    });

    it('should have rendered a result with the style prop', () => {
        richTextWrapper = renderComponent(props, 'test prop');

        expect(richTextWrapper.props().style).toEqual(props.style);
    });

    it('should have rendered a plain text content', () => {
        richTextWrapper = renderComponent({}, 'plain text');

        expect(richTextWrapper.html()).toEqual('<p>plain text</p>');
    });

    it('should have rendered markdown converted into HTML', () => {
        const tests = [
            ['_italic_', '<em>italic</em>'],
            ['*bold*', '<strong>bold</strong>'],
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
            // _ inside italic not allowed, it closes the <em>
            ['_italic with _ inside_', '<em>italic with </em> inside_'],
            ['_italic with * inside_', '<em>italic with * inside</em>'],
            // * inside bold not allowed, it closes the <strong>
            ['*bold with * inside*', '<strong>bold with </strong> inside*'],
            ['*bold with _ inside*', '<strong>bold with _ inside</strong>'],
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
            richTextWrapper = renderComponent({}, test[0]);

            expect(richTextWrapper.html()).toEqual(`<p>${test[1]}</p>`);
        });
    });
});
