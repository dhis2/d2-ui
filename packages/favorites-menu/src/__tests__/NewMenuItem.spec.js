import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { getStubContext } from '../../../../config/inject-theme';

import NewMenuItem from '../NewMenuItem';

describe('Favorites: FavoritesMenu > NewMenuItem component', () => {
    let newMenuItem;
    let onNew;
    let props;

    const context = getStubContext();

    beforeEach(() => {
        onNew = jest.fn();

        props = {
            onNew: onNew,
        };

        newMenuItem = shallow(<NewMenuItem {...props} />);
    });

    it('should render the New button', () => {
        expect(newMenuItem.find(ListItemText).props().primary).toEqual('New');
    });

    it('should trigger the onNew callback when the button is clicked', () => {
        newMenuItem.simulate('click');

        expect(onNew).toHaveBeenCalledTimes(1);
    });
});
