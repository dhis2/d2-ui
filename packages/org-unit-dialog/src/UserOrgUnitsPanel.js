import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import StopIcon from '@material-ui/icons/Stop';
import userOrgUnits from './userOrgUnits';

const UserOrgUnitsPanel = props => (
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
    >
        {userOrgUnits.map(orgUnitType => (
            <Grid key={orgUnitType.id} item>
                <Checkbox
                    checked={props.userOrgUnits
                        .some(ouType => ouType.id === orgUnitType.id)
                    }
                    onChange={props.handleUserOrgUnitClick}
                    inputProps={{
                        id: orgUnitType.id,
                        name: orgUnitType.id,
                    }}
                    color="primary"
                />
                <InputLabel htmlFor={orgUnitType.id}>
                    <StopIcon style={props.styles.stopIcon} />
                    <span style={props.styles.text}>{orgUnitType.displayName}</span>
                </InputLabel>
            </Grid>
        ))}
    </Grid>
);

UserOrgUnitsPanel.defaultProps = {
    styles: undefined,
};

UserOrgUnitsPanel.propTypes = {
    styles: PropTypes.object,
    userOrgUnits: PropTypes.array.isRequired,
    handleUserOrgUnitClick: PropTypes.func.isRequired,
};

export default UserOrgUnitsPanel;
