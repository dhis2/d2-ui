import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText, ListItemIcon } from 'material-ui/List';

import SaveMenuItem from '../SaveMenuItem';

describe('Favorites: FavoritesMenu > SaveMenuItem component', () => {
    let saveMenuItem;
    let onSave;
    let props;

    beforeEach(() => {
        onSave = jest.fn();

        props = {
            enabled: true,
            onSave,
        };

        saveMenuItem = shallow(<SaveMenuItem {...props} />);
    });

    it('should render the Save button', () => {
        expect(saveMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(saveMenuItem.find(ListItemText).props().primary).toEqual('Save');
    });

    it('should trigger the onSave callback when the button is clicked', () => {
        const menuItem = saveMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
    });
});
