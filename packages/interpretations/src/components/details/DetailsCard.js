import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import SubscriberIconEnabled from '@material-ui/icons/Notifications';
import SubscriberIconDisabled from '@material-ui/icons/AddAlert';
import i18n from '@dhis2/d2-i18n';

import CollapsibleCard from '../CollapsibleCard';
import styles from './DetailsCardStyles.js';
import { setSubscription } from '../../models/helpers';
import { formatDate, translateModelName } from '../../util/i18n';

const List = ({ children }) => <div style={styles.detailsCardList}>{children}</div>;

const ListItem = ({ label, text, button }) => (
    <div style={styles.detailsCardItem}>
        {label && <label style={{ fontWeight: 'bold', marginRight: 5 }}>{label}:</label>}
        {text}
        {button}
    </div>
);

const descriptionMaxLength = 250;

const getDescription = model => {
    const { displayDescription: description } = model;

    if (!description) {
        return <i>{i18n.t('No description')}</i>;
    } else if (description.length < descriptionMaxLength) {
        return description;
    } else {
        return description.substring(0, descriptionMaxLength) + ' ...';
    }
};

const accessMapping = {
    '--------': i18n.t('None'),
    'r-------': i18n.t('Read'),
    'rw------': i18n.t('Read/Write'),
};

const getSharingText = model => {
    const publicAccessValue = accessMapping[model.publicAccess] || i18n.t('Unknown');
    const publicAccess = i18n.t('Public') + ': ' + publicAccessValue;

    const userGroupsCount = (model.userGroupAccesses || []).length;
    const userGroupsInfo =
        userGroupsCount > 2
            ? `${userGroupsCount} ${i18n.t('user groups')}`
            : (model.userGroupAccesses || []).map(userGroup => userGroup.displayName).join(', ');

    return publicAccess + (userGroupsInfo ? ` + ${userGroupsInfo}` : '');
};

class DetailsCard extends React.Component {
    state = {
        isExpanded: true,
    };

    toggleDetailsExpand = () => {
        this.setState({ isExpanded: !this.state.isExpanded });
    };

    toggleSubscription = () => {
        const { model, onChange } = this.props;
        return setSubscription(model, !model.subscribed).then(onChange);
    };

    renderSubscriptionButton(model) {
        const tOpts = { object: translateModelName(model.modelName) };
        const [SubscriberIcon, subscriptionTooltip] = model.subscribed
            ? [
                  SubscriberIconEnabled,
                  i18n.t(
                      'Unsubscribe from this {{object}} and stop receiving notifications',
                      tOpts
                  ),
              ]
            : [
                  SubscriberIconDisabled,
                  i18n.t('Subscribe to this {{object}} and start receiving notifications', tOpts),
              ];

        return (
            <IconButton
                style={styles.subscriberIcon}
                title={subscriptionTooltip}
                onClick={this.toggleSubscription}
            >
                <SubscriberIcon />
            </IconButton>
        );
    }

    render() {
        const { model } = this.props;
        const owner = model.user ? model.user.displayName : '-';

        return (
            <CollapsibleCard title={i18n.t('Details')}>
                {this.renderSubscriptionButton(model)}

                <List>
                    <ListItem text={getDescription(model)} />
                    <ListItem label={i18n.t('Owner')} text={owner} />
                    <ListItem label={i18n.t('Created')} text={formatDate(model.created)} />
                    <ListItem label={i18n.t('Last updated')} text={formatDate(model.lastUpdated)} />
                    <ListItem label={i18n.t('Views')} text={model.favoriteViews} />
                    <ListItem label={i18n.t('Sharing')} text={getSharingText(model)} />
                </List>
            </CollapsibleCard>
        );
    }
}

DetailsCard.propTypes = {
    model: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default DetailsCard;
