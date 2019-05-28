import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { NewCommentField } from '../NewCommentField';
import { getStubContext } from '../../../../config/test-context';

const context = getStubContext();

const comment = {
    id: 'tEvCRL8r9KW',
    text: 'Comment text',
    user: {
        id: 'xE7jOejl9FI',
        displayName: 'John Traore',
    },
};

const baseProps = {
    classes: {},
    comment: comment,
    onPost: jest.fn(),
};

const renderComponent = (partialProps = {}) => {
    const props = { ...baseProps, ...partialProps };
    return shallow(<NewCommentField {...props} />, { context });
};

describe('Interpretations: Comment -> NewCommentField component', () => {
    let newComment;

    beforeEach(() => {
        newComment = renderComponent({});
    });

    it('should render a textarea with the comment text', () => {
        expect(newComment.find('textarea')).toHaveProp('value', comment.text);
    });

    it('should render a save reply button when text is present', () => {
        const buttons = newComment.find(Button);
        const saveReplyButton = buttons.findWhere(button => button.props().children === 'Save reply');
        expect(saveReplyButton).toExist();
    });

    it('should render a cancel button when text is present', () => {
        const buttons = newComment.find(Button);
        const cancelButton = buttons.findWhere(button => button.props().children === 'Cancel');
        expect(cancelButton).toExist();
    });

    describe('when Save reply is clicked with new text on textarea', () => {
        beforeEach(() => {
            newComment
                .find('textarea')
                .props()
                .onChange({ target: { value: 'new text' } });
            const buttons = newComment.find(Button);
            const saveReplyButton = buttons.findWhere(button => button.props().children === 'Save reply');
            saveReplyButton.simulate('click');
        });

        it('should call onPost with the updated comment', () => {
            const onPost = newComment.instance().props.onPost;
            expect(onPost).toHaveBeenCalledTimes(1);

            const onPostCall = onPost.mock.calls[0];
            expect(onPostCall[0]).toEqual(
                expect.objectContaining({
                    id: comment.id,
                    text: 'new text',
                })
            );
        });
    });

    describe('when Cancel button is clicked', () => {
        beforeEach(() => {
            newComment = renderComponent({ onCancel: jest.fn() });

            newComment
            .find(Button)
            .findWhere(button => button.props().children === 'Cancel')
            .simulate('click');
        });

        it('should call onCancel', () => {
            const onCancel = newComment.instance().props.onCancel;
            expect(onCancel).toHaveBeenCalledTimes(1);
        });
    });

    describe('when Save reply button is clicked with new text on textarea', () => {
        beforeEach(() => {
            newComment
            .find('textarea')
            .props()
            .onChange({ target: { value: 'new text' } });

            newComment
                .find(Button)
                .findWhere(button => button.props().children === 'Save reply')
                .simulate('click');
        });

        it('should call onPost with the updated comment', () => {
            const onPost = newComment.instance().props.onPost;
            expect(onPost).toHaveBeenCalled();

            const onPostCall = onPost.mock.calls[0];
            expect(onPostCall[0]).toEqual(
                expect.objectContaining({
                    id: comment.id,
                    text: 'new text',
                })
            );
        });

        it('should clear the textarea', () => {
            expect(newComment.find('textarea')).toHaveProp('value', '');
        });
    });
});
