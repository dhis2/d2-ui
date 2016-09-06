import React from 'react';
import TextField from 'material-ui/TextField/TextField';
import AutoComplete from '../../src/auto-complete/AutoComplete.component';
import Action from '../../src/action/Action';
import Rx from 'rx';
import d2 from 'd2/lib/d2';
import log from 'loglevel';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Paper from 'material-ui/Paper/Paper';

import {shallow} from 'enzyme';

describe('AutoComplete: AutoComplete component', () => {
    function renderComponent(props = {}) {
        return shallow(
            <AutoComplete {...Object.assign({contextMenuActions: {}}, props)} />,
            {
                context: {
                    d2: {
                        i18n: {
                            getTranslation(key) {
                                return `${key}_translated`;
                            },
                        },
                    },
                },
            }
        );
    }

    beforeEach(() => {
        stub(log, 'warn');
    });

    afterEach(() => {
        log.warn.restore();
    });

    it('should render a TextField', () => {
        const autoCompleteComponent = renderComponent();

        expect(autoCompleteComponent.find(TextField)).to.have.length(1);
    });

    it('should pass the props onto the textfield', () => {
        const autoCompleteComponent = renderComponent({
            name: 'MyName',
            someRandomProp: 'SomeValue',
        });
        const textFieldComponent = autoCompleteComponent.find(TextField);

        expect(textFieldComponent.props().name).to.equal('MyName');
        expect(textFieldComponent.props().someRandomProp).to.equal('SomeValue');
    });

    it('should have the translated value as hintText', () => {
        const autoCompleteComponent = renderComponent();
        const searchField = autoCompleteComponent.find(TextField);

        expect(searchField.props().hintText).to.equal('search_for_user_groups_translated');
    });

    it('should call the loadAutoCompleteSuggestions action on change', () => {
        const actions = Action.createActionsFromNames(['loadAutoCompleteSuggestions']);
        stub(actions, 'loadAutoCompleteSuggestions');

        const autoCompleteComponent = renderComponent({actions});
        const testFieldComponent = autoCompleteComponent.find(TextField);

        testFieldComponent.simulate('change');

        expect(actions.loadAutoCompleteSuggestions).to.be.called;
    });

    describe('observable eventstream for textbox', () => {
        let actions;
        let testScheduler;
        let fakeEvent;
        let autoCompleteComponent;
        let d2Mock;
        let getDataElementList;

        beforeEach(() => {
            global.document = {};
            actions = Action.createActionsFromNames(['loadAutoCompleteSuggestions']);

            testScheduler = new Rx.TestScheduler();

            fakeEvent = {
                target: {
                    value: 'Hel',
                },
            };

            spy(AutoComplete.prototype, 'setState');

            getDataElementList = stub().returns(Promise.resolve({
                toArray: stub().returns([
                    {name: 'Hello1'},
                    {name: 'HelloHello'},
                    {name: 'BonjourHello1'},
                    {name: 'BonjourHello3'},
                    {name: 'HoiHello1'},
                    {name: 'HoiHello2'},
                ]),
            }));
            d2Mock = {
                models: {
                    dataElement: {
                        filter: stub().returns({
                            on: stub().returns({
                                ilike: stub().returns({
                                    list: getDataElementList,
                                }),
                            }),
                        }),
                    },
                },
            };

            stub(d2, 'getInstance').returns(Promise.resolve(d2Mock));
        });

        afterEach(() => {
            autoCompleteComponent.instance().setState.reset();
            autoCompleteComponent.instance().setState.restore();
        });

        it('should debounce the input from the inputbox', () => {
            autoCompleteComponent = renderComponent({actions, scheduler: testScheduler, debounceTime: 12, forType: 'dataElement'});

            actions.loadAutoCompleteSuggestions(fakeEvent);

            testScheduler.schedule(5, () => actions.loadAutoCompleteSuggestions(fakeEvent));

            fakeEvent.target.value = 'Hello!';

            testScheduler.schedule(15, () => actions.loadAutoCompleteSuggestions(fakeEvent));
            testScheduler.advanceTo(26);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        expect(autoCompleteComponent.instance().setState).to.be.calledWith({
                            loadingSuggestions: true,
                            showAutoComplete: true,
                        });
                        expect(autoCompleteComponent.instance().setState).to.be.calledWith({
                            autoCompleteValues: [
                                {name: 'Hello1'},
                                {name: 'HelloHello'},
                                {name: 'BonjourHello1'},
                                {name: 'BonjourHello3'},
                                {name: 'HoiHello1'},
                            ],
                            loadingSuggestions: false,
                        });
                        expect(autoCompleteComponent.instance().setState.withArgs({
                            autoCompleteValues: [
                                {name: 'Hello1'},
                                {name: 'HelloHello'},
                                {name: 'BonjourHello1'},
                                {name: 'BonjourHello3'},
                                {name: 'HoiHello1'},
                            ],
                            loadingSuggestions: false,
                        })).to.have.callCount(1);
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                }, 26);
            });
        });

        it('should apply extra filtering using the filterForSuggestions prop', () => {
            const filterForSuggestions = stub();

            filterForSuggestions.returns(false);
            filterForSuggestions.onFirstCall().returns(true);
            filterForSuggestions.onSecondCall().returns(false);
            filterForSuggestions.onThirdCall().returns(true);

            autoCompleteComponent = renderComponent({
                actions,
                scheduler: testScheduler,
                debounceTime: 12,
                forType: 'dataElement',
                filterForSuggestions,
            });

            actions.loadAutoCompleteSuggestions(fakeEvent);

            testScheduler.schedule(5, () => actions.loadAutoCompleteSuggestions(fakeEvent));

            fakeEvent.target.value = 'Hello!';

            testScheduler.schedule(15, () => actions.loadAutoCompleteSuggestions(fakeEvent));
            testScheduler.advanceTo(26);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        expect(autoCompleteComponent.instance().setState).to.be.calledWith({
                            loadingSuggestions: true,
                            showAutoComplete: true,
                        });
                        expect(autoCompleteComponent.instance().setState).to.be.calledWith({
                            autoCompleteValues: [
                                {name: 'Hello1'},
                                {name: 'BonjourHello1'},
                            ],
                            loadingSuggestions: false,
                        });
                        expect(autoCompleteComponent.instance().setState.withArgs({
                            autoCompleteValues: [
                                {name: 'Hello1'},
                                {name: 'BonjourHello1'},
                            ],
                            loadingSuggestions: false,
                        })).to.have.callCount(1);
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                }, 55);
            });
        });

        it('should log an error when the query fails to return a response', () => {
            stub(log, 'error');
            getDataElementList.returns(Promise.reject('Unable to load schemas'));

            autoCompleteComponent = renderComponent({actions, scheduler: testScheduler, debounceTime: 12, forType: 'dataElement'});

            actions.loadAutoCompleteSuggestions(fakeEvent);
            testScheduler.advanceTo(26);

            return new Promise((resolve) => {
                setTimeout(() => {
                    expect(log.error).to.be.calledWith('Unable to load schemas');
                    resolve();
                }, 26);
            });
        });

        // FIXME: Volatile test
        xit('should always return an empty array when no type has been set', () => {
            autoCompleteComponent = renderComponent({actions, scheduler: testScheduler, debounceTime: 12});

            actions.loadAutoCompleteSuggestions(fakeEvent);

            return new Promise((resolve) => {
                setTimeout(() => {
                    expect(autoCompleteComponent.instance().setState.withArgs({
                        autoCompleteValues: [],
                        loadingSuggestions: false,
                    })).to.have.callCount(1);

                    expect(log.warn).to.be.calledWith('forType property and value should be provided to be able to show results');

                    resolve();

                }, 26);
            });
        });

        // FIXME: Volatile test
        xit('should render the suggestions when they have been returned', () => {
            autoCompleteComponent = renderComponent({
                actions,
                scheduler: testScheduler,
                debounceTime: 12,
                forType: 'dataElement',
            });

            actions.loadAutoCompleteSuggestions(fakeEvent);

            return new Promise((resolve) => {
                setTimeout(() => {
                    autoCompleteComponent.update();
                    expect(autoCompleteComponent.find(Paper).find(List).find(ListItem)).to.have.length(5);
                    resolve();
                }, 26);
            });
        });

        // FIXME: Volatile test
        xit('should call the onSuggestionClick function when an item is clicked', () => {
            autoCompleteComponent = renderComponent({
                actions,
                scheduler: testScheduler,
                debounceTime: 12,
                forType: 'dataElement',
            });

            stub(autoCompleteComponent.instance(), 'onSuggestionClick');

            actions.loadAutoCompleteSuggestions(fakeEvent);

            return new Promise((resolve) => {
                setTimeout(() => {
                    autoCompleteComponent.update();
                    const firstItem = autoCompleteComponent.find(Paper).find(List).find(ListItem).first();

                    firstItem.simulate('click');

                    expect(autoCompleteComponent.instance().onSuggestionClick).to.be.called;
                    resolve();
                }, 26);
            });
        });
    });

    it('should cleanup the observable', () => {
        const autoCompleteComponent = renderComponent({forType: 'user'});

        expect(autoCompleteComponent.instance().disposable).not.to.be.undefined;

        spy(autoCompleteComponent.instance().disposable, 'dispose');
        autoCompleteComponent.instance().componentWillUnmount();

        expect(autoCompleteComponent.instance().disposable.dispose).to.be.calledOnce;
    });

    describe('onSuggestionClick', () => {
        let autoCompleteComponent;
        let fakeEvent;

        beforeEach(() => {
            // TODO: Perhaps render to the real DOM as this seems like a hack.
            global.document = {};
            const actions = Action.createActionsFromNames(['loadAutoCompleteSuggestions']);

            autoCompleteComponent = renderComponent({forType: 'user', actions});
            autoCompleteComponent.instance().refs = {
                autoCompleteField: {
                    focus: stub(),
                    setValue: stub(),
                },
            };

            fakeEvent = sinon.mock();
        });

        it('should call focus on the autoComplete field reference by default', () => {
            autoCompleteComponent.instance().onSuggestionClick({name: 'Administrators'})(fakeEvent);

            expect(autoCompleteComponent.instance().refs.autoCompleteField.focus).to.be.calledOnce;
        });

        it('should call setValue to reset the value on the autocComplete field reference by default', () => {
            autoCompleteComponent.instance().onSuggestionClick({name: 'Administrators'})(fakeEvent);

            expect(autoCompleteComponent.instance().refs.autoCompleteField.setValue).to.be.calledOnce;
        });

        it('should not call focus when the `closeOnItemClicked` property contains a falsy value', () => {
            autoCompleteComponent.setProps({closeOnItemClicked: false});

            autoCompleteComponent.instance().onSuggestionClick({name: 'Administrators'})(fakeEvent);

            expect(autoCompleteComponent.instance().refs.autoCompleteField.focus).not.to.be.called;
        });

        it('should not call setValue when `clearValueOnItemClicked` is set to a falsy value', () => {
            autoCompleteComponent.setProps({clearValueOnItemClicked: false});

            autoCompleteComponent.instance().onSuggestionClick({name: 'Administrators'})(fakeEvent);

            expect(autoCompleteComponent.instance().refs.autoCompleteField.setValue).not.to.be.calledOnce;
        });

        it('should call `onSuggestionClicked` callback function when an item was clicked', () => {
            const onSuggestionClicked = stub();

            autoCompleteComponent.setProps({onSuggestionClicked});

            autoCompleteComponent.instance().onSuggestionClick({name: 'Administrators'})(fakeEvent);

            expect(onSuggestionClicked).to.be.calledWith({name: 'Administrators'}, fakeEvent);
        });
    });
});
