import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';

import GetLinkDialog from '../GetLinkDialog';
import GetLinkMenuItem from '../GetLinkMenuItem';

describe('Favorites: FavoritesMenu > GetLinkMenuItem component', () => {
    let getLinkMenuItem;
    let onGetLink;
    let props;
    let getLinkDialog;

    beforeEach(() => {
        onGetLink = jest.fn();

        props = {
            favoriteType: 'chart',
            favoriteModel: { id: 'some-favorite' },
        };

        getLinkMenuItem = shallow(<GetLinkMenuItem {...props} />);
    });

    it('should render the GetLink button', () => {
        expect(getLinkMenuItem.find(ListItemText).props().primary).toEqual('Get link');
    });

    it('should open the GetLink dialog on button click', () => {
        getLinkMenuItem.find(MenuItem).simulate('click');

        getLinkDialog = getLinkMenuItem.find(GetLinkDialog);
        expect(getLinkDialog.props().open).toBe(true);
    });

    it('should close the GetLink dialog on click', () => {
        getLinkMenuItem.simulate('click');

        getLinkDialog = getLinkMenuItem.find(GetLinkDialog);
        expect(getLinkDialog.props().open).toBe(false);
    });
});
