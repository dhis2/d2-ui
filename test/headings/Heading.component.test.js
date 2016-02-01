import {shallow} from 'enzyme';
import React from 'react/addons';
import Heading from '../../src/headings/Heading.component';

describe('Heading component', () => {
    let renderedHeading;

    const renderComponent = (props = {}) => {
        renderedHeading = shallow(<Heading {...props} />);
    };

    it('should render a h1 tag with the title', () => {
        renderComponent({text: 'Facility Funding Agency'});

        expect(renderedHeading.is('h1')).to.be.true;
    });

    it('should render a h2 tag with the title', () => {
        renderComponent({text: 'Facility Funding Agency', level: 2});

        expect(renderedHeading.is('h2')).to.be.true;
        expect(renderedHeading.children()).to.have.length(1);
        expect(renderedHeading.children().nodes[0]).to.equal('Facility Funding Agency');
    });

    it('should not render a h7 tag', () => {
        renderComponent({text: 'Facility Funding Agency', level: 7});

        expect(renderedHeading.node).to.equal(null);
    });

    it('should pass any additional props to the h1 tag', () => {
        const styleDef = {fontSize: '2rem'};
        renderComponent({text: 'Facility Funding Agency', style: styleDef, 'id': 'SomeText'});

        expect(renderedHeading.props().id).to.equal('SomeText');
        expect(renderedHeading.props().style).to.deep.equal(styleDef);
    });
});
