import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButton';
import { getLink } from '../../api/redirect';
import styles from './styles/ActionButton.style'

export const getAppName = type => {
    const appNameMap = {
        REPORT_TABLE: i18n.t('Pivot Tables'),
        CHART: i18n.t('Visualizer'),
        MAP: i18n.t('Maps'),
        EVENT_REPORT: i18n.t('Event Reports'),
        EVENT_CHART: i18n.t('Event Visualizer'),
        VISUALIZATION: i18n.t('Visualizer'),
    }

    return appNameMap[type];
}

export class RedirectButton extends Component {
    render() {
        const {d2, appName, item} = this.context;
        const {interpretationId, classes} = this.props;

        return appName === 'dashboard' ? (
            <a
                href={getLink(item, d2, interpretationId)}
                className={classes.iconContainer}
                title={i18n.t('View in {{appName}} app',{appName: getAppName(item.type)})}
            >
                <ActionButton
                    iconType={'openApp'}
                    tooltip={i18n.t('View in {{appName}} app',{appName: getAppName(item.type)})}
                />
            </a>
        ) : null;
    }
};

RedirectButton.propTypes = {
    classes: PropTypes.object.isRequired,
    interpretationId: PropTypes.string.isRequired,
};

RedirectButton.contextTypes = {
    item: PropTypes.object,
    d2: PropTypes.object,
    appName: PropTypes.string,
};

export default withStyles(styles)(RedirectButton);
