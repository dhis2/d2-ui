import React from 'react';
import { mount } from 'enzyme';
import { CardText } from '../CardText';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';

let card;

const baseProps = {
    classes: {},
    extended: false,
    text: '',
};

const cardText = (partialProps = {}) => {
    if (!card) {
        const props = {...baseProps, ...partialProps}
        card = mount(<CardText {...props} />);
    }
    return card;
};

describe('components: Cards -> CardText component ', () => {
    beforeEach(() => {
        card = undefined;
    });

    it('should render a RichTextParser', () => {
        expect(cardText().find(RichTextParser)).toExist();
    });

    it('should render parsed bold text', () => {
        const text = 'Some *bold interpretation* text';
        const date = cardText({ text }).text();
        expect(date).toContain('Some bold interpretation text');
    });

    it('should render parsed italic text', () => {
        const text = 'Some _italic interpretation_ text';
        const date = cardText({ text }).text();
        expect(date).toContain('Some italic interpretation text');

    });

});