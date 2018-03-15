import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import React, { Component } from 'react';

import ProfileMenu from './menus/ProfileMenu';
import InnerHeader from './InnerHeader';
import HeaderMenus from './menus/HeaderMenus';
import Notifications from './notifications/Notifications';
import SearchField from './search/SearchField';
import styles, { applyUserStyle } from './header-bar-styles';

import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';
import headerBarStore$ from './headerBar.store';

import packageInfo from '../package.json';
import { setInstance } from 'd2/lib/d2';

console.log(`Initializing Header Bar v${packageInfo.version}`); // eslint-disable-line no-console

class HeaderBar extends Component {
    constructor (props) {
        super(props);

        if (props.d2) {
            console.log('Setting d2');
            setInstance(props.d2);
        }
    }

    getChildContext() {
        return { d2: this.props.d2 };
    }

    render () {
        const {
            appItems,
            profileItems,
            notifications,
            currentUser,
            settings,
            noLoadingIndicator } = this.props;

        console.log(this.props);

        // If the required props are not passed we're in a loading state.
        if (!appItems && !profileItems && !settings) {
            if (noLoadingIndicator) {
                return <div style={{ display: 'none' }} />;
            }
            return (<div style={styles.headerBar}><LinearProgress mode="indeterminate" /></div>);
        }

        return (
            <div style={applyUserStyle(this.props.d2.currentUser, styles.headerBar)}>
                <InnerHeader />
                <div style={styles.headerActions}>
                    <Notifications notifications={notifications}/>
                    <SearchField />
                </div>
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
}

HeaderBar.childContextTypes = {
    d2: PropTypes.object.isRequired,
}

HeaderBar.propTypes = {
    appItems: PropTypes.array,
    profileItems: PropTypes.array,
    currentUser: PropTypes.object,
    settings: PropTypes.object,
    noLoadingIndicator: PropTypes.bool,
    d2: PropTypes.object,
};

export default withStateFrom(headerBarStore$, HeaderBar);
