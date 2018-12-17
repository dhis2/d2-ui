import React from 'react';
import { shallow } from 'enzyme';
import { ActionButtonContainer } from '../ActionButtonContainer';
import ActionButton from '../ActionButton';



let baseProps = {
    classes: {},
    currentUserLikesInterpretation: false,
    showActions: false,
    userCanManage: false,
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

    describe('with prop showActions as true', () => {
        beforeEach(() => { 
            actionButtonContainerComponent = renderComponent({ showActions: true });
        });

        it('should render an ActionButton with iconType reply', () => {
            const actionButtons = actionButtonContainerComponent.find(ActionButton);
            const replyButton = actionButtons.findWhere(button => button.props().iconType === 'reply')
            expect(replyButton.length).toEqual(1);
        });
    
        it('should render an ActionButton with iconType visibilityOff', () => {
            const actionButtons = actionButtonContainerComponent.find(ActionButton);
            const exitViewButton = actionButtons.findWhere(button => button.props().iconType === 'visibilityOff')
            expect(exitViewButton.length).toEqual(1);
        });
       
        describe('with prop userCanManage as false', () => {
            
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

        describe('with prop currentUserLikesInterpretation as false', () => {
            it('should render an Actionbutton with iconType like', () => {
                const actionButtons = actionButtonContainerComponent.find(ActionButton);
                const unlikeButton = actionButtons.findWhere(button => button.props().iconType === 'like')
                expect(unlikeButton.length).toEqual(1);
            });
        });

        describe('with prop currentUserLikesInterpretation as true', () => {
            beforeEach(() => { 
                actionButtonContainerComponent = renderComponent({ showActions: true, currentUserLikesInterpretation: true });
            });

            it('should render an Actionbutton with iconType unlike', () => {
                const actionButtons = actionButtonContainerComponent.find(ActionButton);
                const unlikeButton = actionButtons.findWhere(button => button.props().iconType === 'unlike')
                expect(unlikeButton.length).toEqual(1);
            });
        });




        describe('with prop userCanManage as true', () => {
            beforeEach(() => { 
                actionButtonContainerComponent = renderComponent({ showActions: true, userCanManage: true });
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

    describe('with prop showActions as false', () => {
        beforeEach(() => { 
            actionButtonContainerComponent = renderComponent();
        });

        it('should only render an ActionButton with iconType visibility', () => {
            const actionButtons = actionButtonContainerComponent.find(ActionButton);
            const viewButton = actionButtons.findWhere(button => button.props().iconType === 'visibility');

            expect(actionButtons.length).toEqual(1);
            expect(viewButton.length).toEqual(1);
        });

    });
});