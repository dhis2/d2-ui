import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'd2/lib/d2';
import IconButton from 'material-ui/IconButton';

import getBaseUrlFromD2ApiUrl from '../utils/getBaseUrlFromD2ApiUrl';
import SvgIcon from '../../svg-icon/SvgIcon';
import styles from '../header-bar-styles';

config.i18n.strings.add('interpretations');
config.i18n.strings.add('messages');

class Notifications extends Component {
    getBaseUrl = () => getBaseUrlFromD2ApiUrl(this.context.d2);

    render = () => {
        const interpretationsHref = `${this.getBaseUrl()}/dhis-web-interpretation/index.html`;
        const messagesHref = `${this.getBaseUrl()}/dhis-web-messaging/message.action`;

        return (
            <div style={styles.notifications}>
                <NotificationItem
                    icon="Message"
                    href={interpretationsHref}
                    tooltip={this.context.d2.i18n.getTranslation('interpretations')}
                />
                <NotificationItem
                    icon="Email"
                    href={messagesHref}
                    tooltip={this.context.d2.i18n.getTranslation('messages')}
                />
            </div>
        );
    }
}

Notifications.contextTypes = {
    d2: PropTypes.object.isRequired,
};

const NotificationItem = ({ icon, href, tooltip }) => {
    return (
        <IconButton
            href={href}
            iconStyle={{ fill: 'white' }}
            tooltip={tooltip}
        >
            <SvgIcon icon={icon} />
        </IconButton>
    );
}

export default Notifications;
