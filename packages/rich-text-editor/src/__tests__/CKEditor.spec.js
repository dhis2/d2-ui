import React from 'react';
import { shallow } from 'enzyme';
import CKEditor from '../CKEditor';

class CKEditorStub {
    setData(data) {}
    on() {}
}

window.CKEDITOR = {
    replace: () => new CKEditorStub(),
    getCss: () => '',
    addCss: css => {},
};

describe('RichTextEditor: CKEditor component', () => {
    let ckeditorComponent;

    const renderComponent = props => {
        return shallow(<CKEditor {...props} />);
    };

    beforeEach(() => {
        ckeditorComponent = renderComponent();
    });

    it('should render a textarea', () => {
        expect(ckeditorComponent.find('textarea')).toHaveLength(1);
    });
});
