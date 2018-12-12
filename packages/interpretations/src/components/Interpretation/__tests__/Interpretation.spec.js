import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';

import { Interpretation } from '../Interpretation';
import CardHeader from '../CardHeader';
import NewInterpretation from '../NewInterpretation';
import InterpretationComments from '../../InterpretationCommments/CommentList';
import ActionButton from '../ActionButton';
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
            expect(interpretationComponent.find('div').first().find('div').first().children().length).toEqual(1);
        });

        it('sould show View action', () => {
            expect(interpretationComponent.find(ActionButton).find({ tooltip: 'View' })).toExist();
        });

        it('should not show comments', () => {
            expect(interpretationComponent.find(InterpretationComments)).not.toExist();
        });
    });

    describe('extended view', () => {
        beforeEach(() => {
            interpretationComponent = renderComponent({ extended: true }, { d2: { currentUser } });
        });

        it.only('should show actions', () => {
            expect(interpretationComponent.find('div').first().find('div').first().children().length).toEqual(6);
        });

        it('should show Exit view action', () => {
            expect(interpretationComponent.find(ActionButton).find({ tooltip: 'Exit View' })).toExist();
        });

        it('should show comments', () => {
            expect(interpretationComponent.find(InterpretationComments)).toExist();
        });

        describe('not liked by current user', () => {
            beforeEach(() => {
                currentUser = { id: 'kf34GLJED33', displayName: 'Nelson Mandela' };
                interpretationComponent = renderComponent(
                    { extended: true },
                    { d2: { currentUser } }
                );
            });

            it('should show like action', () => {
                expect(interpretationComponent.find(ActionButton).find({ tooltip: 'Like' })).toExist();
            });

            describe('when like is clicked', () => {
                beforeEach(() => {
                    interpretationComponent
                        .find(ActionButton)
                        .find({ tooltip: 'Like' })
                        .simulate('click');
                });

                it('should like interpretation', () => {
                    expect(interpretation.like).toHaveBeenCalledWith(true);
                });

                it('should notify change', () => {
                    const { onChange } = interpretationComponent.instance().props;
                    expect(onChange).toHaveBeenCalledWith(interpretation);
                });
            });
        });

        describe('liked by current user', () => {
            beforeEach(() => {
                currentUser = { id: 'gdfdRRxx112', displayName: 'Kevin Boateng' };
                interpretationComponent = renderComponent(
                    { extended: true },
                    { d2: { currentUser } }
                );
            });

            it('should show unlike action', () => {
                expect(interpretationComponent.find(ActionButton).find({ tooltip: 'Unlike' })).toExist();
            });

            describe('when unlike is clicked', () => {
                beforeEach(() => {
                    interpretationComponent
                        .find(ActionButton)
                        .find({ tooltip: 'Unlike' })
                        .simulate('click');
                });

                it('should unlike interpretation', () => {
                    expect(interpretation.like).toHaveBeenCalledWith(false);
                });

                it('should notify change', () => {
                    const { onChange } = interpretationComponent.instance().props;
                    expect(onChange).toHaveBeenCalledWith(interpretation);
                });
            });
        });

        describe('owner actions', () => {
            describe('interpretation owned by current user', () => {
                beforeEach(() => {
                    currentUser = { id: 'xE7jOejl9FI', displayName: 'John Traore' };
                    interpretationComponent = renderComponent(
                        { extended: true },
                        { d2: { currentUser } }
                    );
                });

                it('should show an edit action', () => {
                    expect(interpretationComponent.find(ActionButton).find({ tooltip: 'Edit' })).toExist();
                });

                it('should show a delete action', () => {
                    expect(
                        interpretationComponent.find(ActionButton).find({ tooltip: 'Delete' })
                    ).toExist();
                });

                describe('when edit action clicked', () => {
                    beforeEach(() => {
                        interpretationComponent
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

            describe('interpretation not owned by current user', () => {
                beforeEach(() => {
                    currentUser = { id: 'gdfdRRxx112', displayName: 'Kevin Boateng' };
                    interpretationComponent = renderComponent(
                        { extended: true },
                        { d2: { currentUser } }
                    );
                });

                it('should not show an edit action', () => {
                    expect(
                        interpretationComponent.find(ActionButton).find({ tooltip: 'Edit' })
                    ).not.toExist();
                });

                it('should not show a delete action', () => {
                    expect(
                        interpretationComponent.find(ActionButton).find({ tooltip: 'Delete' })
                    ).not.toExist();
                });
            });
        });
    });
});
