import React from 'react';
import { shallow } from 'enzyme';
import RichEditor from '../RichEditor';

const mentions = {
    mostMentionedUsers: [{
        "displayName": "Didier Konan",
        "id": "I9fMsY4pRKk",
        "username": "konan"
    }, {
        "displayName": "Donor User",
        "id": "cddnwKV2gm9",
        "username": "donor"
    }, {
        "displayName": "Bombali District",
        "id": "NOOF56dveaZ",
        "username": "bombali"
    }],
    allUsers: [{
        id: 'rWLrZL8rP3K',
        displayName: 'Guest User',
        username: 'guest'
    }]
};

const renderComponent = (partialProps = {}, partialContext = {}) => {
    const baseProps = {
      mentions: mentions,
    };
    const props = {...baseProps, ...partialProps};
    return shallow(<RichEditor {...props} />);
};

let richEditorComponent;

describe('html-editor: RichEditor component', () => {
    beforeEach(() => {
        richEditorComponent = renderComponent();
    });

    it('should render a CKEditor component', () => {
        expect(richEditorComponent.find('CKEditor')).toHaveLength(1);
    });

    it('should not render a portal component for mentions', () => {
        expect(richEditorComponent.find('Portal')).toHaveLength(0);
    });
});
