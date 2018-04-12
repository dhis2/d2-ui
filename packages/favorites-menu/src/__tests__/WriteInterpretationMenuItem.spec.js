import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { getStubContext } from '../../../../config/inject-theme';

import WriteInterpretationDialog from '../WriteInterpretationDialog';
import WriteInterpretationMenuItem from '../WriteInterpretationMenuItem';

describe('Favorites: FavoritesMenu > WriteInterpretationMenuItem component', () => {
    let writeInterpretationMenuItem;
    let onWriteInterpretation;
    let props;
    let writeInterpretationDialog;

    const context = getStubContext();

    beforeEach(() => {
        onWriteInterpretation = jest.fn();

        props = {
            favoriteType: 'chart',
            favoriteModel: { id: 'some-favorite' },
            onWriteInterpretation: onWriteInterpretation,
        };

        writeInterpretationMenuItem = shallow(<WriteInterpretationMenuItem {...props} />, {
            context,
        });
    });

    it('should render the WriteInterpretation button', () => {
        expect(writeInterpretationMenuItem.find(ListItemText).props().primary).toEqual(
            'Write interpretation'
        );
    });

    it('should open the WriteInterpretation dialog on button click', () => {
        writeInterpretationMenuItem.find(MenuItem).simulate('click');

        writeInterpretationDialog = writeInterpretationMenuItem.find(WriteInterpretationDialog);
        expect(writeInterpretationDialog.props().open).toBe(true);
    });

    it('should close the WriteInterpretation dialog on click', () => {
        writeInterpretationMenuItem.simulate('click');

        writeInterpretationDialog = writeInterpretationMenuItem.find(WriteInterpretationDialog);
        expect(writeInterpretationDialog.props().open).toBe(false);
    });

    it('should trigger the onWriteInterpretation callback upon successful interpretation edit', () => {
        writeInterpretationDialog = writeInterpretationMenuItem.find(WriteInterpretationDialog);
        writeInterpretationDialog.props().onRequestWriteInterpretation();

        expect(onWriteInterpretation).toHaveBeenCalledTimes(1);
    });
});
