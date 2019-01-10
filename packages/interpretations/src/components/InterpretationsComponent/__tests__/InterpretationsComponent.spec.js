import React from 'react';
import { shallow } from 'enzyme';
import { InterpretationsComponent } from '../InterpretationsComponent';
import InterpretationsCard from '../../Cards/InterpretationsCard';
import { getStubContext } from '../../../../config/test-context';
import * as helpers from '../../../api/helpers';

const context = getStubContext();

const map = {
    lastUpdated: "2018-05-11T12:57:25.365",
    id: "zDP78aJU8nX",
    href: "http://localhost:8029/api/maps/zDP78aJU8nX",
    created: "2018-05-07T11:53:17.999",
    name: "ANC: 1st visit coverage (%) by district last year",
    displayName: "ANC: 1st visit coverage (%) by district last year",
    publicAccess: "r-------",
    description: "Some Description",
    externalAccess: false,
    displayDescription: "Description3",
    favorite: false,
    access: {
        read: true,
        update: true,
        externalize: true,
        delete: true,
        write: true,
        manage: true
    },
    lastUpdatedBy: {
        id: "xE7jOejl9FI"
    },
    user: {
        id: "xE7jOejl9FI",
        displayName: "John Traore"
    },
    favorites: [],
    translations: [],
    mapViews: [],
    interpretations: [{
        id: "LOECMJN3DRF"
    }, {
        id: "LqumKmXxc1k"
    }],
    userGroupAccesses: [
        {
            access: "rw------",
            userGroupUid: "wl5cDMuUhmF",
            displayName: "Administrators",
            id: "wl5cDMuUhmF"
        }
    ],
    attributeValues: [],
    userAccesses: [],
    modelDefinition: {name: "map"},
    favoriteViews: 5,
};

const favorite = map;

const renderComponent = (partialProps = {}) => {
    const baseProps = {
        d2: context.d2,
        type: "map",
        id: "zDP78aJU8nX",
        currentInterpretationId: null,
        onChange: jest.fn(),
        onCurrentInterpretationChange: jest.fn(),
        classes: {},
    };
    helpers.getFavoriteWithInterpretations = jest.fn(() => Promise.resolve(map));

    const props = {...baseProps, ...partialProps};
    return shallow(<InterpretationsComponent {...props} />);
};

let interpretationsComponent;

describe('Interpretations: Interpretations component', () => {
    beforeEach(() => {
        interpretationsComponent = renderComponent();
    });

    it("should load model", () => {
        expect(helpers.getFavoriteWithInterpretations).toBeCalledWith(context.d2, "map", "zDP78aJU8nX")
    });

    describe("details card", () => {
        it("should be shown", () => {
            interpretationsComponent.update();
            expect(interpretationsComponent.find("Details")).toExist();
        });

        it("should have favorite as model", () => {
            interpretationsComponent.update();
            const details = interpretationsComponent.find("Details");
            expect(details).toHaveProp("model", favorite);
        });
    });

    describe("interpretations card", () => {
        it("should show the interpretations card", () => {
            interpretationsComponent.update();
            expect(interpretationsComponent.find(InterpretationsCard)).toExist();
        });

        it("should have favorite as model", () => {
            interpretationsComponent.update();
            const details= interpretationsComponent.find(InterpretationsCard);
            expect(details).toHaveProp("model", favorite);
        });

        describe("on a request to change current interpretation", () => {
            beforeEach(() => {
                interpretationsComponent.update();
                interpretationsComponent.find(InterpretationsCard).props().onCurrentInterpretationChange("new-interpretation");
            });

            it("should forward request to parent", () => {
                const { onCurrentInterpretationChange } = interpretationsComponent.instance().props;
                expect(onCurrentInterpretationChange).toBeCalledWith("new-interpretation");
            });
        });

        describe("on change event", () => {
            beforeEach(() => {
                interpretationsComponent.update();
                return interpretationsComponent.find(InterpretationsCard).props().onChange();
            });

            it("should forward request to parent", () => {
                const { onChange } = interpretationsComponent.instance().props;
                return expect(onChange).toBeCalledWith(favorite);
            });
        });

        describe("change of prop type", () => {
            beforeEach(() => {
                interpretationsComponent.setProps({type: "chart"});
            });

            it("should reload new model", () => {
                expect(helpers.getFavoriteWithInterpretations).toBeCalledWith(context.d2, "chart", "zDP78aJU8nX")
            });
        });

        describe("change of prop id", () => {
            beforeEach(() => {
                interpretationsComponent.setProps({id: "hR4gkeEfe12"});
            });

            it("should reload new model", () => {
                expect(helpers.getFavoriteWithInterpretations).toBeCalledWith(context.d2, "map", "hR4gkeEfe12")
            });
        });

        describe("change of prop lastUpdated", () => {
            beforeEach(() => {
                interpretationsComponent.setProps({lastUpdated: "2018-05-11T12:59:45.165"});
            });

            it("should reload new model", () => {
                expect(helpers.getFavoriteWithInterpretations).toBeCalledWith(context.d2, "map", "zDP78aJU8nX")
            });
        });
    });
});
