import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { getStubContext } from '../../../../config/inject-theme';

import TranslationDialog from 'd2-ui-translation-dialog';
import TranslateMenuItem from '../TranslateMenuItem';

describe('Favorites: FavoritesMenu > TranslateMenuItem component', () => {
    let translateMenuItem;
    let onTranslate;
    let onError;
    let props;
    let translationDialog;

    const context = getStubContext();

    beforeEach(() => {
        onTranslate = jest.fn();
        onError = jest.fn();

        props = {
            favoriteModel: { id: 'some-favorite' },
            onTranslate: onTranslate,
            onTranslateError: onError,
        };

        translateMenuItem = shallow(<TranslateMenuItem {...props} />, { context });
    });

    it('should render the Translate button', () => {
        expect(translateMenuItem.find(ListItemText).props().primary).toEqual('Translate');
    });

    it('should open the Translation dialog on button click', () => {
        translateMenuItem.find(MenuItem).simulate('click');

        translationDialog = translateMenuItem.find(TranslationDialog);
        expect(translationDialog.props().open).toBe(true);
    });

    it('should close the Translation dialog on click', () => {
        translateMenuItem.simulate('click');

        translationDialog = translateMenuItem.find(TranslationDialog);
        expect(translationDialog.props().open).toBe(false);
    });

    it('should trigger the onTranslate callback upon successful translation', () => {
        translationDialog = translateMenuItem.find(TranslationDialog);
        translationDialog.props().onTranslationSaved();

        expect(onTranslate).toHaveBeenCalledTimes(1);
    });

    it('should trigger the onError callback upon unsuccessful translation', () => {
        translationDialog = translateMenuItem.find(TranslationDialog);
        translationDialog.props().onTranslationError();

        expect(onError).toHaveBeenCalledTimes(1);
    });
});
