import React from 'react/addons';
import {shallow} from 'enzyme';

import DataTableContextMenu from '../../src/data-table/DataTableContextMenu.component';

import MenuItem from 'material-ui/lib/menus/menu-item';

describe('DataTableContextMenu component', () => {
    let contextMenuComponent;
    const activeItemSource = {
        id: 'DXyJmlo9rge',
        created: '2015-03-31T11:31:09.324+0000',
        name: 'John Barnes',
        lastUpdated: '2015-03-31T11:39:14.763+0000',
        href: 'https://apps.dhis2.org/dev/api/users/DXyJmlo9rge',
    };
    let actionList;

    function renderComponent(props = {}) {
        return shallow(
            <DataTableContextMenu {...Object.assign({contextMenuActions: {}}, props)} />,
            {
                context: {
                    d2: {
                        i18n: {
                            getTranslation(key) {
                                return `${key}_translated`;
                            },
                        },
                    },
                },
            }
        );
    }

    beforeEach(() => {
        actionList = {
            edit: sinon.spy(),
            translate: sinon.spy(),
        };

        contextMenuComponent = renderComponent({
            activeItem: activeItemSource,
            actions: actionList,
            icons: {
                edit: 'mode_edit',
            },
        });
    });

    it('should have the data-table__context-menu class', () => {
        expect(contextMenuComponent.find('.data-table__context-menu')).to.have.length(1);
    });

    it('should show the actions based on the actionList', () => {
        const actionItems = contextMenuComponent.find(MenuItem);

        expect(actionItems).to.have.length(2);
    });

    it('should call the action from the action list', () => {
        const actionItems = contextMenuComponent.find('.data-table__context-menu__item');

        actionItems.first().simulate('click');

        expect(actionList.edit).to.be.called;
    });

    it('should render the icon based on the name', () => {
        const translateButton = contextMenuComponent.find(MenuItem).first();

        expect(translateButton.props().leftIcon.props.children).to.equal('mode_edit');
    });

    it('should render the name of the field as an icon name if no icon was provided', () => {
        const translateButton = contextMenuComponent.find(MenuItem).at(1);

        expect(translateButton.props().leftIcon.props.children).to.equal('translate');
    });

    it('should render the action text a translated strings', () => {
        const editButton = contextMenuComponent.find(MenuItem).first();

        expect(editButton.props().primaryText).to.equal('edit_translated');
    });
});
