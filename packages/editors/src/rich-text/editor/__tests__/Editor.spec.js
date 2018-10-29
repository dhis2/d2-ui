import React from 'react';
import { shallow } from 'enzyme';

import Editor from '../Editor';

describe('RichText: Editor component', () => {
    let richTextEditor;
    const props = {
        onEdit: jest.fn(),
    };

    const renderComponent = props => {
        return shallow(
            <Editor {...props}>
                <input />
            </Editor>
        );
    };

    it('should have rendered a result', () => {
        richTextEditor = renderComponent();

        expect(richTextEditor).toHaveLength(1);
    });
});
