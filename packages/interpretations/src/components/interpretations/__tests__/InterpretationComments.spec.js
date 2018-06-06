import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import InterpretationComments from '../InterpretationComments';
import { getStubContext } from '../../../../../../config/inject-theme';

const context = getStubContext();

const interpretation = {
    name: "LOECMJN3DRF",
    id: "LOECMJN3DRF",
    likes: 1,
    text: "Some interpretation",
    comments: [
        {
            id: "tEvCRL8r9KW",
            text: "Comment1",
            created: "2018-05-11T09:42:52.627",
            user: {
                id: "xE7jOejl9FI",
                displayName: "John Traore"
            }
        },
        {
            id: "gerk24EJ22x",
            text: "Comment2",
            created: "2018-05-11T09:46:52.627",
            user: {
                id: "gdfdRRxx112",
                displayName: "Kevin Boateng"
            }
        },
    ],
};

const renderComponent = (partialProps = {}, partialContext = {}) => {
    const baseProps = {
        interpretation: interpretation,
        onSave: jest.fn(),
        onDelete: jest.fn(),
    };

    const props = {...baseProps, ...partialProps};
    const fullContext = _.merge(context, partialContext);
    return shallow(<InterpretationComments {...props} />, { context: fullContext });
};

let interpretationComments;
let commentComponents;
let currentUser;
let commentComponent;
let commentsBox;
let commentToEdit;
let commentToDelete;

describe('Interpretations: Interpretations -> InterpretationComments component', () => {
    beforeEach(() => {
        currentUser = {
            id: "xE7jOejl9FI",
            displayName: "John Traore",
        };
        interpretationComments = renderComponent({}, {d2: {currentUser}});
        commentComponents = interpretationComments.find("Comment");
    });

    it('should render a non-cancellable comment text area component', () => {
        const commentTextarea = interpretationComments.find("CommentTextarea");
        expect(commentTextarea.props().comment.text).toEqual("");
        expect(commentTextarea).not.toHaveProp("onCancel");
    });

    describe('list of comments', () => {
        it('should render interpretation comments', () => {
            expect(commentComponents).toHaveLength(interpretation.comments.length);
        });

        it('should be sorted by date (from newest to oldest)', () => {
            const commentIds = commentComponents.map(commentComponent => commentComponent.props().comment.id);
            expect(commentIds).toEqual(["gerk24EJ22x", "tEvCRL8r9KW"]);
        });

        it('should render actions for a comment if current user is its author', () => {
            commentComponents.forEach(commentComponent => {
                const showActions = commentComponent.props().showActions;
                if (commentComponent.props().comment.user.id == currentUser.id) {
                    expect(showActions).toBe(true);
                } else {
                    expect(showActions).toBe(false);
                }
            });
        });
    });

    describe('click on edit link of editable comment', () => {
        beforeEach(() => {
            commentComponent = commentComponents.at(1);
            commentToEdit = commentComponent.props().comment;
            commentComponent.props().onEdit(commentToEdit);
            interpretationComments.update();
            commentsBox = interpretationComments.find(".interpretation-comments");
        });

        it("should replace the read-only comment with a comment textarea", () => {
            expect(commentsBox.find("CommentTextarea")).toHaveLength(1);
            expect(commentsBox.find("Comment")).toHaveLength(interpretation.comments.length - 1);
        });

        describe("click on OK link", () => {
            beforeEach(() => {
                const newComment = _.assign({}, commentToEdit, {text: "New text"});
                commentsBox.find("CommentTextarea").props().onPost(newComment);
                interpretationComments.update();
                commentsBox = interpretationComments.find(".interpretation-comments");
            });

            it("should call prop onSave", () => {
                const { onSave } = interpretationComments.instance().props;
                expect(onSave).toHaveBeenCalledTimes(1);
                const onSaveCall = onSave.mock.calls[0];
                expect(onSaveCall[0]).toEqual(expect.objectContaining({
                    id: commentToEdit.id,
                    text: "New text",
                }));
            });

            it("should switch to read-only comment", () => {
                expect(commentsBox.find("CommentTextarea")).toHaveLength(0);
                expect(commentsBox.find("Comment")).toHaveLength(interpretation.comments.length);
            });
        });

        describe("click on Cancel link", () => {
            beforeEach(() => {
                commentsBox.find("CommentTextarea").props().onCancel();
                interpretationComments.update();
                commentsBox = interpretationComments.find(".interpretation-comments");
            });

            it("should not call prop onSave", () => {
                const { onSave } = interpretationComments.instance().props;
                expect(onSave).toHaveBeenCalledTimes(0);
            });

            it("should switch to read-only comment", () => {
                expect(commentsBox.find("CommentTextarea")).toHaveLength(0);
                expect(commentsBox.find("Comment")).toHaveLength(interpretation.comments.length);
            });
        });
    });

    describe('click on delete link of editable comment', () => {
        beforeEach(() => {
            window.confirm = jest.fn(() => true)
            commentComponent = commentComponents.at(1);
            commentToDelete = commentComponent.props().comment;
            commentComponent.props().onDelete(commentToDelete);
            interpretationComments.update();
            commentsBox = interpretationComments.find(".interpretation-comments");
        });

        it("should ask confirmation", () => {
            expect(window.confirm).toHaveBeenCalled();
        });

        it("should call prop onDelete", () => {
            const { onDelete } = interpretationComments.instance().props;
            expect(onDelete).toHaveBeenCalledTimes(1);
            const onDeleteCall = onDelete.mock.calls[0];
            expect(onDeleteCall[0]).toEqual(expect.objectContaining({
                id: commentToDelete.id,
            }));
        });
    });
});
