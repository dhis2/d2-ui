import React from 'react/addons';
import DataTableContextMenuWithoutContext from '../../src/data-table/DataTableContextMenu.component';
import FontIcon from 'material-ui/lib/font-icon';
import MenuItem from 'material-ui/lib/menus/menu-item';
import injectTheme from '../config/inject-theme';

const TestUtils = React.addons.TestUtils;

describe('DataTableContextMenu component', () => {
    let DataTableContextMenu;
    let contextMenuComponent;
    const activeItemSource = {
        id: 'DXyJmlo9rge',
        created: '2015-03-31T11:31:09.324+0000',
        name: 'John Barnes',
        lastUpdated: '2015-03-31T11:39:14.763+0000',
        href: 'https://apps.dhis2.org/dev/api/users/DXyJmlo9rge',
    };
    let actionList;

    beforeEach(() => {
        actionList = {
            edit: sinon.spy(),
            translate: sinon.spy(),
        };

        DataTableContextMenu = injectTheme(DataTableContextMenuWithoutContext);
        const renderedComponents = TestUtils.renderIntoDocument(
            <DataTableContextMenu
                activeItem={activeItemSource}
                actions={actionList}
                icons={{
                    edit: 'mode_edit',
                }}
            />
        );

        contextMenuComponent = TestUtils.findRenderedComponentWithType(renderedComponents, DataTableContextMenuWithoutContext);
    });

    it('should have the data-table__context-menu class', () => {
        expect(() => TestUtils.findRenderedDOMComponentWithClass(contextMenuComponent, 'data-table__context-menu')).not.to.throw();
    });

    it('should set the actions to be an empty object', () => {
        const renderedComponents = TestUtils.renderIntoDocument(
            <DataTableContextMenu activeItem={activeItemSource} />
        );
        contextMenuComponent = TestUtils.findRenderedComponentWithType(renderedComponents, DataTableContextMenuWithoutContext);

        expect(contextMenuComponent.state.actions).to.deep.equal({});
    });

    it('should show the actions based on the actionList', () => {
        const actionItems = TestUtils.scryRenderedDOMComponentsWithClass(contextMenuComponent, 'data-table__context-menu__item');

        expect(actionItems.length).to.equal(2);
    });

    it('should call the action from the action list', () => {
        const actionItems = TestUtils.scryRenderedDOMComponentsWithClass(contextMenuComponent, 'data-table__context-menu__item');

        TestUtils.Simulate.click(actionItems[0].getDOMNode());

        expect(actionList.edit).to.be.called;
    });

    it('should render the icon based on the name', () => {
        const actionItems = TestUtils.scryRenderedComponentsWithType(contextMenuComponent, FontIcon);
        const editButton = actionItems[0].getDOMNode();

        expect(editButton.textContent).to.equal('mode_edit');
    });

    it('should render the name of the field as an icon name if no icon was provided', () => {
        const actionItems = TestUtils.scryRenderedComponentsWithType(contextMenuComponent, FontIcon);
        const translateButton = actionItems[1].getDOMNode();

        expect(translateButton.textContent).to.equal('translate');
    });

    it('should render the action text a translated strings', () => {
        const actionItems = TestUtils.scryRenderedComponentsWithType(contextMenuComponent, MenuItem);
        const editButton = actionItems[0];

        expect(editButton.props.primaryText).to.equal('edit_translated');
    });
});
