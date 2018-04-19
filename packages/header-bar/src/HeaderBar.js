import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';
import { D2UI, withStateFrom } from '@dhis2/d2-ui-core';
import { setInstance } from 'd2/lib/d2';

import ProfileMenu from './menus/ProfileMenu';
import InnerHeader from './InnerHeader';
import HeaderMenus from './menus/HeaderMenus';
import Notifications from './notifications/Notifications';
import SearchField from './search/SearchField';
import styles, { applyUserStyle } from './header-bar-styles';

import headerBarStore$ from './headerBar.store';

export class HeaderBar extends Component {
    getChildContext() {
        return { d2: this.props.d2 };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.d2 && nextProps.d2) {
            setInstance(nextProps.d2);
        }
    }

    render() {
        const {
            profileItems,
            notifications,
            currentUser,
            noLoadingIndicator } = this.props;

        // If the required props are not passed we're in a loading state.
        if (!this.props.d2 || !profileItems) {
            if (noLoadingIndicator) {
                return <div style={{ display: 'none' }} />;
            }

            return (<div style={styles.headerBar}><LinearProgress mode="indeterminate" /></div>);
        }

        return (
            <D2UI>
                <div style={applyUserStyle(this.props.d2.currentUser, styles.headerBar)}>
                    <InnerHeader />
                    <div style={styles.headerActions}>
                        <Notifications notifications={notifications} />
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
};

HeaderBar.propTypes = {
    notifications: PropTypes.object,
    profileItems: PropTypes.array,
    currentUser: PropTypes.object,
    noLoadingIndicator: PropTypes.bool,
    d2: PropTypes.object,
};

HeaderBar.defaultProps = {
    notifications: {},
};

export default withStateFrom(headerBarStore$, HeaderBar);
