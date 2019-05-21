import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/fp/isArray';
import log from 'loglevel';

function SinglePanel(props) {
    const { children, mainStyle, ...otherProps } = props;
    const mergedMainStyle = {
        flex: 1,
        display: 'flex',
        flexOrientation: 'row',
        marginTop: '8rem',
        marginLeft: '2rem',
        marginRight: '2rem',
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
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    mainStyle: PropTypes.object,
};

SinglePanel.defaultProps = {
    mainStyle: {},
    children: null,
};

export default SinglePanel;
