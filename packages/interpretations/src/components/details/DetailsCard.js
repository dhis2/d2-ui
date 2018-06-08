import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import { SvgIcon } from '@dhis2/d2-ui-core';
import { grey600 } from 'material-ui/styles/colors';
import { config } from 'd2/lib/d2';
import { injectIntl } from 'react-intl';

import styles from './DetailsCardStyles.js';
import { patch } from '../../models/helpers';

config.i18n.strings.add('no_description');
config.i18n.strings.add('public');
config.i18n.strings.add('access_none');
config.i18n.strings.add('access_read');
config.i18n.strings.add('access_read_write');
config.i18n.strings.add('access_unknown');
config.i18n.strings.add('user_groups');
config.i18n.strings.add('details');
config.i18n.strings.add('owner');
config.i18n.strings.add('created');
config.i18n.strings.add('last_updated');
config.i18n.strings.add('views');
config.i18n.strings.add('sharing');

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

const getDescription = (d2, model) => {
    const {description} = model;

    if (!description) {
        return (<i>{d2.i18n.getTranslation('no_description')}</i>)
    } else if (description.length < descriptionMaxLength) {
        return description;
    } else {
        return description.substring(0, descriptionMaxLength) + ' ...';
    }
};

const accessMapping = {
    "--------": "none",
    "r-------": "read",
    "rw------": "read_write",
};

const getSharingText = (d2, model) => {
    const publicAccessKey = accessMapping[model.publicAccess] || "unknown";
    const publicAccess = d2.i18n.getTranslation('public') + ": " +
        d2.i18n.getTranslation("access_" + publicAccessKey);

    const userGroupsCount = (model.userGroupAccesses || []).length;
    const userGroupsInfo = userGroupsCount > 2
        ? `${userGroupsCount} ${d2.i18n.getTranslation('user_groups')}`
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
        const { model, intl: { formatDate } } = this.props;
        const { isExpanded } = this.state;
        const { d2 } = this.context;
        const getTranslation = d2.i18n.getTranslation.bind(d2.i18n);
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
                    title={getTranslation('details')}
                    showExpandableButton={true}
                    textStyle={styles.headerText}
                >
                </CardHeader>

                <CardText expandable={true} style={styles.body}>
                    <List>
                        <ListItem text={getDescription(d2, model)} />
                        <ListItem label={getTranslation('owner')} text={owner} />
                        <ListItem label={getTranslation('created')} text={formatDate(model.created)} />
                        <ListItem label={getTranslation('last_updated')} text={formatDate(model.lastUpdated)} />
                        <ListItem label={getTranslation('views')} text={model.favoriteViews} />
                        <ListItem label={getTranslation('sharing')} text={getSharingText(d2, model)} />
                    </List>
                </CardText>
            </Card>
        );
    }
}

DetailsCard.propTypes = {
    model: PropTypes.object.isRequired,
};

DetailsCard.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default injectIntl(DetailsCard);
