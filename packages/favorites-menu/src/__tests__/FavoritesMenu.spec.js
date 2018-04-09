import React from 'react';
import { shallow } from 'enzyme';
import Button from 'material-ui/Button';
import Menu from 'material-ui/Menu';
import { getStubContext } from '../../../../config/inject-theme';

import FavoritesMenu from '../FavoritesMenu';

describe('FavoritesMenu', () => {
    let favoritesMenu;
    let props;

    const context = getStubContext();

    beforeEach(() => {
        props = {
            d2: context.d2,
            favoriteType: 'chart',
        };

        favoritesMenu = shallow(<FavoritesMenu {...props} />);
    });

    it('should have rendered a result', () => {
        expect(favoritesMenu).toHaveLength(1);
    });

    it('should render a Button', () => {
        expect(favoritesMenu.find(Button)).toHaveLength(1);
    });

    it('should render a Menu', () => {
        expect(favoritesMenu.find(Menu)).toHaveLength(1);
    });

    it('should render the Menu as closed', () => {
        expect(favoritesMenu.find(Menu).props().open).toBe(false);
    });
});
