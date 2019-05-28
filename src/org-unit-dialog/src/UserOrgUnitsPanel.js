import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import StopIcon from '@material-ui/icons/Stop';
import userOrgUnits from './userOrgUnits';
import styles from './styles/UserOrgUnitsPanel';

const UserOrgUnitsPanel = props => (
    <div style={styles.container}>
        <Grid
            container
            direction="row"
            alignItems="center"
        >
            {userOrgUnits.map(orgUnitType => (
                <Grid
                    key={orgUnitType.id}
                    style={styles.gridItem}
                    item
                >
                    <Checkbox
                        checked={props.userOrgUnits.some(ouType => ouType.id === orgUnitType.id)}
                        onChange={props.handleUserOrgUnitClick}
                        inputProps={{
                            id: orgUnitType.id,
                            name: orgUnitType.id,
                        }}
                        icon={<CheckBoxOutlineBlankIcon style={styles.checkbox} />}
                        checkedIcon={<CheckBoxIcon style={styles.checkboxChecked} />}
                        color={props.checkboxColor}
                    />
                    <InputLabel htmlFor={orgUnitType.id}>
                        <StopIcon style={styles.stopIcon} />
                        <span style={styles.text}>{orgUnitType.displayName}</span>
                    </InputLabel>
                </Grid>
            ))}
        </Grid>
    </div>
);

UserOrgUnitsPanel.propTypes = {
    checkboxColor: PropTypes.string.isRequired,
    selected: PropTypes.array.isRequired,
    userOrgUnits: PropTypes.array.isRequired,
    handleUserOrgUnitClick: PropTypes.func.isRequired,
};

export default UserOrgUnitsPanel;
