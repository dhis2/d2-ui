import React from 'react/addons';
import injectTheme from '../config/inject-theme';
import Heading from '../../src/headings/Heading.component';

const {
    findRenderedComponentWithType,
    findRenderedDOMComponentWithTag,
    renderIntoDocument,
} = React.addons.TestUtils;

describe('Heading component', () => {
    let sharingComponent;
    const renderComponent = (props = {}) => {
        const SharingWithContext = injectTheme(Heading);
        const renderedComponents = renderIntoDocument(<SharingWithContext {...props} />);

        sharingComponent = findRenderedComponentWithType(renderedComponents, Heading);
        return sharingComponent;
    };

    it('should render a Dialog element', () => {
        renderComponent();

        expect(() => findRenderedComponentWithType(sharingComponent, Heading)).not.to.throw();
    });

    it('should render a h1 tag with the title', () => {
        renderComponent({text: 'Facility Funding Agency'});

        const titleElement = React.findDOMNode(findRenderedDOMComponentWithTag(sharingComponent, 'h1'));

        expect(titleElement.textContent).to.equal('Facility Funding Agency');
    });

    it('should render a h2 tag with the title', () => {
        renderComponent({text: 'Facility Funding Agency', level: 2});

        const titleElement = React.findDOMNode(findRenderedDOMComponentWithTag(sharingComponent, 'h2'));

        expect(titleElement.textContent).to.equal('Facility Funding Agency');
    });

    it('should not render a h7 tag', () => {
        renderComponent({text: 'Facility Funding Agency', level: 7});

        expect(() => findRenderedDOMComponentWithTag(sharingComponent, 'h7')).to.throw();
    });

    it('should pass any additional props to the h1 tag', () => {
        const styleDef = {fontSize: '2rem'};
        renderComponent({text: 'Facility Funding Agency', style: styleDef, 'id': 'SomeText'});

        const titleElement = findRenderedDOMComponentWithTag(sharingComponent, 'h1');

        expect(titleElement.props.style).to.equal(styleDef);
        expect(titleElement.props.id).to.equal('SomeText');
    });
});
