import React from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash/fp';
import log from 'loglevel';

function SinglePanel(props) {
    const { children, mainStyle, ...otherProps } = props;
    const mergedMainStyle = {
        flex: 1,
        display: 'flex',
        flexOrientation: 'row',
        marginTop: '8rem',
        ...mainStyle,
    };

    let childToRender;
    if (isArray(children) && children.length) {
        childToRender = children[0];
        log.warn('You passed multiple children to the <SinglePanel /> component, this is not supported');
    } else {
        childToRender = children;
    }

    return (
        <main style={mergedMainStyle} {...otherProps}>
            {childToRender}
        </main>
    );
}

SinglePanel.propTypes = {
    children: PropTypes.object.isRequired,
    mainStyle: PropTypes.object,
};

SinglePanel.defaultProps = {
    mainStyle: {},
};

export default SinglePanel;
