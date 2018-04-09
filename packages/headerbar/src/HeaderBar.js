import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import React, { Component } from 'react';
import { D2UI } from 'd2-ui';
import { withStateFrom } from 'd2-ui';
import { setInstance } from 'd2/lib/d2';

import ProfileMenu from './menus/ProfileMenu';
import InnerHeader from './InnerHeader';
import HeaderMenus from './menus/HeaderMenus';
import Notifications from './notifications/Notifications';
import SearchField from './search/SearchField';
import styles, { applyUserStyle } from './header-bar-styles';

import headerBarStore$ from './headerBar.store';

export class HeaderBar extends Component {
    constructor(props) {
        super(props);
        console.log('Initializing Header Bar'); // eslint-disable-line no-console
    }


    getChildContext() {
        return { d2: this.props.d2 };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.d2 && nextProps.d2) {
            console.log('Setting d2', nextProps.d2);
            setInstance(nextProps.d2);
        }
    }

    render() {
        const {
            appItems,
            profileItems,
            notifications,
            currentUser,
            settings,
            noLoadingIndicator } = this.props;

        // If the required props are not passed we're in a loading state.
        if (!this.props.d2 || !appItems && !profileItems && !settings) {
            if (noLoadingIndicator) {
                return <div style={{ display: 'none' }} />;
            }
            console.info("Loading state", this.props.d2, appItems, profileItems, settings);
            return (<div style={styles.headerBar}><LinearProgress mode="indeterminate" /></div>);
        }

        return (
            <D2UI>
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
            </D2UI>
        );
    }
}

HeaderBar.childContextTypes = {
    d2: PropTypes.object,
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
