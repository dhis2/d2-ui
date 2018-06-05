import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';
import { withStateFrom } from '@dhis2/d2-ui-core';
import { setInstance } from 'd2/lib/d2';

import ProfileMenu from './menus/ProfileMenu';
import InnerHeader from './InnerHeader';
import HeaderMenus from './menus/HeaderMenus';
import Notifications from './notifications/Notifications';
import SearchField from './search/SearchField';
import styles, { applyUserStyle } from './header-bar-styles';

import D2UI from '@dhis2/d2-ui-app';
import headerBarStore$ from './headerBar.store';

export class HeaderBar extends Component {
    getChildContext() {
        return { d2: this.props.d2 };
    }

    constructor(props) {
        super(props);

        if (props.d2) {
            setInstance(props.d2);
        }
    }

    render() {
        const {
            profileItems,
            notifications,
            noLoadingIndicator } = this.props;

        const currentUser = this.props.d2.currentUser;

        console.log('Loading header bar...');
        // If the required props are not passed we're in a loading state.
        if (!this.props.d2 || !profileItems) {
            if (noLoadingIndicator) {
                return <div style={{ display: 'none' }} />;
            }

            return (
                <div style={styles.headerBar}>
                    <div style={{flexGrow: 1, alignSelf: 'flex-end'}}>
                        <LinearProgress mode="indeterminate" />
                    </div>
                </div>);
        }

        console.log('Loaded header bar!', this.props);
        return (
            <D2UI>
                <div style={applyUserStyle(currentUser, styles.headerBar)}>
                    <InnerHeader />
                    <div>{this.props.children}</div>
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
    noLoadingIndicator: PropTypes.bool,
    d2: PropTypes.object.isRequired,
};

HeaderBar.defaultProps = {
    notifications: {},
};

export default withStateFrom(headerBarStore$, HeaderBar);
