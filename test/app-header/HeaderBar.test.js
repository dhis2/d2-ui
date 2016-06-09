import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../config/inject-theme';
import HeaderBar from '../../src/app-header/HeaderBar';
import LinearProgress from 'material-ui/lib/linear-progress';
import InnerHeader from '../../src/app-header/InnerHeader';
import SearchField from '../../src/app-header/search/SearchField';
import styles from '../../src/app-header/header-bar-styles';
import AppMenu from '../../src/app-header/menus/AppMenu';
import ProfileMenu from '../../src/app-header/menus/ProfileMenu';

describe('HeaderBar', () => {
    const renderWithProps = (props) => shallow(<HeaderBar {...props} />, {
        context: getStubContext(),
    });

    it('should render a ProgressIndicator when no state is passed', () => {
        const component = renderWithProps({});

        expect(component.find(LinearProgress)).to.have.length(1);
    });

    it('should render the correct style for the headerbar', () => {
        const component = renderWithProps({});

        expect(component.props().style).to.deep.equal(styles.headerBar);
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
            expect(component.find(InnerHeader)).to.have.length(1);
        });

        it('should render the search field', () => {
            expect(component.find(SearchField)).to.have.length(1);
        });

        it('should add the users color for the headerbar background', () => {
            expect(component.props().style.background).to.equal('#B40303');
        });

        it('should render the ProfileMenu', () => {
            expect(component.find(ProfileMenu)).to.have.length(1);
        });

        it('should pass the profileItems to the ProfileMenu', () => {
            expect(component.find(ProfileMenu).props().items).to.deep.equal([{ label: 'My Account', action: 'myaccount.html', icon: 'account.png' }])
        });
    });
});
