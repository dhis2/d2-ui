import Comment from '../comment';
import * as api from '../../util/api';

const interpretation = {
    id: "jkffgj34GGE",
    text: "Some interpretation",
    comments: [
        {
            id: "gwebGGddaxD",
            text: "Comment 1",
        },
        {
            id: "Vdee65Gwdfq",
            text: "Comment 2",
        },
    ],
};

const commentAttributes = {
    text: "Comment 1",
};

let comment;

describe("Models > Comment", () => {
    describe("Persisted comment", () => {
        beforeEach(() => {
            comment = new Comment(interpretation, Object.assign({}, commentAttributes, {id: "gwebGGddaxD"}));
        });

        describe("save", () => {
            beforeEach(() => {
                api.apiFetch = jest.fn(() => Promise.resolve({}));
                return comment.save();
            });

            it("should PUT text to API", () => {
                expect(api.apiFetch).toBeCalledWith("/interpretations/jkffgj34GGE/comments/gwebGGddaxD", "PUT", commentAttributes.text);
            });
        });

        describe("delete", () => {
            beforeEach(() => {
                api.apiFetch = jest.fn(() => Promise.resolve({}));
                return comment.delete();
            });

            it("should PUT text to API", () => {
                expect(api.apiFetch).toBeCalledWith("/interpretations/jkffgj34GGE/comments/gwebGGddaxD", "DELETE");
            });
        });
    });

    describe("Non-persisted interpretation", () => {
        beforeEach(() => {
            comment = new Comment(interpretation, commentAttributes)
        });

        describe("save", () => {
            beforeEach(() => {
                api.apiFetch = jest.fn(() => Promise.resolve({}));
                return comment.save();
            });

            it("should PUT text to API", () => {
                expect(api.apiFetch)
                    .toBeCalledWith("/interpretations/jkffgj34GGE/comments", "POST", commentAttributes.text);
            });
        });
    });
});
