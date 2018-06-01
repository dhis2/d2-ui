import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import InterpretationsCard from '../InterpretationsCard';
import { getStubContext } from '../../../../../../config/inject-theme';

const context = getStubContext();

const favorite = {
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

const renderComponent = (partialProps = {}, partialContext = {}) => {
    const baseProps = {
        model: favorite,
        currentInterpretationId: null,
        onChange: jest.fn(),
        onCurrentInterpretationChange: jest.fn(),
    };

    const props = {...baseProps, ...partialProps};
    const fullContext = _.merge(context, partialContext);
    return shallow(<InterpretationsCard {...props} />, { context: fullContext });
};

const currentUser = {id: "xE7jOejl9FI", displayName: "John Traore"};

let interpretationsCard;
let newInterpretation;

describe('Interpretations: Interpretations -> InterpretationsCard component', () => {
    beforeEach(() => {
        interpretationsCard = renderComponent({}, {d2: {currentUser}});
    });

    describe("initial component", () => {
        it("should show an expanded card", () => {
            expect(interpretationsCard.find("Card").find({expanded: true})).toExist();
        });

        it("should not show an interpretations dialog", () => {
            expect(interpretationsCard.find("InterpretationDialog")).not.toExist();
        });
    });

    describe("controlled component", () => {
        describe("without current interpretation", () => {
            it("should show list of compact interpretations", () => {
                expect(interpretationsCard.find("Interpretation").find({extended: false}))
                    .toHaveLength(favorite.interpretations.length);
            });

            describe("when click new interpretation action", () => {
                beforeEach(() => {
                    interpretationsCard.find("IconButton").find({tooltip: "write_new_interpretation_translated"}).simulate("click");
                });

                it("should show an interpretations dialog", () => {
                    expect(interpretationsCard.find("InterpretationDialog")).toExist();
                });

                describe("when dialog close", () => {
                    beforeEach(() => {
                        interpretationsCard.find("InterpretationDialog").props().onClose();
                        interpretationsCard.update()
                    });

                    it("closes the dialog", () => {
                        expect(interpretationsCard.find("InterpretationDialog")).not.toExist();
                    });
                });

                describe("when dialog save", () => {
                    beforeEach(() => {
                        newInterpretation = {
                            text: "New text",
                            save: jest.fn(() => Promise.resolve()),
                        };
                        interpretationsCard.find("InterpretationDialog").props().onSave(newInterpretation);
                        interpretationsCard.update()
                    });

                    it("closes the dialog", () => {
                        expect(interpretationsCard.find("InterpretationDialog")).not.toExist();
                    });

                    it("should save the interpretation", () => {
                        expect(newInterpretation.save).toHaveBeenCalled();
                    });

                    it("should notify change", () => {
                        const { onChange } = interpretationsCard.instance().props;
                        expect(onChange).toHaveBeenCalledWith();
                    });
                });
            });

            describe("when existing interpretation clicked", () => {
                beforeEach(() => {
                    interpretationsCard.find(".interpretation-box").at(0).simulate("click");
                    interpretationsCard.update();
                });

                it("should call the current interpretation prop", () => {
                    const interpretation = interpretationsCard.find("Interpretation").at(0).prop("interpretation");
                    const { onCurrentInterpretationChange } = interpretationsCard.instance().props;
                    expect(onCurrentInterpretationChange).toBeCalledWith(interpretation);
                });
            });
        });

        describe("with special string 'new' as current interpretation", () => {
            beforeEach(() => {
                const currentInterpretationId = "new";
                interpretationsCard = renderComponent({currentInterpretationId}, {d2: {currentUser}});
            });
            
            it("should show a new interpretations dialog", () => {
                expect(interpretationsCard.find("InterpretationDialog")).toExist();
            });
        });

        describe("with ID as current interpretation", () => {
            beforeEach(() => {
                const currentInterpretationId = favorite.interpretations[0].id;
                interpretationsCard = renderComponent({currentInterpretationId}, {d2: {currentUser}});
            });
            
            it("should show only current interpretation", () => {
                expect(interpretationsCard.find("Interpretation").find({extended: true})).toHaveLength(1);
            });

            describe("when click on back action", () => {
                beforeEach(() => {
                    interpretationsCard.find("IconButton").find({tooltip: "clear_interpretation_translated"}).simulate("click");
                });

                it("should call current interpretation prop with no interpretation", () => {
                    const { onCurrentInterpretationChange } = interpretationsCard.instance().props;
                    expect(onCurrentInterpretationChange).toBeCalledWith(null);
                });
            });
        });
    });

    describe("uncontrolled component", () => {
        describe("without current interpretation", () => {
            beforeEach(() => {
                interpretationsCard = renderComponent({onCurrentInterpretationChange: null}, {d2: {currentUser}});
            });

            describe("when existing interpretation clicked", () => {
                beforeEach(() => {
                    interpretationsCard.find(".interpretation-box").at(0).simulate("click");
                    interpretationsCard.update();
                });

                it("should show the interpretation", () => {
                    const interpretation = interpretationsCard.find("Interpretation").at(0).prop("interpretation");
                    expect(interpretationsCard.find("Interpretation").find({interpretation, extended: true})).toExist();
                });
            });
        });

        describe("with current interpretation", () => {
            beforeEach(() => {
                const currentInterpretationId = favorite.interpretations[0].id;
                const props = {onCurrentInterpretationChange: null, currentInterpretationId};
                interpretationsCard = renderComponent(props, {d2: {currentUser}});
            });

            describe("when back button clicked", () => {
                beforeEach(() => {
                    interpretationsCard.find("IconButton").find({tooltip: "clear_interpretation_translated"}).simulate("click");
                    interpretationsCard.update();
                });

                it("should show the interpretation list", () => {
                    expect(interpretationsCard.find("Interpretation").find({extended: false}))
                        .toHaveLength(favorite.interpretations.length);
                });
            });
        });
    });
});
