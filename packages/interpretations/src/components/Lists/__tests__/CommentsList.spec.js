import React from 'react';
import { shallow } from 'enzyme';
import merge from 'lodash/merge';
import { CommentsList } from '../CommentsList';
import Comment from '../../Comment/Comment';
import NewCommentField from '../../Comment/NewCommentField';
import InterpretationModel from '../../../models/interpretation';
import { getStubContext } from '../../../../config/test-context';

const context = getStubContext();

const interpretation = {
    name: "LOECMJN3DRF",
    id: "LOECMJN3DRF",
    likes: 1,
    text: "Some interpretation",
    publicAccess: 'rw------',
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
    const fullContext = merge(context, partialContext);
    return shallow(<CommentsList {...props} />, { context: fullContext });
};

let commentList;
let commentComponents;
let currentUser;
let commentComponent;
let commentToEdit;

describe('Interpretations: Lists -> CommentsList component', () => {
    beforeEach(() => {
        currentUser = {
            id: "xE7jOejl9FI",
            displayName: "John Traore",
        };
        commentList = renderComponent({}, {d2: {currentUser}});
        commentComponents = commentList.find(Comment);
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
                const isOwner = commentComponent.props().isOwner;
                if (commentComponent.props().comment.user.id === currentUser.id) {
                    expect(isOwner).toBe(true);
                } else {
                    expect(isOwner).toBe(false);
                }
            });
        });
    });

    describe('click on edit link of editable comment', () => {
        beforeEach(() => {
            commentComponent = commentComponents.at(1);
            commentToEdit = commentComponent.props().comment;
            commentComponent.props().onEdit(commentToEdit);
            commentList.update();
        });

        it("should replace the comment with a NewCommentField", () => {
            commentList.props();
            expect(commentList.find(NewCommentField)).toHaveLength(1);
            expect(commentList.find(Comment)).toHaveLength(interpretation.comments.length - 1);
        });

    });
});
