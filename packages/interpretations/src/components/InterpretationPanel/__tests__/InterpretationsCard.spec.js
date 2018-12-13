import React from 'react';
import { shallow, mount } from 'enzyme';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';

import InterpretationsCard from '../InterpretationsCard';
import CollapsibleCard from '../../AnalyticObjectDetails/CollapsibleCard';
import NewInterpretation from '../../Interpretation/NewInterpretation';
import Interpretation from '../../Interpretation/OldInterpretation';
import { getStubContext, getMuiTheme } from '../../../../config/test-context';

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
        id: "LOECMJN3DRF",
        created: "2018-11-03T11:02:30.780",
        comments: [],
        user: {
                id: "xE7jOejl9FI",
                displayName: "John Traore"
            },
        text: 'test text',
    }, {
        id: "LqumKmXxc1k",
        created: "2018-11-03T11:02:30.780",
        comments: [],
        user: {
            id: "xE7jOejl9FI",
            displayName: "John Traore"
        },
        text: 'test text',
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

const childContextTypes = {d2: PropTypes.object, locale: () => null };

const renderComponent = (partialProps = {}, partialContext = {}) => {
    const baseProps = {
        model: favorite,
        currentInterpretationId: null,
        onChange: jest.fn(),
        onCurrentInterpretationChange: jest.fn(),
        classes: {},
    };

    const props = {...baseProps, ...partialProps};
    const context = getStubContext();
    const muiTheme = getMuiTheme();
    const fullContext = _.merge(context, partialContext);
    return mount(
        <MuiThemeProvider theme={muiTheme}>
            <InterpretationsCard {...props} />
        </MuiThemeProvider>,
        { context: fullContext, childContextTypes }
    );
};

const currentUser = {id: "xE7jOejl9FI", displayName: "John Traore"};

let interpretationsCard;
let newInterpretation;

describe('Interpretations: Interpretations -> InterpretationsCard component', () => {
    beforeEach(() => {
        interpretationsCard = renderComponent({}, {d2: {currentUser}});
    });

    describe("initial component", () => {
        it("should show a card", () => {
            expect(interpretationsCard.find(CollapsibleCard)).toExist();
        });

        it("should not show a NewInterpretaions component", () => {
            expect(interpretationsCard.find(NewInterpretation)).not.toExist();
        });
    });

    describe("controlled component", () => {
        describe("without current interpretation", () => {
            it("should show list of compact interpretations", () => {
                expect(interpretationsCard.find(Interpretation))
                    .toHaveLength(favorite.interpretations.length);
            });

            describe("when click new interpretation action", () => {
                beforeEach(() => {
                    interpretationsCard.find("button").find({title: "Write new interpretation"}).simulate("click");
                });

                it("should show a NewInterpretation component", () => {
                    expect(interpretationsCard.find(NewInterpretation)).toExist();
                });

                describe("when click on close", () => {
                    beforeEach(() => {
                        interpretationsCard.find(NewInterpretation).props().onClose();
                        interpretationsCard.update()
                    });

                    it("closes the NewInterpretation component", () => {
                        expect(interpretationsCard.find(NewInterpretation)).not.toExist();
                    });
                });

                describe("when click on save", () => {
                    beforeEach(() => {
                        newInterpretation = {
                            text: "New text",
                            save: jest.fn(() => Promise.resolve()),
                        };
                        return interpretationsCard.find(NewInterpretation).props().onSave(newInterpretation);
                    });

                    it("should notify change", () => {
                        const { onChange } = interpretationsCard.find(InterpretationsCard).instance().props;
                        expect(onChange).toHaveBeenCalledWith();
                    });
                });
            });

            describe("when existing interpretation clicked", () => {
                beforeEach(() => {
                    interpretationsCard.find(Interpretation).at(0).simulate("click");
                    interpretationsCard.update();
                });

                it("should call the current interpretation prop", () => {
                    const interpretation = interpretationsCard.find("Interpretation").at(0).prop("interpretation");
                    const { onCurrentInterpretationChange } = interpretationsCard.find("InterpretationsCard").instance().props;
                    expect(onCurrentInterpretationChange).toBeCalledWith(interpretation);
                });
            });
        });

        describe("with special string 'new' as current interpretation", () => {
            beforeEach(() => {
                const currentInterpretationId = "new";
                interpretationsCard = renderComponent({currentInterpretationId}, {d2: {currentUser}});
            });
            
            it("should show a NewInterpretation component", () => {
                expect(interpretationsCard.find(NewInterpretation)).toExist();
            });
        });

        describe("with ID as current interpretation", () => {
            beforeEach(() => {
                const currentInterpretationId = favorite.interpretations[0].id;
                interpretationsCard = renderComponent({currentInterpretationId}, {d2: {currentUser}});
            });

            it("should show only current interpretation", () => {
                expect(interpretationsCard.find(Interpretation)).toHaveLength(1);
            });

            it("should call the current interpretation prop", () => {
                const interpretation = interpretationsCard.find(Interpretation).at(0).prop("interpretation");
                const { onCurrentInterpretationChange } = interpretationsCard.find(InterpretationsCard).instance().props;
                expect(onCurrentInterpretationChange).toBeCalledWith(interpretation);
            });

            describe("when click on back action", () => {
                beforeEach(() => {
                    interpretationsCard.find("button").find({title: "Clear interpretation"}).simulate("click");
                });

                it("should call current interpretation prop with no interpretation", () => {
                    const { onCurrentInterpretationChange } = interpretationsCard.find(InterpretationsCard).instance().props;
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
                    interpretationsCard.find(Interpretation).at(0).simulate("click");
                    interpretationsCard.update();
                });

                it("should show the interpretation", () => {
                    const interpretation = interpretationsCard.find(Interpretation).at(0).prop("interpretation");
                    expect(interpretationsCard.find(Interpretation).find({interpretation, extended: true})).toExist();
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
                    interpretationsCard.find("button").find({title: "Clear interpretation"}).simulate("click");
                    interpretationsCard.update();
                });

                it("should show the interpretation list", () => {
                    expect(interpretationsCard.find(Interpretation))
                        .toHaveLength(favorite.interpretations.length);
                });
            });
        });
    });
});
