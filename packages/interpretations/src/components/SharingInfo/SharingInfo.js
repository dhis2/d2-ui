import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Share from '@material-ui/icons/Share';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import styles from './styles/SharingInfo.style';

export class SharingInfo extends Component {

    getUsers = () =>
        this.props.interpretation.userAccesses.map(item => item.displayName)

    getGroups = () => 
        this.props.interpretation.userGroupAccesses.map(item => item.displayName)

    checkExternalAccess = () => 
        this.props.interpretation.externalAccess ? i18n.t('external access') : '';

    checkPublicAccess = () =>
        this.props.interpretation.publicAccess === 'rw------';

    render() {
        const Info = this.getUsers().concat(this.getGroups()).join(', ')
        const externalAccess = this.checkExternalAccess();
        const publicAccess = this.checkPublicAccess();

        return (
            <div className={this.props.classes.sharingContainer}>
                <Share className={this.props.classes.sharingIcon}/>
                <span className={this.props.classes.label}>
                    {i18n.t('Shared with: ')} 
                    {Info}
                    {externalAccess}
                    {(Info.length || externalAccess.length) ? i18n.t(' and public access.') : i18n.t('public access.')}
                </span>
            </div>
        );
    }
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
}