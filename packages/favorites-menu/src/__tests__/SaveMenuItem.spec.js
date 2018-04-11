import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { getStubContext } from '../../../../config/inject-theme';

import SaveMenuItem from '../SaveMenuItem';

describe('Favorites: FavoritesMenu > SaveMenuItem component', () => {
    let saveMenuItem;
    let onSave;
    let props;

    const context = getStubContext();

    beforeEach(() => {
        onSave = jest.fn();

        props = {
            onSave: onSave,
        };

        saveMenuItem = shallow(<SaveMenuItem {...props} />);
    });

    it('should render the New button', () => {
        expect(saveMenuItem.find(ListItemText).props().primary).toEqual('Save');
    });

    it('should trigger the onSave callback when the button is clicked', () => {
        saveMenuItem.simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
    });
});
