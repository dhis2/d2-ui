import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import styles from './styles/OUCheckbox.component.styles';

const OUCheckboxComponent = ({ checked, disabled, onClick, color }) => {
    return (
        <Checkbox
            style={styles.checkbox}
            checked={checked}
            disabled={disabled}
            onClick={onClick}
            color={color}
            icon={<CheckBoxOutlineBlankIcon style={styles.uncheckedCheckbox} />}
            checkedIcon={<CheckBoxIcon style={{ fontSize: 15 }} />}
        />
    )
};

export default OUCheckboxComponent;
