import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText, ListItemIcon } from 'material-ui/List';
import { getStubContext } from '../../../../config/inject-theme';

import RenameDialog from '../RenameDialog';
import RenameMenuItem from '../RenameMenuItem';

describe('File: FileMenu > RenameMenuItem component', () => {
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
            enabled: true,
            fileType: 'chart',
            fileModel: { id: 'some-file' },
            onRename,
            onRenameError: onError,
        };

        renameMenuItem = shallow(<RenameMenuItem {...props} />, { context });
    });

    it('should render the Rename button', () => {
        expect(renameMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(renameMenuItem.find(ListItemText).props().primary).toEqual('Rename');
    });

    it('should open the Rename dialog on button click', () => {
        const menuItem = renameMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        renameDialog = renameMenuItem.find(RenameDialog);
        expect(renameDialog.props().open).toBe(true);
    });

    it('should close the Rename dialog on click', () => {
        renameMenuItem.find(MenuItem).simulate('click');
        renameMenuItem.find(MenuItem).simulate('click');

        renameDialog = renameMenuItem.find(RenameDialog);
        expect(renameDialog.props().open).toBe(false);
    });

    it('should trigger the onRename callback upon successful rename', () => {
        renameMenuItem.find(RenameDialog).simulate('requestRename');

        expect(onRename).toHaveBeenCalledTimes(1);
    });

    it('should trigger the onRenameError callback upon unsuccessful rename', () => {
        renameMenuItem.find(RenameDialog).simulate('requestRenameError');

        expect(onError).toHaveBeenCalledTimes(1);
    });
});
