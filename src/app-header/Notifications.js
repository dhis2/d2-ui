import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getBaseUrlFromD2ApiUrl from './getBaseUrlFromD2ApiUrl';
import SvgIcon from '../svg-icon/SvgIcon';
import IconButton from 'material-ui/IconButton';

class Notifications extends Component {
    getBaseUrl = () => getBaseUrlFromD2ApiUrl(this.context.d2);

    render = () => {
        const interpretationsHref = `${this.getBaseUrl()}/dhis-web-interpretation/index.html`;
        const messagesHref = `${this.getBaseUrl()}/dhis-web-messaging/message.action`;

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
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
