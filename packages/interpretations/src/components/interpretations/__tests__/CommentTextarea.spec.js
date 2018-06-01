import React from 'react';
import { shallow } from 'enzyme';
import CommentTextarea from '../CommentTextarea';
import PropTypes from 'prop-types';

import { getStubContext } from '../../../../../../config/inject-theme';

const context = getStubContext();
const childContextTypes = {muiTheme: PropTypes.object, d2: PropTypes.object};

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
            expect(commentTextarea.find("Link")).toHaveProp("label", "post_comment_translated")
        });

        it('should not render a cancel link', () => {
            const links = commentTextarea.find("Link");
            const cancelLinks = links.findWhere(link => link.props().label === "cancel_translated");
            expect(cancelLinks).not.toExist();
        });

        describe("when post is clicked with new text on textarea", () => {
            beforeEach(() => {
                commentTextarea.find("textarea").simulate('change', {target: {value: "new text"}});
                const links = commentTextarea.find("Link");
                const postLink = links.findWhere(link => link.props().label === "post_comment_translated");
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
                .findWhere(link => link.props().label === "ok_translated");
            expect(okLinks).toExist();
        });

        it('should render a cancel link', () => {
            const cancelLinks = commentTextarea
                .find("Link")
                .findWhere(link => link.props().label === "cancel_translated");
            expect(cancelLinks).toExist();
        });

        describe("when cancel link is clicked", () => {
            beforeEach(() => {
                commentTextarea
                    .find("Link")
                    .findWhere(link => link.props().label === "cancel_translated")
                    .simulate("click");
            });

            it("should call onCancel with the updated comment", () => {
                const onCancel = commentTextarea.instance().props.onCancel;
                expect(onCancel).toHaveBeenCalledTimes(1);
            });
        });

        describe("when ok link is clicked with new text on textarea", () => {
            beforeEach(() => {
                commentTextarea
                    .find("Link")
                    .findWhere(link => link.props().label === "ok_translated")
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
