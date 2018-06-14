import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import Interpretation from '../Interpretation';
import { getStubContext } from '../../../../../../config/inject-theme';

const context = getStubContext();

const interpretation = {
    name: "LOECMJN3DRF",
    id: "LOECMJN3DRF",
    likes: 2,
    text: "Some interpretation",
    created: "2018-04-14T12:00:47.096",
    user: {
        id: "xE7jOejl9FI",
        displayName: "John Traore"
    },
    likedBy: [
        {
            id: "gdfdRRxx112",
            displayName: "Kevin Boateng",
        },
        {
            id: "vDFwDfe16Gr",
            displayName: "Manuel Perez",
        },
    ],
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
    like: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
};

const renderComponent = (partialProps = {}, partialContext = {}) => {
    const baseProps = {
        interpretation: interpretation,
        onChange: jest.fn(),
        extended: false,
    };

    const props = {...baseProps, ...partialProps};
    const fullContext = _.merge(context, partialContext);
    return shallow(<Interpretation {...props} />, { context: fullContext });
};

let interpretationComponent;
let currentUser;

const commonExpectations = () => {
    it('should show the author with a link', () => {
        const link = interpretationComponent.find("a.author");
        expect(link.text()).toMatch(interpretation.user.displayName);
        expect(link.prop("href")).toMatch(interpretation.user.id);
    });

    it('should show the creation date', () => {
        expect(interpretationComponent.text()).toMatch("4/14/2018");
    });

    it('should show how many people like it', () => {
        const count = interpretation.likedBy.length;
        expect(interpretationComponent.text()).toMatch(`${count} people like this`);
    });

    it('should show who likes it', () => {
        const names = interpretation.likedBy.map(user => user.displayName).join('\n');
        expect(interpretationComponent.find(".liked-by")).toHaveProp("title", names);
    });

    it('should show how many comments it has', () => {
        const count = interpretation.comments.length;
        expect(interpretationComponent.text()).toMatch(`${count} people commented`);
    });
};

describe('Interpretations: Interpretations -> Interpretation component', () => {
    beforeEach(() => {
        currentUser = {id: "xE7jOejl9FI", displayName: "John Traore"};
    });

    describe("compact view", () => {
        beforeEach(() => {
            interpretationComponent = renderComponent({extended: false}, {d2: {currentUser}});
        });

        commonExpectations();

        it("should not show actions", () => {
            expect(interpretationComponent.find(".actions")).not.toExist();
        });

        it("should not show comments", () => {
            expect(interpretationComponent.find("InterpretationComments")).not.toExist();
        });
    });


    describe("extended view", () => {
        beforeEach(() => {
            interpretationComponent = renderComponent({extended: true}, {d2: {currentUser}});
        });

        commonExpectations();

        it("should show actions", () => {
            expect(interpretationComponent.find(".actions")).toExist();
        });

        it("should show comments", () => {
            expect(interpretationComponent.find("InterpretationComments")).toExist();
        });

        describe('not liked by current user', () => {
            beforeEach(() => {
                currentUser = {id: "kf34GLJED33", displayName: "Nelson Mandela"};
                interpretationComponent = renderComponent({extended: true}, {d2: {currentUser}});
            });

            it("should show like action", () => {
                expect(interpretationComponent.find("Link").find({label: "Like"})).toExist();
            });

            describe('when like is clicked', () => {
                beforeEach(() => {
                    interpretationComponent.find("Link").find({label: "Like"}).simulate("click");
                });

                it("should like interpretation", () => {
                    expect(interpretation.like).toHaveBeenCalledWith(true);
                });

                it("should notify change", () => {
                    const { onChange } = interpretationComponent.instance().props;
                    expect(onChange).toHaveBeenCalledWith(interpretation);
                });
            });
        });

        describe('liked by current user', () => {
            beforeEach(() => {
                currentUser = {id: "gdfdRRxx112", displayName: "Kevin Boateng"};
                interpretationComponent = renderComponent({extended: true}, {d2: {currentUser}});
            });

            it("should show unlike action", () => {
                expect(interpretationComponent.find("Link").find({label: "Unlike"})).toExist();
            });

            describe('when unlike is clicked', () => {
                beforeEach(() => {
                    interpretationComponent.find("Link").find({label: "Unlike"}).simulate("click");
                });

                it("should unlike interpretation", () => {
                    expect(interpretation.like).toHaveBeenCalledWith(false);
                });

                it("should notify change", () => {
                    const { onChange } = interpretationComponent.instance().props;
                    expect(onChange).toHaveBeenCalledWith(interpretation);
                });
            });
        });

        describe("owner actions", () => {
            describe("interpretation owned by current user", () => {
                beforeEach(() => {
                    currentUser = {id: "xE7jOejl9FI", displayName: "John Traore"};
                    interpretationComponent = renderComponent({extended: true}, {d2: {currentUser}});
                });

                it("should show an edit action", () => {
                    expect(interpretationComponent.find("Link").find({label: "Edit"})).toExist();
                });

                it("should show a delete action", () => {
                    expect(interpretationComponent.find("Link").find({label: "Delete"})).toExist();
                });

                describe("when edit action clicked", () => {
                    beforeEach(() => {
                        interpretationComponent.find("Link").find({label: "Edit"}).simulate("click");
                        interpretationComponent.update();
                    });

                    it("should open a InterpretationDialog", () => {
                        expect(interpretationComponent.find("InterpretationDialog")).toExist();
                    });
                });

                describe("when delete action clicked", () => {
                    beforeEach(() => {
                        window.confirm = jest.fn(() => true);
                        interpretationComponent.find("Link").find({label: "Delete"}).simulate("click");
                        interpretationComponent.update();
                    });

                    it("should ask confirmation", () => {
                        expect(window.confirm).toHaveBeenCalled();
                    });

                    it("should delete interpretation", () => {
                        expect(interpretation.delete).toHaveBeenCalledWith();
                    });

                    it("should notify change with a null object", () => {
                        const { onChange } = interpretationComponent.instance().props;
                        expect(onChange).toHaveBeenCalledWith(null);
                    });
                });
            });

            describe("interpretation not owned by current user", () => {
                beforeEach(() => {
                    currentUser = {id: "gdfdRRxx112", displayName: "Kevin Boateng"};
                    interpretationComponent = renderComponent({extended: true}, {d2: {currentUser}});
                });

                it("should not show an edit action", () => {
                    expect(interpretationComponent.find("Link").find({label: "Edit"})).not.toExist();
                });

                it("should not show a delete action", () => {
                    expect(interpretationComponent.find("Link").find({label: "Delete"})).not.toExist();
                });
            });
        });
    });
});
