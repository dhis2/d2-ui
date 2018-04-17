import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'd2/lib/d2';
import IconButton from 'material-ui/IconButton';

import NotificationItem from './NotificationItem';
import getBaseUrlFromD2ApiUrl from '../utils/getBaseUrlFromD2ApiUrl';
import styles from '../header-bar-styles';

config.i18n.strings.add('interpretations');
config.i18n.strings.add('messages');

class Notifications extends Component {
    getBaseUrl = () => getBaseUrlFromD2ApiUrl(this.context.d2);

    render = () => {
        const { unreadInterpretations, unreadMessageConversations } = this.props.notifications;
        const interpretationsHref = `${this.getBaseUrl()}/dhis-web-interpretation/index.html`;
        const messagesHref = `${this.getBaseUrl()}/dhis-web-messaging/message.action`;

        return (
            <div style={styles.notifications}>
                <NotificationItem
                    icon="Message"
                    href={interpretationsHref}
                    count={unreadInterpretations}
                    tooltip={this.context.d2.i18n.getTranslation('interpretations')}
                    style={{ top: 2 }} // Message icon quick fix
                />
                <NotificationItem
                    icon="Email"
                    href={messagesHref}
                    count={unreadMessageConversations}
                    tooltip={this.context.d2.i18n.getTranslation('messages')}
                />
            </div>
        );
    }
}

Notifications.propTypes = {
    notifications: PropTypes.object.isRequired,
}

Notifications.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default Notifications;
