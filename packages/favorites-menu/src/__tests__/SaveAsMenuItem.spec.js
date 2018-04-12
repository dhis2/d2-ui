import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { getStubContext } from '../../../../config/inject-theme';

import SaveAsDialog from '../SaveAsDialog';
import SaveAsMenuItem from '../SaveAsMenuItem';

describe('Favorites: FavoritesMenu > SaveAsMenuItem component', () => {
    let saveAsMenuItem;
    let onSaveAs;
    let props;
    let saveAsDialog;

    const context = getStubContext();

    beforeEach(() => {
        onSaveAs = jest.fn();

        props = {
            favoriteType: 'chart',
            favoriteModel: { id: 'some-favorite' },
            onSaveAs: onSaveAs,
        };

        saveAsMenuItem = shallow(<SaveAsMenuItem {...props} />);
    });

    it('should render the SaveAs button', () => {
        expect(saveAsMenuItem.find(ListItemText).props().primary).toEqual('Save as...');
    });

    it('should open the SaveAs dialog on button click', () => {
        saveAsMenuItem.find(MenuItem).simulate('click');

        saveAsDialog = saveAsMenuItem.find(SaveAsDialog);
        expect(saveAsDialog.props().open).toBe(true);
    });

    it('should close the SaveAs dialog on click', () => {
        saveAsMenuItem.simulate('click');

        saveAsDialog = saveAsMenuItem.find(SaveAsDialog);
        expect(saveAsDialog.props().open).toBe(false);
    });

    it('should trigger the onSaveAs callback on form submit', () => {
        saveAsDialog = saveAsMenuItem.find(SaveAsDialog);
        saveAsDialog.props().onRequestSaveAs();

        expect(onSaveAs).toHaveBeenCalledTimes(1);
    });
});
