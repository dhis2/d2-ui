import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import { InterpretationComments } from '../InterpretationComments';
import InterpretationComment from '../InterpretationComment';
import CommentTextarea from '../CommentTextarea';
import InterpretationModel from '../../../models/interpretation';
import { getStubContext } from '../../../../config/test-context';

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
        interpretation: new InterpretationModel({}, interpretation),
        onSave: jest.fn(),
        onDelete: jest.fn(),
        classes: {},
    };

    const props = {...baseProps, ...partialProps};
    const fullContext = _.merge(context, partialContext);
    return shallow(<InterpretationComments {...props} />, { context: fullContext });
};

let interpretationComments;
let commentComponents;
let currentUser;
let commentComponent;
let commentToEdit;
let commentToDelete;

describe('Interpretations: Interpretations -> InterpretationComments component', () => {
    beforeEach(() => {
        currentUser = {
            id: "xE7jOejl9FI",
            displayName: "John Traore",
        };
        interpretationComments = renderComponent({}, {d2: {currentUser}});
        commentComponents = interpretationComments.find(InterpretationComment);
    });

    describe('list of comments', () => {
        it('should render interpretation comments', () => {
            expect(commentComponents).toHaveLength(interpretation.comments.length);
        });

        it('should be sorted by date (from oldest to newest)', () => {
            const commentIds = commentComponents.map(commentComponent => commentComponent.props().comment.id);
            expect(commentIds).toEqual(["tEvCRL8r9KW", "gerk24EJ22x"]);
        });

        it('should render actions for a comment if current user is its author', () => {
            commentComponents.forEach(commentComponent => {
                const showManageActions = commentComponent.props().showManageActions;
                if (commentComponent.props().comment.user.id == currentUser.id) {
                    expect(showManageActions).toBe(true);
                } else {
                    expect(showManageActions).toBe(false);
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
        });

        it("should replace the read-only comment with a comment textarea", () => {
            expect(interpretationComments.find(CommentTextarea)).toHaveLength(1);
            expect(interpretationComments.find(InterpretationComment)).toHaveLength(interpretation.comments.length - 1);
        });

        describe("click on OK link", () => {
            beforeEach(() => {
                const newComment = _.assign({}, commentToEdit, {text: "New text"});
                interpretationComments.find(CommentTextarea).props().onPost(newComment);
                interpretationComments.update();
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
                expect(interpretationComments.find(CommentTextarea)).toHaveLength(0);
                expect(interpretationComments.find(InterpretationComment)).toHaveLength(interpretation.comments.length);
            });
        });

        describe("click on Cancel link", () => {
            beforeEach(() => {
                interpretationComments.find(CommentTextarea).props().onCancel();
                interpretationComments.update();
            });

            it("should not call prop onSave", () => {
                const { onSave } = interpretationComments.instance().props;
                expect(onSave).toHaveBeenCalledTimes(0);
            });

            it("should switch to read-only comment", () => {
                expect(interpretationComments.find(CommentTextarea)).toHaveLength(0);
                expect(interpretationComments.find(InterpretationComment)).toHaveLength(interpretation.comments.length);
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
            //commentsBox = interpretationComments.find(".interpretation-comments");
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

    describe('click on reply link', () => {
        beforeEach(() => {
            commentComponent = commentComponents.at(1);
            const commentToReplyTo = commentComponent.props().comment;
            commentComponent.props().onReply(commentToReplyTo);
            interpretationComments.update();
        });

        it('should render a cancellable comment text area component', () => {
            const commentTextarea = interpretationComments.find(CommentTextarea);
            expect(commentTextarea).toHaveLength(1);
            expect(commentTextarea.props().comment.text).toEqual("");
            expect(commentTextarea).toHaveProp("onCancel");
        });
    });
});
