import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import SubscriberIconEnabled from '@material-ui/icons/Notifications';
import SubscriberIconDisabled from '@material-ui/icons/AddAlert';
import i18n from '@dhis2/d2-i18n';

import CollapsibleCard from './CollapsibleCard';
import Description from './Description';
import List from './List';
import ListItem from './ListItem';
import { getSharingText } from './sharingText';

import { setSubscription } from '../../api/helpers';
import { formatDate } from '../../dateformats/dateformatter';
import { translateModelName } from '../../translations/modelNametranslator';
import styles from './styles/DetailsCard.style';

class DetailsCard extends React.Component {
    state = {
        isExpanded: true,
    };

    toggleDetailsExpand = () => {
        this.setState({ isExpanded: !this.state.isExpanded });
    };

    toggleSubscription = async () => {
        const { model, onChange } = this.props;
        return setSubscription(this.context.d2, model, !model.subscribed).then(onChange);
    };

    // TOOD: adjust color
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
                    <ListItem text={<Description model={model} />} />
                    <ListItem label={i18n.t('Owner')} text={owner} />
                    <ListItem
                        label={i18n.t('Created')}
                        text={formatDate(model.created, this.context.locale)}
                    />
                    <ListItem
                        label={i18n.t('Last updated')}
                        text={formatDate(model.lastUpdated, this.context.locale)}
                    />
                    <ListItem label={i18n.t('Views')} text={model.favoriteViews} />
                    <ListItem label={i18n.t('Sharing')} text={getSharingText(model)} />
                </List>
            </CollapsibleCard>
        );
    }
}

DetailsCard.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
};

DetailsCard.propTypes = {
    model: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default DetailsCard;