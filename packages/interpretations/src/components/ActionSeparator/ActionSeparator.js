import React from 'react';

const styles = {
    linkArea: {
        paddingLeft: '5px',
        paddingRight: '5px',
    },
};

export const ActionSeparator = ({labelText = "·"}) => (
    <label style={styles.linkArea}>{labelText}</label>
);

export default ActionSeparator;