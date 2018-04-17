import React from 'react';
import { shallow } from 'enzyme';
import { LinearProgress } from 'material-ui/Progress';
import { getStubContext } from '../../../../config/inject-theme';
import { HeaderBar } from '../HeaderBar';
import InnerHeader from '../InnerHeader';
import SearchField from '../search/SearchField';
import styles from '../header-bar-styles';
import ProfileMenu from '../menus/ProfileMenu';

describe('HeaderBar', () => {
    const context = getStubContext();
    const renderWithProps = props => shallow(<HeaderBar {...props} />, {
        context,
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
                d2: context.d2,
                profileItems: [{ label: 'My Account', action: 'myaccount.html', icon: 'account.png' }],
            });
        });

        it('renders the inner header', () => {
            component.update();
            expect(component.find(InnerHeader)).toHaveLength(1);
        });

        it('renders the search field', () => {
            expect(component.find(SearchField)).toHaveLength(1);
        });

        it('renders the ProfileMenu', () => {
            expect(component.find(ProfileMenu)).toHaveLength(1);
        });

        it('passes the profileItems to the ProfileMenu', () => {
            expect(component.find(ProfileMenu).props().items).toEqual([{ label: 'My Account', action: 'myaccount.html', icon: 'account.png' }]);
        });
    });
});
