import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText, ListItemIcon } from 'material-ui/List';
import SharingDialog from 'd2-ui-sharing-dialog';

import { getStubContext } from '../../../../config/inject-theme';
import ShareMenuItem from '../ShareMenuItem';

describe('Favorites: FavoritesMenu > ShareMenuItem component', () => {
    let shareMenuItem;
    let onShare;
    let props;
    let sharingDialog;

    const context = getStubContext();

    beforeEach(() => {
        onShare = jest.fn();

        props = {
            enabled: true,
            favoriteType: 'chart',
            favoriteModel: { id: 'some-favorite' },
            onShare,
        };

        shareMenuItem = shallow(<ShareMenuItem {...props} />, { context });
    });

    it('should render the Share button', () => {
        expect(shareMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(shareMenuItem.find(ListItemText).props().primary).toEqual('Share');
    });

    it('should open the Sharing dialog on button click', () => {
        const menuItem = shareMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        sharingDialog = shareMenuItem.find(SharingDialog);
        expect(sharingDialog.props().open).toBe(true);
    });

    it('should close the Sharing dialog on click', () => {
        shareMenuItem.find(MenuItem).simulate('click');
        shareMenuItem.find(MenuItem).simulate('click');

        sharingDialog = shareMenuItem.find(SharingDialog);
        expect(sharingDialog.props().open).toBe(false);
    });

    it('should trigger the onShare callback when the SharingDialog is closed', () => {
        shareMenuItem.find(SharingDialog).simulate('requestClose');

        expect(onShare).toHaveBeenCalledTimes(1);
    });
});
