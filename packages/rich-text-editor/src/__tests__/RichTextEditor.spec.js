import React from 'react';
import { shallow } from 'enzyme';

import RichTextEditor from '../RichTextEditor';

describe('RichText: RichTextEditor component', () => {
    let richTextEditor;
    const props = {
        onEdit: jest.fn(),
    };

    const renderComponent = props => {
        return shallow(
            <RichTextEditor {...props}>
                <input />
            </RichTextEditor>
        );
    };

    it('should have rendered a result', () => {
        richTextEditor = renderComponent();

        expect(richTextEditor).toHaveLength(1);
    });
});
