import React from 'react';
import { shallow } from 'enzyme';
import Editor from '../Editor';
import convertCtrlKey from '../convertCtrlKey';

jest.mock('../convertCtrlKey');

describe('RichText: Editor component', () => {
    let richTextEditor;
    const componentProps = {
        onEdit: jest.fn(),
    };

    beforeEach(() => {
        convertCtrlKey.mockClear();
    });

    const renderComponent = props => {
        return shallow(
            <Editor {...props}>
                <input />
            </Editor>
        );
    };

    it('renders a result', () => {
        richTextEditor = renderComponent(componentProps);

        expect(richTextEditor).toHaveLength(1);
    });

    it('calls convertCtrlKey on keydown', () => {
        richTextEditor = renderComponent(componentProps);
        richTextEditor.simulate('keyDown');
        expect(convertCtrlKey).toHaveBeenCalled();
    });
});
