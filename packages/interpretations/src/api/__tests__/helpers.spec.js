import merge from 'lodash/merge';
import every from 'lodash/every';
import { getFavoriteWithInterpretations } from '../helpers';
import Interpretation from '../../models/interpretation';
import { getStubContext } from '../../../config/test-context';
import * as users from '../users';

const context = getStubContext();
const map = {id: "1", name: "My favorite", interpretations: [{id: "int1"}]};
const mockedViews = 5;

let d2, getApiGetMock, favorite;

const initD2 = () => {
    getApiGetMock = jest.fn(() => Promise.resolve({views: mockedViews}));
    users.getMentions = jest.fn(() => Promise.resolve({allUsers: [], mostMentionedUsers: []}));

    d2 = merge(context.d2, {
        models: {
            maps: {
                get: jest.fn(() => map),
            },
        },
        Api: {
            getApi: () => ({
                get: getApiGetMock,
            }),
        },
    });

    return {d2, getApiGetMock};
};

describe("getFavoriteWithInterpretations", () => {
    beforeEach(() => {
        initD2();

        return getFavoriteWithInterpretations(d2, "map", "1")
            .then(_favorite => { favorite = _favorite; });
    });

    describe("api calls", () => {
        it("should call the model D2 get with the required fields", () => {
            const expectedFields = "id,name,href,subscribed,user[id,firstName,surname,displayName],displayName,description,displayDescription," +
                "created,lastUpdated,access,publicAccess,externalAccess,userAccesses,userGroupAccesses," +
                "interpretations[id,user[id,firstName,surname,displayName,userCredentials[username]],created,lastUpdated,likes,likedBy[id,displayName]," +
                "text,publicAccess,externalAccess,userAccesses,userGroupAccesses,comments[id,text,created,lastUpdated,user[id,firstName,surname,displayName,userCredentials[username]]]]";
            expect(d2.models.maps.get).toBeCalledWith("1", {fields: expectedFields});
        });

        it("should call the views statistics API", () => {
            expect(getApiGetMock).toBeCalledWith("dataStatistics/favorites/1");
        });
    });

    describe("returned favorite", () => {
        it("should have fields returned by D2", () => {
            expect(favorite.id).toEqual("1");
            expect(favorite.name).toEqual("My favorite");
        });

        it("should have new field modelName", () => {
            expect(favorite.modelName).toEqual("map");
        });


        it("should have new field favoriteViews", () => {
            expect(favorite.favoriteViews).toEqual(mockedViews);
        });

        it("should have wrapped interpretations", () => {
            expect(favorite.interpretations).toHaveLength(favorite.interpretations.length);
            every(favorite.interpretations, interpretation => expect(interpretation).toBeInstanceOf(Interpretation));
        });
    });
});
