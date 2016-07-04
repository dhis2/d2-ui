import React, { PropTypes } from 'react';
import ProfileMenu from './menus/ProfileMenu';
import InnerHeader from './InnerHeader';
import HeaderMenus from './menus/HeaderMenus';
import SearchField from './search/SearchField';
import styles, { applyUserStyle } from './header-bar-styles';
import LinearProgress from 'material-ui/lib/linear-progress';

export default function HeaderBar(props, { d2 }) {
    const { appItems, profileItems, currentUser, settings, noLoadingIndicator } = props;

    // If the required props are not passed we're in a loading state.
    if (!appItems && !profileItems && !settings) {
        if (noLoadingIndicator) {
            return <div style={{display: 'none'}} />;
        }
        return (<div style={styles.headerBar}><LinearProgress indeterminate /></div>);
    }

    return (
        <div style={applyUserStyle(d2.currentUser, styles.headerBar)}>
            <InnerHeader />
            <SearchField />
            <HeaderMenus>
                <ProfileMenu
                    items={profileItems}
                    rowItemCount={3}
                    columnItemCount={3}
                    currentUser={currentUser}
                />
            </HeaderMenus>
        </div>
    );
}
HeaderBar.contextTypes = {
    d2: PropTypes.object,
};
HeaderBar.propTypes = {
    appItems: PropTypes.array,
    profileItems: PropTypes.array,
    currentUser: PropTypes.object,
    settings: PropTypes.object,
};
