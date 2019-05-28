import React, { Children, cloneElement } from 'react';
import log from 'loglevel';

export default function createFlexContainer(defaultFlexStyle, displayName = 'FlexContainer') {
    function FlexContainer({ style, flexValue = '1 0 auto', children }) {
        const flexContainerStyle = Object.assign({ display: 'flex' }, defaultFlexStyle, style);
        const flexedChildren = Children.map(children, (child) => {
            if (child === null) {
                log.error('createFlexContainer: Flex child can not be \'null\'');
            }

            return cloneElement(child, { style: Object.assign({}, { flex: flexValue }, child.props.style) });
        });

        return (
            <div style={flexContainerStyle}>
                {flexedChildren}
            </div>
        );
    }
    FlexContainer.displayName = displayName;

    return FlexContainer;
}
