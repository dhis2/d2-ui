import React from 'react';
import { shallow } from 'enzyme';
import Dialog from 'material-ui/Dialog/Dialog';
import TextField from 'material-ui/TextField';
import DetailsDialog from '../DetailsDialog';
import { Button } from '@dhis2/d2-ui-core';

import { getStubContext } from '../../../../../../config/inject-theme';

const mockedObject = {
    id: "zDP78aJU8nX",
    name: "ANC: 1st visit coverage (%) by district last year",
    description: "Some Description",
};

const context = getStubContext();

const baseProps = {
    open: false,
    model: mockedObject,
    onSave: jest.fn(),
    onClose: jest.fn(),
};

const renderComponent = (partialProps = {}) => {
    const props = {...baseProps, ...partialProps};
    return shallow(<DetailsDialog {...props} />, { context });
};

describe('Interpretations: Details -> DetailsDialog component', () => {
    let detailsDialog;

    describe('when is closed', () => {
        beforeEach(() => {
            detailsDialog = renderComponent();
        });

        it('should not render anything', () => {
            expect(detailsDialog.find(Dialog)).toHaveLength(0);
        });
    });
    describe('when is open', () => {
        beforeEach(() => {
            detailsDialog = renderComponent({open: true});
        });

        it('should render a name field', () => {
            const nameField = detailsDialog.find(TextField)
                .filterWhere(field => field.props().name === "name");
            expect(nameField).toHaveLength(1);
            expect(nameField.props().value).toEqual(mockedObject.name);
            expect(nameField.props().multiLine).toBe(false);
        });

        it('should render a multiline description field', () => {
            const descriptionField = detailsDialog.find(TextField)
                .filterWhere(field => field.props().name === "description");
            expect(descriptionField).toHaveLength(1);
            expect(descriptionField.props().multiLine).toBe(true);
            expect(descriptionField.props().value).toEqual(mockedObject.description);
        });

        it('should render a cancel button as first action', () => {
            const buttons = detailsDialog.find(Dialog).first().prop('actions');
            expect(buttons[0].props.children).toBe('cancel_translated');
        });

        it('should render a save button as second action', () => {
            const buttons = detailsDialog.find(Dialog).first().prop('actions');
            expect(buttons[1].props.children).toBe('save_translated');
        });

        describe('on fields field', () => {
            beforeEach(() => {
                const nameField = detailsDialog.find(TextField)
                    .filterWhere(field => field.props().name === "name");
                nameField.simulate('change', {}, "new name");
                const descriptionField = detailsDialog.find(TextField)
                    .filterWhere(field => field.props().name === "description");
                descriptionField.simulate('change', {}, "new description");
            });

            describe('on component save', () => {
                it('should call onSave prop with new model', () => {
                    detailsDialog.instance().onSave()
                    expect(baseProps.onSave).toHaveBeenCalledTimes(1);
                    const call = baseProps.onSave.mock.calls[0];
                    expect(call[0]).toEqual(expect.objectContaining({
                        id: mockedObject.id,
                        name: "new name",
                        description: 'new description',
                    }));
                });
            });
        });
    });
});

