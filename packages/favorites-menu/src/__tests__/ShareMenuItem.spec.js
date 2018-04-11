import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { getStubContext } from '../../../../config/inject-theme';

import SharingDialog from 'd2-ui-sharing-dialog';
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
            favoriteType: 'chart',
            favoriteModel: { id: 'some-favorite' },
            onShare: onShare,
        };

        shareMenuItem = shallow(<ShareMenuItem {...props} />, { context });
    });

    it('should render the Share button', () => {
        expect(shareMenuItem.find(ListItemText).props().primary).toEqual('Share');
    });

    it('should open the Sharing dialog on button click', () => {
        shareMenuItem.find(MenuItem).simulate('click');

        sharingDialog = shareMenuItem.find(SharingDialog);
        expect(sharingDialog.props().open).toBe(true);
    });

    it('should close the Sharing dialog on click', () => {
        shareMenuItem.simulate('click');

        sharingDialog = shareMenuItem.find(SharingDialog);
        expect(sharingDialog.props().open).toBe(false);
    });

    it('should trigger the onShare callback when the SharingDialog is closed', () => {
        sharingDialog = shareMenuItem.find(SharingDialog);
        sharingDialog.props().onRequestClose();

        expect(onShare).toHaveBeenCalledTimes(1);
    });
});
