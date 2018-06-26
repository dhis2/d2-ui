import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../../config/inject-theme';

import RichTextEditor from '../RichTextEditor';

describe('RichTextEditor component', () => {
    let richEditorComponent;
    let props;

    const context = getStubContext();

    const renderComponent = props => {
        return shallow(<RichTextEditor {...props} />);
    };

    beforeEach(() => {
        props = {
            d2: context.d2,
        };

        richEditorComponent = renderComponent(props);
    });

    it('should render a CKEditor component', () => {
        expect(richEditorComponent.find('CKEditor')).toHaveLength(1);
    });

    it('should not render a portal component for mentions', () => {
        expect(richEditorComponent.find('Portal')).toHaveLength(0);
    });
});
