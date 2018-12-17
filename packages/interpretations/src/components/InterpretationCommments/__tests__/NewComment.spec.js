import React from 'react';
import { shallow } from 'enzyme';
import { NewComment } from '../NewComment';
import Link from '../../Link/Link';
import PropTypes from 'prop-types';
import { getStubContext } from '../../../../config/test-context';

const context = getStubContext();
const childContextTypes = { d2: PropTypes.object };

const comment = {
    id: 'tEvCRL8r9KW',
    text: 'Comment text',
    user: {
        id: 'xE7jOejl9FI',
        displayName: 'John Traore',
    },
};

const baseProps = {
    comment: comment,
    onPost: jest.fn(),
    isNew: false,
    onCancel: jest.fn(),
    classes: {},
};

const renderComponent = (partialProps = {}) => {
    const props = { ...baseProps, ...partialProps };
    return shallow(<NewComment {...props} />, { context, childContextTypes });
};

describe('Interpretations: Interpretations -> NewComment component', () => {
    let newComment;

    beforeEach(() => {
        newComment = renderComponent({});
    });

    it('should render a textarea with the comment text', () => {
        expect(newComment.find('textarea')).toHaveProp('value', comment.text);
    });

    it('should render a cancel link', () => {
        const links = newComment.find(Link);
        const cancelLinks = links.findWhere(link => link.props().label === 'Cancel');
        expect(cancelLinks).toExist();
    });

    describe('with isEditing prop as false', () => {
        beforeEach(() => {
            newComment = renderComponent({ onPost: jest.fn(), isEditing: false });
        });

        it('should render a Post reply link', () => {
            const links = newComment.find(Link);
            const postReplyLinks = links.findWhere(link => link.props().label === 'Post reply');
            expect(postReplyLinks.length).toEqual(1);
        });
    });

    describe('with isEditing prop as true', () => {
        beforeEach(() => {
            newComment = renderComponent({ onPost: jest.fn(), isEditing: true });
        });

        it('should render a OK link', () => {
            const links = newComment.find(Link);
            const okLinks = links.findWhere(link => link.props().label === 'OK');
            expect(okLinks.length).toEqual(1);
        });
    });

    describe('when post is clicked with new text on textarea', () => {
        beforeEach(() => {
            newComment
                .find('textarea')
                .props()
                .onChange({ target: { value: 'new text' } });
            const links = newComment.find(Link);
            const postLink = links.findWhere(link => link.props().label === 'Post reply');
            postLink.simulate('click');
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

    describe('when cancel link is clicked', () => {
        beforeEach(() => {
            newComment
                .find(Link)
                .findWhere(link => link.props().label === 'Cancel')
                .simulate('click');
        });

        it('should call onCancel', () => {
            const onCancel = newComment.instance().props.onCancel;
            expect(onCancel).toHaveBeenCalledTimes(1);
        });
    });

    describe('when Post reply link is clicked with new text on textarea', () => {
        beforeEach(() => {
            newComment
            .find('textarea')
            .props()
            .onChange({ target: { value: 'new text' } });

            newComment
                .find(Link)
                .findWhere(link => link.props().label === 'Post reply')
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
