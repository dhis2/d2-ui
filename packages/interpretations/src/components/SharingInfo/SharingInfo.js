import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Share from '@material-ui/icons/Share';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import Link from '../Link/Link';
import styles from './styles/SharingInfo.style';

export class SharingInfo extends Component {

    getUsers = () =>
        (this.props.interpretation.userAccesses || []).map(item => item.displayName)

    getGroups = () => 
        (this.props.interpretation.userGroupAccesses || []).map(item => item.displayName)

    checkExternalAccess = () => 
        this.props.interpretation.externalAccess ? i18n.t('external access') : '';

    checkPublicAccess = () =>
        this.props.interpretation.publicAccess === 'rw------' ||
        this.props.interpretation.publicAccess === 'r-------';

    concatSharingInfo = () => {
        let displayNames = this.getUsers().concat(this.getGroups()).join(', ')

        if (this.props.interpretation.externalAccess) {
            displayNames = displayNames.concat(i18n.t('external access'));
        };
        
        if (this.checkPublicAccess()) {
            displayNames = displayNames.concat(displayNames.length
                ? i18n.t(', public access') 
                : i18n.t('public access')
            );
        };

        if (displayNames.length) {
            displayNames = displayNames.replace(/, ([^,]*)$/, ' and $1').concat('. ');
        } else {
            displayNames = i18n.t('None. ');
        }

        return displayNames;
    };

    render() {
        const Info = this.concatSharingInfo();

        return (
            <div className={this.props.classes.sharingContainer}>
                <Share className={this.props.classes.sharingIcon}/>
                <span className={this.props.classes.label}>
                    {i18n.t('Shared with: ')} 
                    {Info}
                    <Link 
                        onClick={this.props.onClick}
                        label={i18n.t('Manage sharing')}
                    />
                </span>
            </div>
        );
    };
};

export default withStyles(styles)(SharingInfo);

SharingInfo.defaultProps = {
    interpretation: {
        userAccesses: [],
        userGroupAccesses: [],
        externalAccess: false,
        publicAccess: 'rw------',
    }
};

SharingInfo.propTypes = {
    interpretation: PropTypes.object,
};
