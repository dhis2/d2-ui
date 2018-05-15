import _ from 'lodash';
import { getFavoriteWithInterpretations } from '../helpers';
import Intepretation from '../interpretation';
import { getStubContext } from '../../../../../config/inject-theme';

const context = getStubContext();
const map = {id: "1", name: "My favorite", interpretations: [{id: "int1"}]};
const mockedViews = 5;

let d2, getApiGetMock, favorite;

const initD2 = () => {
    getApiGetMock = jest.fn(() => Promise.resolve({views: mockedViews}));

    d2 = _.merge(context.d2, {
        models: {
            map: {get: jest.fn(() => map)},
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
            const expectedFields = "id,name,href,user[id,displayName],displayName,description," +
                "created,lastUpdated,access,publicAccess,userGroupAccesses," +
                "interpretations[id,user[id,displayName],created,likes,likedBy[id,displayName],"
                + "text,comments[id,text,created,user[id,displayName]]]";
            expect(d2.models.map.get).toBeCalledWith("1", {fields: expectedFields});
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

        it("should have favoriteViews", () => {
            expect(favorite.favoriteViews).toEqual(mockedViews);
        });

        it("should have wrapped interpretations", () => {
            expect(favorite.interpretations).toHaveLength(favorite.interpretations.length);
            _(favorite.interpretations)
                .every(interpretation => expect(interpretation).toBeInstanceOf(Intepretation));
        });
    });
});