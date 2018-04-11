import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { getStubContext } from '../../../../config/inject-theme';

import DeleteDialog from '../DeleteDialog';
import DeleteMenuItem from '../DeleteMenuItem';

describe('Favorites: FavoritesMenu > DeleteMenuItem component', () => {
    let deleteMenuItem;
    let onDelete;
    let props;
    let deleteDialog;

    const context = getStubContext();

    beforeEach(() => {
        onDelete = jest.fn();

        props = {
            favoriteType: 'chart',
            favoriteModel: { id: 'some-favorite' },
            onDelete: onDelete,
        };

        deleteMenuItem = shallow(<DeleteMenuItem {...props} />, { context });
    });

    it('should render the Delete button', () => {
        expect(deleteMenuItem.find(ListItemText).props().primary).toEqual('Delete');
    });

    it('should open the Delete dialog on button click', () => {
        deleteMenuItem.find(MenuItem).simulate('click');

        deleteDialog = deleteMenuItem.find(DeleteDialog);
        expect(deleteDialog.props().open).toBe(true);
    });

    it('should close the Delete dialog on click', () => {
        deleteMenuItem.simulate('click');

        deleteDialog = deleteMenuItem.find(DeleteDialog);
        expect(deleteDialog.props().open).toBe(false);
    });

    it('should trigger the onDelete callback upon successful delete', () => {
        deleteDialog = deleteMenuItem.find(DeleteDialog);
        deleteDialog.props().onRequestDelete();

        expect(onDelete).toHaveBeenCalledTimes(1);
    });
});
