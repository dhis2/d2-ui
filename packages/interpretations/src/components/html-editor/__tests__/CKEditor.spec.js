import React from 'react';
import { shallow } from 'enzyme';
import CKEditor from '../CKEditor';

const renderComponent = (partialProps = {}, partialContext = {}) => {
    const baseProps = {};
    const props = {...baseProps, ...partialProps};
    return shallow(<CKEditor {...props} />);
};

class CKEditorStub {
    setData(data) {}
    on() {}
}

window.CKEDITOR = {
    replace: () => new CKEditorStub(),
    getCss: () => "",
    addCss: (css) => {},
};

let ckeditorComponent;

describe('html-editor: CKEditor component', () => {
    beforeEach(() => {
        ckeditorComponent = renderComponent();
    });

    it('should render a textarea', () => {
        expect(ckeditorComponent.find('textarea')).toHaveLength(1);
    });
});
