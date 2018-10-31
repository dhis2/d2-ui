import React from 'react';
import PropTypes from 'prop-types';
import MUICircularProgress from '@material-ui/core/CircularProgress';

function getSizes(large, small) {
    const defaultMaterialUISize = 59.5; // Represents the pre 0.16 values size value 1
    const defaultMaterialUIMargin = 5.25; // Represents the pre 0.16 values size value 1

    if (large) {
        return {
            size: defaultMaterialUISize * 2,
            margin: defaultMaterialUIMargin * 2,
        };
    }

    if (small) {
        return {
            size: defaultMaterialUISize / 2,
            margin: defaultMaterialUIMargin / 2,
        };
    }

    return {
        size: defaultMaterialUISize,
        margin: defaultMaterialUIMargin,
    };
}

export default function CircularProgress({ large, small, style }) {
    const sizes = getSizes(large, small);

    return (
        <MUICircularProgress
            variant="indeterminate"
            size={sizes.size}
            style={Object.assign({ margin: sizes.margin }, style)}
        />
    );
}

CircularProgress.propTypes = {
    large: PropTypes.bool,
    small: PropTypes.bool,
    style: PropTypes.object,
};

CircularProgress.defaultProps = {
    large: false,
    small: false,
    style: {},
};
