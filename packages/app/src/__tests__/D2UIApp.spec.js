import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { shallow } from 'enzyme';
import D2UIApp from '../D2UIApp';

const identity = v => v;
const isNotEqualTo = first => second => first !== second;
const MyApp = () => (<div>My App</div>);
const d2 = {};

describe('D2UIApp component', () => {
    it('should render the MuiThemeProvider', () => {
        const component = shallow(
            <D2UIApp d2={d2}>
                <div>My App</div>
            </D2UIApp>,
        );

        expect(component.type()).toBe(MuiThemeProvider);
    });

    it('should render the MuiThemeProvider with the default theme', () => {
        const component = shallow(
            <D2UIApp d2={d2}>
                <div>My App</div>
            </D2UIApp>,
        );

        const muiProvided = component.prop('muiTheme');
        const muiExpected = getMuiTheme();

        // Somewhat convoluted way tp check for equal styles, but the prepareStyles function will fail the deep equal comparison.
        Object.keys(muiProvided)
            .filter(isNotEqualTo('prepareStyles'))
            .forEach((key) => {
                expect(muiProvided[key]).toEqual(muiExpected[key]);
            });
    });

    it('should use the provided theme object as the muiTheme', () => {
        const providedTheme = { name: 'MyTheme' };

        const component = shallow(
            <D2UIApp d2={d2} muiTheme={providedTheme}>
                <div>My App</div>
            </D2UIApp>,
        );

        expect(component.prop('muiTheme')).toBe(providedTheme);
    });
});
