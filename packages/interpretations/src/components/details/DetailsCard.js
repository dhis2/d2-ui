import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import { SvgIcon } from '@dhis2/d2-ui-core';
import { grey600 } from 'material-ui/styles/colors';
import i18n from '@dhis2/d2-i18n'

import styles from './DetailsCardStyles.js';
import { patch } from '../../models/helpers';
import { formatDate } from '../../util/i18n';

const List = ({children}) => (
    <div style={styles.detailsCardList}>{children}</div>
);

const ListItem = ({label, text, button}) => (
    <div style={styles.detailsCardItem}>
        {label && <label style={{fontWeight: "bold", marginRight: 5}}>{label}:</label>}
        {text}
        {button}
    </div>
);

const EditButton = props => {
    const { model, tooltip, icon, onClick } = props;
    const iconStyle = { width: 14, height: 14, padding: 0, marginLeft: 2 };

    if (model && model.access && model.access.update) {
        return (
            <IconButton tooltip={tooltip} onClick={onClick} style={iconStyle} iconStyle={iconStyle}>
                <SvgIcon icon={icon} color={grey600} />
            </IconButton>
        );
    } else {
        return null;
    }
};

const descriptionMaxLength = 250;

const getDescription = (model) => {
    const {description} = model;

    if (!description) {
        return (<i>{i18n.t('No description')}</i>)
    } else if (description.length < descriptionMaxLength) {
        return description;
    } else {
        return description.substring(0, descriptionMaxLength) + ' ...';
    }
};

const accessMapping = {
    "--------": i18n.t("None"),
    "r-------": i18n.t("Read"),
    "rw------": i18n.t("Read/Write"),
};

const getSharingText = (model) => {
    const publicAccessValue = accessMapping[model.publicAccess] || i18n.t("Unknown");
    const publicAccess = i18n.t('Public') + ": " + publicAccessValue;

    const userGroupsCount = (model.userGroupAccesses || []).length;
    const userGroupsInfo = userGroupsCount > 2
        ? `${userGroupsCount} ${i18n.t('user groups')}`
        : (model.userGroupAccesses || []).map(userGroup => userGroup.displayName).join(", ");

    return publicAccess + (userGroupsInfo ? ` + ${userGroupsInfo}` : "");
};

class DetailsCard extends React.Component {
    state = {
        isExpanded: true,
    };

    constructor(props) {
        super(props);
        this.toggleDetailsExpand = this.toggleDetailsExpand.bind(this);
    }

    toggleDetailsExpand() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    render() {
        const { model } = this.props;
        const { isExpanded } = this.state;
        const owner = model.user ? model.user.displayName : '-';

        return (
            <Card
                style={styles.detailsCard}
                containerStyle={styles.container}
                expanded={isExpanded}
                onExpandChange={this.toggleDetailsExpand}
            >
                <CardHeader
                    style={styles.detailsCardHeader}
                    title={i18n.t('Details')}
                    showExpandableButton={true}
                    textStyle={styles.headerText}
                >
                </CardHeader>

                <CardText expandable={true} style={styles.body}>
                    <List>
                        <ListItem text={getDescription(model)} />
                        <ListItem label={i18n.t('Owner')} text={owner} />
                        <ListItem label={i18n.t('Created')} text={formatDate(model.created)} />
                        <ListItem label={i18n.t('Last updated')} text={formatDate(model.lastUpdated)} />
                        <ListItem label={i18n.t('Views')} text={model.favoriteViews} />
                        <ListItem label={i18n.t('Sharing')} text={getSharingText(model)} />
                    </List>
                </CardText>
            </Card>
        );
    }
}

DetailsCard.propTypes = {
    model: PropTypes.object.isRequired,
};

export default DetailsCard;
