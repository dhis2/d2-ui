import React from 'react';
import { shallow } from 'enzyme';
import MuiDialog from '@material-ui/core/Dialog';
import TranslationDialog from '../TranslationDialog.component';

describe('TranslationDialog component', () => {
    const defaultProps = {
        open: false,
        objectToTranslate: {
            id: 'objectid',
        },
        onTranslationSaved: () => undefined,
        onTranslationError: () => undefined,
        onRequestClose: () => undefined,
        onEnter: () => undefined,
        fieldsToTranslate: [],
        d2: {
            i18n: {
                getTranslation: () => '',
            },
        },
    };

    const dialog = props =>
        shallow(<TranslationDialog {...props} />);

    it('renders a Mui Dialog', () => {
        const muiDialog = dialog(defaultProps).find(MuiDialog);

        expect(muiDialog).toHaveLength(1);
    });

    it('passes correct props to Mui Dialog', () => {
        const muiDialog = dialog(defaultProps).find(MuiDialog);
        const props = muiDialog.props();

        expect(props).toHaveProperty('open');
        expect(props).toHaveProperty('onEnter');
        expect(props).not.toHaveProperty('onTranslationSaved');
        expect(props).not.toHaveProperty('onRequestClose');
    });
});
