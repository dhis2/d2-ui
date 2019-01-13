import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import SubscriberIconEnabled from '@material-ui/icons/Notifications';
import SubscriberIconDisabled from '@material-ui/icons/AddAlert';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';

import CollapsibleCard from '../Cards/CollapsibleCard';
import Description from './Description';
import Item from './Item';
import { getSharingText } from '../../sharing/sharingText';

import { setSubscription } from '../../api/helpers';
import { formatDate } from '../../dateformats/dateformatter';
import { translateModelName } from '../../translations/modelNametranslator';
import styles from './styles/Details.style';

export class Details extends React.Component {
    state = { isExpanded: true };

    toggleDetailsExpand = () => {
        this.setState({ isExpanded: !this.state.isExpanded });
    };

    toggleSubscription = async () => {
        const { model, onChange } = this.props;
        return setSubscription(this.context.d2, model, !model.subscribed).then(onChange);
    };

    renderSubscriptionButton() {
        const tOpts = { object: translateModelName(this.props.model.modelName) };
        const [ SubscriberIcon, subscriptionTooltip ] = this.props.model.subscribed
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
    };

    render() {
        const { model, classes } = this.props;
        const owner = model.user ? model.user.displayName : '-';
        const SubscriptionButton = this.renderSubscriptionButton();

        return (
            <CollapsibleCard title={i18n.t('Favorite details')}>
                {SubscriptionButton}
                <div className={classes.detailsCardList}>
                    <Item text={<Description description={model.displayDescription} />} />
                    <Item label={i18n.t('Owner')} text={owner} />
                    <Item
                        label={i18n.t('Created')}
                        text={formatDate(model.created, this.context.locale)}
                    />
                    <Item
                        label={i18n.t('Last updated')}
                        text={formatDate(model.lastUpdated, this.context.locale)}
                    />
                    <Item label={i18n.t('Views')} text={model.favoriteViews} />
                    <Item label={i18n.t('Sharing')} text={getSharingText(model)} />
                </div>
            </CollapsibleCard>
        );
    };
};

Details.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
};

Details.propTypes = {
    model: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Details);