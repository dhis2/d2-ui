import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { getStubContext } from '../../../../config/inject-theme';

import RenameDialog from '../RenameDialog';
import RenameMenuItem from '../RenameMenuItem';

describe('Favorites: FavoritesMenu > RenameMenuItem component', () => {
    let renameMenuItem;
    let onRename;
    let onError;
    let props;
    let renameDialog;

    const context = getStubContext();

    beforeEach(() => {
        onRename = jest.fn();
        onError = jest.fn();

        props = {
            favoriteType: 'chart',
            favoriteModel: { id: 'some-favorite' },
            onRename: onRename,
            onRenameError: onError,
        };

        renameMenuItem = shallow(<RenameMenuItem {...props} />, { context });
    });

    it('should render the Rename button', () => {
        expect(renameMenuItem.find(ListItemText).props().primary).toEqual('Rename');
    });

    it('should open the Rename dialog on button click', () => {
        renameMenuItem.find(MenuItem).simulate('click');

        renameDialog = renameMenuItem.find(RenameDialog);
        expect(renameDialog.props().open).toBe(true);
    });

    it('should close the Rename dialog on click', () => {
        renameMenuItem.simulate('click');

        renameDialog = renameMenuItem.find(RenameDialog);
        expect(renameDialog.props().open).toBe(false);
    });

    it('should trigger the onRename callback upon successful rename', () => {
        renameDialog = renameMenuItem.find(RenameDialog);
        renameDialog.props().onRequestRename();

        expect(onRename).toHaveBeenCalledTimes(1);
    });

    it('should trigger the onRenameError callback upon unsuccessful rename', () => {
        renameDialog = renameMenuItem.find(RenameDialog);
        renameDialog.props().onRequestRenameError();

        expect(onError).toHaveBeenCalledTimes(1);
    });
});
