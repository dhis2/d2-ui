import React from 'react/addons';
import injectTheme from '../config/inject-theme';
import Sharing from '../../src/sharing/Sharing.component';
import Heading from '../../src/headings/Heading.component';
import CreatedBy from '../../src/sharing/CreatedBy.component';
import PublicAccess from '../../src/sharing/PublicAccess.component';

const {
    findRenderedComponentWithType,
    renderIntoDocument,
} = React.addons.TestUtils;

describe('Sharing: Sharing component', () => {
    let sharingComponent;
    const renderComponent = (props = {}) => {
        const SharingWithContext = injectTheme(Sharing);
        const renderedComponents = renderIntoDocument(<SharingWithContext {...props} />);

        sharingComponent = findRenderedComponentWithType(renderedComponents, Sharing);
        return sharingComponent;
    };

    it('should render a Sharing element', () => {
        renderComponent({objectToShare: {name: 'Facility Funding Agency'}});

        expect(() => findRenderedComponentWithType(sharingComponent, Sharing)).not.to.throw();
    });

    it('should render the title of the component as a Heading', () => {
        renderComponent({objectToShare: {name: 'Facility Funding Agency'}});

        const headerComponent = findRenderedComponentWithType(sharingComponent, Heading);

        expect(headerComponent.props.text).to.equal('Facility Funding Agency');
        expect(headerComponent.props.level).to.equal(2);
    });

    it('should render the CreatedBy component with the user part of the objectToShare', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            user: {
                name: 'Tom Wakiki',
            },
        };
        renderComponent({objectToShare});

        const createdByComponent = findRenderedComponentWithType(sharingComponent, CreatedBy);

        expect(createdByComponent.props.user).to.equal(objectToShare.user);
    });

    it('should pass the publicAccess property to the PublicAccess component', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            user: {
                name: 'Tom Wakiki',
            },
            publicAccess: 'r------',
        };
        renderComponent({objectToShare});

        const createdByComponent = findRenderedComponentWithType(sharingComponent, PublicAccess);

        expect(createdByComponent.props.publicAccess).to.equal(objectToShare.publicAccess);
    });
});
