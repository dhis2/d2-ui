import sinon from 'sinon';
import Interpretation from '../interpretation';
import * as api from '../../util/api';

const favorite = {
    id: "zDP78aJU8nX",
    name: "ANC: 1st visit coverage (%) by district last year",
    modelDefinition: {name: "map"},
    publicAccess: "rw------",
    externalAccess: true,
    userGroupAccesses: [{
        access: "rw------",
        userGroupUid: "zz6XckBrLlj",
        displayName: "Administrators",
        id: "zz6XckBrLlj"
    }],
    userAccesses: [{
        access: "rw------",
        displayName: "John Traore",
        id: "xE7jOejl9FI",
        userUid: "xE7jOejl9FI"
    }],
};

const interpretationAttributes = {
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

let interpretation;

describe("Models > Interpretation", () => {
    describe("Persisted interpretation", () => {
        beforeEach(() => {
            interpretation = new Interpretation(favorite, Object.assign({}, interpretationAttributes, {id: "gwebGGddaxD"}));
        });

        describe("save", () => {
            beforeEach(() => {
                api.apiFetch = jest.fn(() => Promise.resolve({}));
                return interpretation.save();
            });

            it("should PUT text to API", () => {
                expect(api.apiFetch).toBeCalledWith("/interpretations/gwebGGddaxD", "PUT", interpretationAttributes.text);
            });
        });

        describe("delete", () => {
            beforeEach(() => {
                api.apiFetch = jest.fn(() => Promise.resolve({}));
                return interpretation.delete();
            });

            it("should PUT text to API", () => {
                expect(api.apiFetch).toBeCalledWith("/interpretations/gwebGGddaxD", "DELETE");
            });
        });

        describe("like", () => {
            beforeEach(() => {
                api.apiFetch = jest.fn(() => Promise.resolve({}));
                return interpretation.like(true);
            });

            it("should PUT text to API", () => {
                expect(api.apiFetch).toBeCalledWith("/interpretations/gwebGGddaxD/like", "POST");
            });
        });

        describe("unlike", () => {
            beforeEach(() => {
                api.apiFetch = jest.fn(() => Promise.resolve({}));
                return interpretation.like(false);
            });

            it("should PUT text to API", () => {
                expect(api.apiFetch).toBeCalledWith("/interpretations/gwebGGddaxD/like", "DELETE");
            });
        });
    });

    describe("Non-persisted interpretation", () => {
        beforeEach(() => {
            interpretation = new Interpretation(favorite, interpretationAttributes);
        });

        describe("save", () => {
            beforeEach(() => {
                api.apiFetch = jest.fn(() => Promise.resolve({}));

                const apiFetchWithResponseStub = sinon.stub();
                apiFetchWithResponseStub.withArgs(
                    "/interpretations/map/zDP78aJU8nX",
                    "POST",
                    interpretationAttributes.text,
                ).returns(Promise.resolve({headers: {get: (key) => ({location: "1234"}[key])}}));
                apiFetchWithResponseStub.throws();
                api.apiFetchWithResponse = apiFetchWithResponseStub;

                return interpretation.save();
            });

            it("should save sharing of interpretation from object", () => {
                const expectedSharing = {
                    object: {
                        publicAccess: "rw------",
                        externalAccess: true,
                        userGroupAccesses: [{
                            access: "rw------",
                            userGroupUid: "zz6XckBrLlj",
                            displayName: "Administrators",
                            id: "zz6XckBrLlj"
                        }],
                        userAccesses: [{
                            access: "rw------",
                            displayName: "John Traore",
                            id: "xE7jOejl9FI",
                            userUid: "xE7jOejl9FI"
                        }],
                    },
                };
                expect(api.apiFetch)
                    .toBeCalledWith("/sharing?type=interpretation&id=1234", "PUT", expectedSharing);
            });
        });
    });
});
