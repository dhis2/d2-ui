import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';

import { Interpretation } from '../Interpretation';
import NewInterpretationField from '../NewInterpretationField';
import CommentsList from '../../Lists/CommentsList';
import ActionButtonContainer from '../../Buttons/ActionButtonContainer';
import { getStubContext } from '../../../../config/test-context';

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

let oldInterpretation;
let currentUser;



describe('Interpretations: Interpretation -> OldInterpretation component', () => {
    beforeEach(() => {
        currentUser = { id: 'xE7jOejl9FI', displayName: 'John Traore' };
    });

    describe('compact view', () => {
        beforeEach(() => {
            oldInterpretation = renderComponent({ extended: false }, { d2: { currentUser } });
        });

        it('should show actions', () => {
            expect(oldInterpretation.find(ActionButtonContainer)).toExist();
        });

        it('should not show comments', () => {
            expect(oldInterpretation.find(CommentsList)).not.toExist();
        });
    });

    describe('extended view', () => {
        beforeEach(() => {
            oldInterpretation = renderComponent({ extended: true }, { d2: { currentUser } });
        });

        it('should show actions', () => {
            expect(oldInterpretation.find(ActionButtonContainer)).toExist();
        });

        it('should show comments', () => {
            expect(oldInterpretation.find(CommentsList)).toExist();
        });

        describe('when state interpretationToEdit is true', () => {
            beforeEach(() => {
                oldInterpretation = renderComponent({}).setState({ interpretationToEdit: true });
            });

            it('should render a NewInterpretation component', () => {
                expect(oldInterpretation.find(NewInterpretationField)).toExist();
            });
        });
    });   
});
