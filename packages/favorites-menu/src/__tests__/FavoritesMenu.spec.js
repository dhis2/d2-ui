import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { getStubContext } from '../../../../config/inject-theme';

import { FavoritesMenu } from '../FavoritesMenu';

describe('Favorites: FavoritesMenu component', () => {
    let favoritesMenu;
    let props;

    const context = getStubContext();

    beforeEach(() => {
        props = {
            d2: context.d2,
            favoriteType: 'chart',
            onNew: jest.fn(),
            onOpen: jest.fn(),
            onSave: jest.fn(),
            onSaveAs: jest.fn(),
            onRename: jest.fn(),
            onTranslate: jest.fn(),
            onShare: jest.fn(),
            onWriteInterpretation: jest.fn(),
            onDelete: jest.fn(),
            onError: jest.fn(),
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

    it('should render the Menu as open when the button is clicked', () => {
        const button = favoritesMenu.find(Button);

        button.simulate('click', { currentTarget: button });
        expect(favoritesMenu.find(Menu).props().open).toBe(true);
    });

    const buttons = [
        { name: 'New', componentName: 'NewMenuItem', enabled: false },
        { name: 'Open', componentName: 'OpenMenuItem', enabled: true },
        { name: 'Save', componentName: 'SaveMenuItem', enabled: false },
        { name: 'Save as...', componentName: 'SaveAsMenuItem', enabled: false },
        { name: 'Rename', componentName: 'RenameMenuItem', enabled: false },
        { name: 'Translate', componentName: 'TranslateMenuItem', enabled: false },
        { name: 'Share', componentName: 'ShareMenuItem', enabled: false },
        {
            name: 'Write interpretation',
            componentName: 'WriteInterpretationMenuItem',
            enabled: false,
        },
        { name: 'Get link', componentName: 'GetLinkMenuItem', enabled: false },
        { name: 'Delete', componentName: 'DeleteMenuItem', enabled: false },
    ];

    buttons.forEach(({ name, componentName, enabled }) => {
        it(`should render the ${name} menu item`, () => {
            const button = favoritesMenu.find(componentName);

            expect(button).toHaveLength(1);
            expect(button.props().enabled).toBe(enabled);
        });
    });

    it('should close the Menu when the button is clicked again', () => {
        const button = favoritesMenu.find(Button);

        // open the menu first
        button.simulate('click', { currentTarget: button });

        button.simulate('click', { currentTarget: button });
        expect(favoritesMenu.find(Menu).props().open).toBe(false);
    });
});
