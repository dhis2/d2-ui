import sinon from 'sinon';
import * as api from '../api';
import { getMentions } from '../users';
import { getInstance } from 'd2';


const users = [{
        id: "oXD88WWSQpR",
        displayName: "Alain Traore",
        userCredentials: {
            username: "traore"
        }
    }, {
        id: "NOOF56dveaZ",
        displayName: "Bombali District",
        userCredentials: {
            username: "bombali"
        }
    }, {
        id: "I9fMsY4pRKk",
        displayName: "Didier Konan",
        userCredentials: {
            username: "konan"
        }
    }, {
        id: "cddnwKV2gm9",
        displayName: "Donor User",
        userCredentials: {
            username: "donor"
        }
    }, {
        id: "rWLrZL8rP3K",
        displayName: "Guest User",
        userCredentials: {
            username: "guest"
        }
    },
];

const interpretations = [
    {
        id: "dQPY66FE8R4",
        mentions: [{
            created: "2018-06-15T11:19:34.980",
            username: "donor"
        }]
    },
    {
        id: "E83OzhfnCCK",
        mentions: [{
            created: "2018-06-15T11:19:07.737",
            username: "donor"
        },
        {
            created: "2018-06-15T11:19:07.737",
            username: "konan"
        }]
    },
];

const interpretationsWithComments = [
    {
        id: "E83OzhfnCCK",
        comments: [{
            mentions: [{
                created: "2018-06-15T10:05:31.731",
                username: "traore"
            }]
        }, {
            mentions: [{
                created: "2018-06-15T11:19:19.828",
                username: "konan"
            }]
        }]
    },
    {
        id: "xKwnFILzWxM",
        comments: [{
            mentions: [{
                created: "2018-06-12T10:32:52.484",
                username: "konan"
            }, {
                created: "2018-06-12T10:37:52.484",
                username: "bombali"
            }]
        }]
    },
];

const d2 = {
    currentUser: {
        id: "oXD88WWSQpR",
        username: "traore",
    },
    Api: {
        getApi: () => ({ 
            get: jest.fn(Promise.resolve({})) 
        }),
    },
};

const mockApiFetch = () => {
    const apiFetchStub = sinon.stub();

    apiFetchStub.withArgs(d2, "/users", "GET", {
        fields: "id,displayName,userCredentials[username]",
        order: "displayName:asc",
        paging: false,
    }).returns(Promise.resolve({users}));

    apiFetchStub.withArgs(d2, "/interpretations", "GET", {
        fields: "id,mentions",
        filter: [`user.id:eq:${d2.currentUser.id}`, "mentions:!null"],
        paging: false,
    }).returns(Promise.resolve({interpretations}));

    apiFetchStub.withArgs(d2, "/interpretations", "GET", {
        fields: "id,comments[mentions]",
        filter: [`comments.user.id:eq:${d2.currentUser.id}`, "comments.mentions.username:!null"],
        paging: false,
    }).returns(Promise.resolve({interpretations: interpretationsWithComments}));

    apiFetchStub.throws();

    api.apiFetch = apiFetchStub;
};

let mentions, allUsers, mostMentionedUsers;

describe("users helpers", () => {
    describe("getMentions", () => {
        beforeEach(() => {
            mockApiFetch();
            return getMentions(d2).then(_mentions => mentions = _mentions);
        });

        describe("property mostMentionedUsers", () => {
            beforeEach(() => {
                mostMentionedUsers = mentions ? mentions.mostMentionedUsers : null;
            });

            it("contains array with most mentioned users (except currentUser), sorted by ocurrences", () => {
                expect(mostMentionedUsers).toEqual([{
                    "displayName": "Didier Konan",
                    "id": "I9fMsY4pRKk",
                    "username": "konan"
                }, {
                    "displayName": "Donor User",
                    "id": "cddnwKV2gm9",
                    "username": "donor"
                }, {
                    "displayName": "Bombali District",
                    "id": "NOOF56dveaZ",
                    "username": "bombali"
                }]);
            });
        });

        describe("property allUsers", () => {
            beforeEach(() => {
                allUsers = mentions ? mentions.allUsers : null;
            });

            it("contains array with users not present in mostMentionedUsers, sorted alphabetically", () => {
                expect(allUsers).toEqual([{
                    id: 'rWLrZL8rP3K',
                    displayName: 'Guest User',
                    username: 'guest'
                }]);
            });
        });
    });
});
