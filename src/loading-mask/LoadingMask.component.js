import React, { PropTypes } from 'react';
import CircularProgress from '../circular-progress/CircularProgress';

const loadingStatusMask = {
    left: '45%',
    position: 'fixed',
    top: '45%',
};

export default function LoadingMask({ style = {}, large = false, small = false }) {
    return (
        <div style={Object.assign({}, loadingStatusMask, style)} >
            <CircularProgress large={large} small={small} />
        </div>
    );
}

LoadingMask.propTypes = {
    style: PropTypes.object,
    large: PropTypes.bool,
    small: PropTypes.bool,
};
