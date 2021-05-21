import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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
    state = { isExpanded: true, showCompleteDescription: false };

    toggleDetailsExpand = () => {
        this.setState({ isExpanded: !this.state.isExpanded });
    };

    toggleDescription = () =>
        this.setState({ showCompleteDescription: !this.state.showCompleteDescription });

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
    
            if(this.props.isOffline) {
                return (
                    <Tooltip title={i18n.t('Not available offline')} classes={{ tooltip: this.props.classes.uiTooltip }}>
                        <span>
                            <IconButton
                                style={styles.subscriberIcon}
                                disabled
                            >
                                <SubscriberIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                )
            }

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

    getCardTitle = type => {
        const typeTitleMap = {
            REPORT_TABLE: i18n.t('Table details'),
            CHART: i18n.t('Chart details'),
            MAP:  i18n.t('Map details'),
            EVENT_REPORT: i18n.t('Table details'),
            EVENT_CHART: i18n.t('Chart details'),
            VISUALIZATION: i18n.t('Visualization details'),
        }
        return typeTitleMap[type];
    }

    render() {
        const { model, classes } = this.props;
        const owner = model.user ? model.user.displayName : '-';
        const SubscriptionButton = this.renderSubscriptionButton();

        return (
            <CollapsibleCard title={this.getCardTitle(this.props.type.toUpperCase())}>
                <div className={classes.detailsCardList}>
                    <div style={styles.descSubscribe}>
                        <Description
                            displayDescription={model.displayDescription}
                            isToggled={this.state.showCompleteDescription}
                            onToggleDescription={this.toggleDescription}
                        />
                        {SubscriptionButton}
                    </div>
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
    appName: PropTypes.string.isRequired,
};

Details.propTypes = {
    isOffline: PropTypes.bool,
    model: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Details);
