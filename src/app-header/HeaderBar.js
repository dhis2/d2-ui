import React from 'react';
import HeaderBarSettingsButton from './settings/HeaderBarSettingsButton';
import AppMenu from './menus/AppMenu';
import ProfileMenu from './menus/ProfileMenu';
import InnerHeader from './InnerHeader';
import HeaderMenus from './menus/HeaderMenus';
import SearchField from './search/SearchField';
import styles, { applyUserStyle } from './header-bar-styles';
import LinearProgress from 'material-ui/lib/linear-progress';

export default function HeaderBar(props, { d2 }) {
    const { appItems, profileItems, currentUser, settings } = props;

    // If the required props are not passed we're in a loading state.
    if (!appItems && !profileItems && !settings) {
        return (<div style={styles.headerBar}><LinearProgress indeterminate /></div>);
    }

    return (
        <div style={applyUserStyle(d2.currentUser, styles.headerBar)}>
            <InnerHeader />
            <SearchField />
            <HeaderMenus>
                <AppMenu items={appItems} rowItemCount={settings.grid.x} columnItemCount={settings.grid.y} />
                <ProfileMenu items={profileItems} rowItemCount={3} columnItemCount={3} currentUser={currentUser} />
                <HeaderBarSettingsButton />
            </HeaderMenus>
        </div>
    );
}
HeaderBar.contextTypes = {
    d2: React.PropTypes.object,
};
