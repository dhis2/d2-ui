import React from 'react';
import { shallow } from 'enzyme';
import CommentTextarea from '../CommentTextarea';
import PropTypes from 'prop-types';
import { getStubContext } from '../../../../config/test-context';

const context = getStubContext();
const childContextTypes = {d2: PropTypes.object};

const comment = {
    id: "tEvCRL8r9KW",
    text: "Comment text",
    user: {
        id: "xE7jOejl9FI",
        displayName: "John Traore",
    },
};

const baseProps = {
    comment: comment,
    onPost: jest.fn(),
    onCancel: undefined,
};

const renderComponent = (partialProps = {}) => {
    const props = {...baseProps, ...partialProps};
    return shallow(<CommentTextarea {...props} />, { context, childContextTypes });
};

describe('Interpretations: Interpretations -> CommentTextarea component', () => {
    let commentTextarea;

    describe("with no onCancel prop", () => {
        beforeEach(() => {
            commentTextarea = renderComponent({onPost: jest.fn(), onCancel: undefined});
        });

        it('should render a textarea with the comment text', () => {
            expect(commentTextarea.find("textarea")).toHaveProp("value", comment.text)
        });

        it('should render a post link', () => {
            expect(commentTextarea.find("Link")).toHaveProp("label", "Post comment")
        });

        it('should not render a cancel link', () => {
            const links = commentTextarea.find("Link");
            const cancelLinks = links.findWhere(link => link.props().label === "Cancel");
            expect(cancelLinks).not.toExist();
        });

        describe("when post is clicked with new text on textarea", () => {
            beforeEach(() => {
                commentTextarea.find("textarea").props().onChange({ target: { value: "new text" } });
                const links = commentTextarea.find("Link");
                const postLink = links.findWhere(link => link.props().label === "Post comment");
                postLink.simulate("click");
            });

            it("should call onPost with the updated comment", () => {
                const onPost = commentTextarea.instance().props.onPost;
                expect(onPost).toHaveBeenCalledTimes(1);
                const onPostCall = onPost.mock.calls[0];
                expect(onPostCall[0]).toEqual(expect.objectContaining({
                    id: comment.id,
                    text: "new text",
                }));
            });
        });
    });

    describe("with onCancel prop", () => {
        beforeEach(() => {
            commentTextarea = renderComponent({onPost: jest.fn(), onCancel: jest.fn()});
        });

        it('should render a textarea with the comment text', () => {
            expect(commentTextarea.find("textarea")).toHaveProp("value", comment.text)
        });

        it('should render an ok link', () => {
            const okLinks = commentTextarea
                .find("Link")
                .findWhere(link => link.props().label === "OK");
            expect(okLinks).toExist();
        });

        it('should render a cancel link', () => {
            const cancelLinks = commentTextarea
                .find("Link")
                .findWhere(link => link.props().label === "Cancel");
            expect(cancelLinks).toExist();
        });

        describe("when cancel link is clicked", () => {
            beforeEach(() => {
                commentTextarea
                    .find("Link")
                    .findWhere(link => link.props().label === "Cancel")
                    .simulate("click");
            });

            it("should call onCancel", () => {
                const onCancel = commentTextarea.instance().props.onCancel;
                expect(onCancel).toHaveBeenCalledTimes(1);
            });
        });

        describe("when ok link is clicked with new text on textarea", () => {
            beforeEach(() => {
                commentTextarea
                    .find("Link")
                    .findWhere(link => link.props().label === "OK")
                    .simulate("click");
            });

            it("should call onPost with the updated comment", () => {
                const onPost = commentTextarea.instance().props.onPost;
                expect(onPost).toHaveBeenCalledTimes(1);
                const onPostCall = onPost.mock.calls[0];
                expect(onPostCall[0]).toEqual(expect.objectContaining({
                    id: comment.id,
                    text: "new text",
                }));
            });

            it("should clear the textarea", () => {
                expect(commentTextarea.find("textarea")).toHaveProp("value", "");
            });
        });
    });
});
