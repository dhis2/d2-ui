import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';

import { Interpretation } from '../OldInterpretation';
import NewInterpretation from '../NewInterpretation';
import InterpretationComments from '../../InterpretationCommments/CommentList';
import ActionButtonContainer from '../ActionButtonContainer';
import ActionButton from '../ActionButton';
import { getStubContext } from '../../../../config/test-context';

//TODO: adjust/create similar tests with the re-factored components

const interpretation = {
    name: 'LOECMJN3DRF',
    id: 'LOECMJN3DRF',
    likes: 2,
    text: 'Some interpretation',
    created: '2018-04-14T12:00:47.096',
    user: {
        id: 'xE7jOejl9FI',
        displayName: 'John Traore',
    },
    likedBy: [
        {
            id: 'gdfdRRxx112',
            displayName: 'Kevin Boateng',
        },
        {
            id: 'vDFwDfe16Gr',
            displayName: 'Manuel Perez',
        },
    ],
    comments: [
        {
            id: 'tEvCRL8r9KW',
            text: 'Comment1',
            created: '2018-05-11T09:42:52.627',
            user: {
                id: 'xE7jOejl9FI',
                displayName: 'John Traore',
            },
        },
        {
            id: 'gerk24EJ22x',
            text: 'Comment2',
            created: '2018-05-11T09:46:52.627',
            user: {
                id: 'gdfdRRxx112',
                displayName: 'Kevin Boateng',
            },
        },
    ],
    like: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
};

const renderComponent = (partialProps = {}, partialContext = {}) => {
    const baseProps = {
        interpretation: interpretation,
        onChange: jest.fn(),
        extended: false,
        classes: {
            actions: 'actions'
        },
    };

    const props = { ...baseProps, ...partialProps };
    const context = getStubContext();
    const fullContext = _.merge(context, partialContext);
    return shallow(<Interpretation {...props} />, { context: fullContext });
};

let interpretationComponent;
let currentUser;



describe('Interpretations: Interpretations -> Interpretation component', () => {
    beforeEach(() => {
        currentUser = { id: 'xE7jOejl9FI', displayName: 'John Traore' };
    });

    describe('compact view', () => {
        beforeEach(() => {
            interpretationComponent = renderComponent({ extended: false }, { d2: { currentUser } });
        });

        it('should show actions', () => {
            expect(interpretationComponent.find(ActionButtonContainer)).toExist();
        });

        it('should not show comments', () => {
            expect(interpretationComponent.find(InterpretationComments)).not.toExist();
        });
    });

    describe('extended view', () => {
        beforeEach(() => {
            interpretationComponent = renderComponent({ extended: true }, { d2: { currentUser } });
        });

        it('should show actions', () => {
            expect(interpretationComponent.find(ActionButtonContainer)).toExist();
        });

        it('should show comments', () => {
            expect(interpretationComponent.find(InterpretationComments)).toExist();
        });

        describe('when edit action clicked', () => {
            beforeEach(() => {
                interpretationComponent
                    .find(ActionButtonContainer)
                    .find(ActionButton)
                    .find({ tooltip: 'Edit' })
                    .simulate('click');
                interpretationComponent.update();
            });

            it('should open a NewInterpretation component', () => {
                expect(interpretationComponent.find(NewInterpretation)).toExist();
            });
        });

        describe('when delete action clicked', () => {
            beforeEach(() => {
                window.confirm = jest.fn(() => true);
                interpretationComponent
                    .find(ActionButton)
                    .find({ tooltip: 'Delete' })
                    .simulate('click');
                interpretationComponent.update();
            });

            it('should ask confirmation', () => {
                expect(window.confirm).toHaveBeenCalled();
            });

            it('should delete interpretation', () => {
                expect(interpretation.delete).toHaveBeenCalledWith();
            });

            it('should notify change with a null object', () => {
                const { onChange } = interpretationComponent.instance().props;
                expect(onChange).toHaveBeenCalledWith(null);
            });
        });
    });   
});
