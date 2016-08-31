import React from 'react';
import { isArray } from 'lodash/fp';
import log from 'loglevel';

function SinglePanel(props) {
    const { children, ...otherProps } = props;

    const styles = {
        mainStyle: {
            flex: 1,
            display: 'flex',
            flexOrientation: 'row',
            marginTop: '8rem',
            marginLeft: '2rem',
            marginRight: '2rem',
        },
    };

    let childToRender;
    if (isArray(children) && children.length) {
        childToRender = children[0];
        log.warn('You passed multiple children to the <SinglePanel /> component, this is not supported');
    } else {
        childToRender = children;
    }

    return (
        <main style={styles.mainStyle} {...otherProps}>
            {childToRender}
        </main>
    );
}

export default SinglePanel;
