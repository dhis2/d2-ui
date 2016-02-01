import React from 'react/addons';
import injectTheme from '../../config/inject-theme';
import CreatedBy from '../../src/sharing/CreatedBy.component';

const {
    findRenderedComponentWithType,
    findRenderedDOMComponentWithTag,
    renderIntoDocument,
    } = React.addons.TestUtils;

xdescribe('Sharing: CreatedBy component', () => {
    let createdByComponent;
    const renderComponent = (props = {}) => {
        const CreatedByWithContext = injectTheme(CreatedBy);
        const renderedComponents = renderIntoDocument(<CreatedByWithContext {...props} />);

        createdByComponent = findRenderedComponentWithType(renderedComponents, CreatedBy);
        return createdByComponent;
    };

    it('should render a h1 tag with the title', () => {
        const userObject = {
            id: 'GOLswS44mh8',
            name: 'Tom Wakiki',
            created: '2012-11-21T11:02:04.303+0000',
            lastUpdated: '2014-12-19T11:28:37.065+0000',
            href: 'http://localhost:8080/dhis/api/users/GOLswS44mh8',
        };
        renderComponent({user: userObject});

        const createdByElement = React.findDOMNode(findRenderedDOMComponentWithTag(createdByComponent, 'div'));

        expect(createdByElement.textContent).to.equal('created_by_translated: Tom Wakiki');
    });
});
