import React from 'react';
import { shallow } from 'enzyme';
import { ActionButtonContainer } from '../ActionButtonContainer';
import ActionButton from '../ActionButton';



let baseProps = {
    classes: {},
    currentUserLikesInterpretation: false,
    isFocused: false,
    isOwner: false,
    onClickHandlers: [
        jest.fn(), jest.fn(), jest.fn(), 
        jest.fn(), jest.fn(), jest.fn(), 
        jest.fn(), jest.fn()
    ],
};

const renderComponent = (partialProps = {}) => {

    const props = {...baseProps, ...partialProps}
    return shallow(<ActionButtonContainer {...props} />);
};

let actionButtonContainerComponent;

describe('components: ActionButton -> ActionButtonContainer component', () => {
    beforeEach(() => { 
        actionButtonContainerComponent = renderComponent();
    });

    describe('with prop currentUserLikesInterpretation as false', () => {
        it('should render an Actionbutton with iconType like', () => {
            const actionButtons = actionButtonContainerComponent.find(ActionButton);
            const unlikeButton = actionButtons.findWhere(button => button.props().iconType === 'like')
            expect(unlikeButton.length).toEqual(1);
        });
    });

    describe('with prop currentUserLikesInterpretation as true', () => {
        beforeEach(() => { 
            actionButtonContainerComponent = renderComponent({ currentUserLikesInterpretation: true });
        });

        it('should render an Actionbutton with iconType unlike', () => {
            const actionButtons = actionButtonContainerComponent.find(ActionButton);
            const unlikeButton = actionButtons.findWhere(button => button.props().iconType === 'unlike')
            expect(unlikeButton.length).toEqual(1);
        });
    });

    it('should render an ActionButton with iconType reply', () => {
        const actionButtons = actionButtonContainerComponent.find(ActionButton);
        const replyButton = actionButtons.findWhere(button => button.props().iconType === 'reply')
        expect(replyButton.length).toEqual(1);
    });

    describe('with prop isFocused as false', () => {
        it('should only render an ActionButton with iconType visibility', () => {
            const actionButtons = actionButtonContainerComponent.find(ActionButton);
            const viewButton = actionButtons.findWhere(button => button.props().iconType === 'visibility');

            expect(viewButton.length).toEqual(1);
        });
    });

    describe('with prop isFocused as true', () => {
        beforeEach(() => { 
            actionButtonContainerComponent = renderComponent({ isFocused: true });
        });

        it('should only render an ActionButton with iconType visibilityOff', () => {
            const actionButtons = actionButtonContainerComponent.find(ActionButton);
            const exitViewButton = actionButtons.findWhere(button => button.props().iconType === 'visibilityOff');

            expect(exitViewButton.length).toEqual(1);
        });

        describe('and prop isOwner as false', () => {
                
            it('should not render any additional buttons', () => {
                const actionButtons = actionButtonContainerComponent.find(ActionButton);
                const ownerActions = actionButtons.findWhere(button => 
                    button.props().iconType === 'share' || 
                    button.props().iconType === 'edit'  ||
                    button.props().iconType === 'delete'
                );
    
                expect(ownerActions.length).toEqual(0);
            });
        });

        describe('and prop isOwner as true', () => {
            beforeEach(() => { 
                actionButtonContainerComponent = renderComponent({ isFocused: true, isOwner: true });
            });

            it('should render ActionButtons with iconType share, edit and delete', () => {
                const actionButtons = actionButtonContainerComponent.find(ActionButton);
                const ownerActions = actionButtons.findWhere(button => 
                    button.props().iconType === 'share' || 
                    button.props().iconType === 'edit'  ||
                    button.props().iconType === 'delete'
                );

                expect(ownerActions.length).toEqual(3);
            });
        });

    });
});