import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { shallow } from 'enzyme';
import * as d2 from 'd2/lib/d2';
import D2UIApp from '../D2UIApp';

const identity = v => v;
const isNotEqualTo = (first) => (second) => first !== second;
const MyApp = () => (<div>My App</div>);

describe('D2UIApp component', () => {
    it('should render the MuiThemeProvider', () => {
        const component = shallow(
            <D2UIApp>
                <div>My App</div>
            </D2UIApp>
        );

       expect(component.type()).toBe(MuiThemeProvider);
    });

    it('should render the MuiThemeProvider with the default theme', () => {
        const component = shallow(
            <D2UIApp>
                <div>My App</div>
            </D2UIApp>
        );

        const muiProvided = component.prop('muiTheme');
        const muiExpected = getMuiTheme();

        // Somewhat convoluted way tp check for equal styles, but the prepareStyles function will fail the deep equal comparison.
        Object.keys(muiProvided)
            .filter(isNotEqualTo('prepareStyles'))
            .forEach(key => {
                expect(muiProvided[key]).toEqual(muiExpected[key]);
            });
    });

    it('should use the provided theme object as the muiTheme', () => {
        const providedTheme = { name: 'MyTheme' };

        const component = shallow(
            <D2UIApp muiTheme={providedTheme}>
                <div>My App</div>
            </D2UIApp>
        );

        expect(component.prop('muiTheme')).toBe(providedTheme);
    });

    it('should initially render a CircularProgress', () => {
        const promiseToD2 = new Promise(() => {});

        // Mock d2 init
        d2.init = jest.fn()
            .mockReturnValue(promiseToD2);

        const component = shallow(
            <D2UIApp>
                <MyApp />
            </D2UIApp>,
            { lifecycleExperimental: true }
        );

        expect(component.children().type()).toBe(CircularProgress);
    });

    it('should pass the passed initConfig to the d2 init function', () => {
        const promiseToD2 = new Promise(() => {});

        // Mock d2 init
        d2.init = jest.fn()
            .mockReturnValue(promiseToD2);

        shallow(
            <D2UIApp initConfig={{ baseUrl: 'http://play.dhis2.org/dev/api' }}>
                <MyApp />
            </D2UIApp>,
            { lifecycleExperimental: true }
        );

        expect(d2.init).toHaveBeenCalledWith({ baseUrl: 'http://play.dhis2.org/dev/api' });
    });

    it('should render the passed app component when d2 is finished initializing', () => {
        const expectedD2 = { currentUser: {}, models: {}, Api: {} };
        const promiseToD2 = Promise.resolve(expectedD2);

        // Mock d2 init
        d2.init = jest.fn()
            .mockReturnValue(promiseToD2);

        const component = shallow(
            <D2UIApp>
                <MyApp />
            </D2UIApp>,
            { lifecycleExperimental: true }
        );

        expect(component.children().type()).toBe(CircularProgress);

        return promiseToD2
            .then(() => {
                expect(component.children().type()).toBe(MyApp);
            });
    });

    it('should render an error box when d2 can not be initialized', (done) => {
        const promiseToD2 = Promise.reject('Unable to get schemas from the DHIS2 API');

        // Mock d2 init
        d2.init = jest.fn()
            .mockReturnValue(promiseToD2);

        const component = shallow(
            <D2UIApp>
                <MyApp />
            </D2UIApp>,
            { lifecycleExperimental: true }
        );

        expect(component.children().type()).toBe(CircularProgress);

        promiseToD2
            .catch(identity)
            .then(() => {
                expect(component.children().children().prop('message')).toBe('Unable to get schemas from the DHIS2 API');
                done();
            })
            .catch(done);
    });

    it('should return the d2 instance when calling getChildContext', (done) => {
        const expectedD2 = { currentUser: {}, models: {}, Api: {} };
        const promiseToD2 = Promise.resolve(expectedD2);

        // Mock d2 init
        d2.init = jest.fn()
            .mockReturnValue(promiseToD2);

        const component = shallow(
            <D2UIApp>
                <MyApp />
            </D2UIApp>,
            { lifecycleExperimental: true }
        );

        promiseToD2
            .then(() => {
                expect(component.instance().getChildContext()).toEqual({ d2: expectedD2 });
                done();
            })
            .catch(done);
    });

    it('should render the App component when the state is set', () => {
        const expectedD2 = { currentUser: {}, models: {}, Api: {} };
        const promiseToD2 = Promise.resolve(expectedD2);

        // Mock d2 init
        d2.init = jest.fn()
            .mockReturnValue(promiseToD2);

        const App = () => (<div>My App</div>);

        const component = shallow(
            <D2UIApp>
                <App />
            </D2UIApp>,
            { lifecycleExperimental: true }
        );

        return promiseToD2
            .catch(identity)
            .then(() => {
                expect(component.children().first().type()).toBe(App);
            });
    });
});
