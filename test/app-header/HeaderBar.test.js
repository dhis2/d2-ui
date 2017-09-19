import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../config/inject-theme';
import HeaderBar from '../../src/app-header/HeaderBar';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';
import InnerHeader from '../../src/app-header/InnerHeader';
import SearchField from '../../src/app-header/search/SearchField';
import styles from '../../src/app-header/header-bar-styles';
import ProfileMenu from '../../src/app-header/menus/ProfileMenu';

describe('HeaderBar', () => {
    const renderWithProps = (props) => shallow(<HeaderBar {...props} />, {
        context: getStubContext(),
    });

    it('should render a ProgressIndicator when no state is passed', () => {
        const component = renderWithProps({});

        expect(component.find(LinearProgress)).toHaveLength(1);
    });

    it('should render the correct style for the headerbar', () => {
        const component = renderWithProps({});

        expect(component.props().style).toEqual(styles.headerBar);
    });

    describe('when data has loaded', () => {
        let component;

        beforeEach(() => {
            component = renderWithProps({
                appItems: [{ label: 'App item 1', action: 'actionurl', icon: 'icon.png' }],
                profileItems: [{ label: 'My Account', action: 'myaccount.html', icon: 'account.png' }],
                settings: { grid: { x: 3, y: 3 }},
            });
        });

        it('should render the inner header', () => {
            expect(component.find(InnerHeader)).toHaveLength(1);
        });

        it('should render the search field', () => {
            expect(component.find(SearchField)).toHaveLength(1);
        });

        it('should add the users color for the headerbar background', () => {
            expect(component.props().style.background).toBe('#B40303');
        });

        it('should render the ProfileMenu', () => {
            expect(component.find(ProfileMenu)).toHaveLength(1);
        });

        it('should pass the profileItems to the ProfileMenu', () => {
            expect(component.find(ProfileMenu).props().items).toEqual([{ label: 'My Account', action: 'myaccount.html', icon: 'account.png' }])
        });
    });
});
