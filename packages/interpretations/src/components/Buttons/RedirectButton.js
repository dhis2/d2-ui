import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButton';
import { getLink } from '../../api/redirect';
import styles from './styles/ActionButton.style'


export class RedirectButton extends Component {
    render() {
        const appNameMap = {
            REPORT_TABLE: i18n.t('Pivot Tables'),
            CHART: i18n.t('Visualizer'),
            MAP: i18n.t('Maps'),
            EVENT_REPORT: i18n.t('Event Reports'),
            EVENT_CHART: i18n.t('Event Visualizer'),
            VISUALIZATION: i18n.t('Visualizer'),
        }

        return this.context.appName === 'dashboard' ? (
            <a
                href={getLink(this.context.item, this.context.d2, this.props.interpretationId)}
                className={this.props.classes.iconContainer}
                title={i18n.t(`View in ${appNameMap[this.context.item.type]} app`)}
            >
                <ActionButton
                    iconType={'openApp'}
                    tooltip={i18n.t(`View in ${appNameMap[this.context.item.type]} app`)}
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
