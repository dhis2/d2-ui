import React from 'react';
import { shallow } from 'enzyme';
import { Comment } from '../Comment';
import ActionButton from '../../Buttons/ActionButton';
import DeleteDialog from '../../DeleteDialog/DeleteDialog';

let shallowComment;

const baseProps = {
    classes: {},
    comment: {
        id: 'id',
        user: 'system',
        displayName: 'Tom Waikiki',
        text: 'Comment text',
        created: '2018-05-11T09:46:52.627',
    },
    isOwner: false,
    canReply: true,
    locale: 'en',
    onEdit: jest.fn(),
    onReply: jest.fn(),
    onDelete: jest.fn(),
    dialogIsOpen: false,
    onDeleteConfirm: jest.fn(),
    onDeleteCancel: jest.fn(),
};

const comment = (partialProps = {}) => {
    if (!shallowComment) {
        const props = {...baseProps, ...partialProps}
        shallowComment = shallow(<Comment {...props} />);
    }
    return shallowComment;
};

describe('components: Comment -> Comment component ', () => {
   beforeEach(() => {
        shallowComment = undefined;
   });

    describe('with prop isOwner as false', () => {
        it('should only show an ActionButton with iconType reply', () => {
            const buttons = comment().find(ActionButton);
            expect(buttons.length).toBe(1);
            expect(buttons.props().iconType).toEqual('reply');

        });

        describe('The reply button', () => {
            it('should call prop onReply when clicked', () => {
                comment().find(ActionButton).simulate('click');
                expect(baseProps.onReply).toHaveBeenCalled();
            });
        });
    });

    describe('with prop isOwner as true', () => {
        beforeEach(() => {
            comment({ isOwner: true });
        });

        it('should show an ActionButton with iconType edit', () => {
            const editButton = comment().find(ActionButton)
                .findWhere(button => button.props().iconType === 'edit');
            
            expect(editButton.props().iconType).toEqual('edit');
        });

        describe('The edit button', () => {
            it('should call prop onEdit when clicked', () => {
                const editButton = comment().find(ActionButton)
                    .findWhere(button => button.props().iconType === 'edit');
                editButton.simulate('click');
            
                expect(baseProps.onEdit).toHaveBeenCalled();
            });
        });

        it('should show an ActionButton with iconType reply', () => {
            const replyButton = comment().find(ActionButton)
                .findWhere(button => button.props().iconType === 'reply');
            
            expect(replyButton.props().iconType).toEqual('reply');
        });
        
        describe('The reply button', () => {
            it('should call prop onReply when clicked', () => {
                const replyButton = comment().find(ActionButton)
                    .findWhere(button => button.props().iconType === 'reply');
                    replyButton.simulate('click');
            
                expect(baseProps.onReply).toHaveBeenCalled();
            });
        });

        it('should show an ActionButton with with iconType delete', () => {
            const deleteButton = comment().find(ActionButton)
                .findWhere(button => button.props().iconType === 'delete');
        
            expect(deleteButton.props().iconType).toEqual('delete');
        });

        describe('The delete button', () => {
            it('should call prop onDelete when clicked', () => {
                const deleteButton = comment().find(ActionButton)
                    .findWhere(button => button.props().iconType === 'delete');
                    deleteButton.simulate('click');
            
                expect(baseProps.onDelete).toHaveBeenCalled();
            });
        });
    });

    describe('with prop dialogIsOpen as false', () => {
        it('should not show a DeleteDialog', () => {
            expect(comment().find(DeleteDialog)).not.toExist();
        });
    });

    describe('with prop dialogIsOpen as true', () => {
        beforeEach(() => {
            comment({ dialogIsOpen: true })
        });

        it('should show a DeleteDialog', () => {
            expect(comment().find(DeleteDialog)).toExist();  
        });
    });

});
