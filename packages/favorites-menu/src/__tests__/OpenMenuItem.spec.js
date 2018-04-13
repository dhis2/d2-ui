import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText, ListItemIcon } from 'material-ui/List';
import FavoritesDialog from 'd2-ui-favorites-dialog';

import { getStubContext } from '../../../../config/inject-theme';
import OpenMenuItem from '../OpenMenuItem';

describe('Favorites: FavoritesMenu > OpenMenuItem component', () => {
    let openMenuItem;
    let onOpen;
    let props;
    let favoritesDialog;

    const context = getStubContext();

    beforeEach(() => {
        onOpen = jest.fn();

        props = {
            favoriteType: 'chart',
            onOpen,
        };

        openMenuItem = shallow(<OpenMenuItem {...props} />, { context });
    });

    it('should render the Open button', () => {
        expect(openMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(openMenuItem.find(ListItemText).props().primary).toEqual('Open');
    });

    it('should open the Favorites dialog on button click', () => {
        openMenuItem.find(MenuItem).simulate('click');

        favoritesDialog = openMenuItem.find(FavoritesDialog);
        expect(favoritesDialog.props().open).toBe(true);
    });

    it('should close the Favorites dialog on click', () => {
        openMenuItem.find(MenuItem).simulate('click');
        openMenuItem.find(MenuItem).simulate('click');

        favoritesDialog = openMenuItem.find(FavoritesDialog);
        expect(favoritesDialog.props().open).toBe(false);
    });

    it('should trigger the onOpen callback when a favorite is selected in the dialog', () => {
        favoritesDialog = openMenuItem.find(FavoritesDialog);
        favoritesDialog.props().onFavoriteSelect({ id: 'model-id' });

        expect(onOpen).toHaveBeenCalledTimes(1);
    });
});
