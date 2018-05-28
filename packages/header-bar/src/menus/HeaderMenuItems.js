import React from 'react';

export default function HeaderMenuItems(props) {
    const innerMenuStyle = {
        height: props.height,
        width: props.width,
        overflowY: 'scroll',
        marginRight: props.marginRight,
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'content-box',
        overflow: 'auto',
        padding: props.padding,
    };

    return (
        <div style={innerMenuStyle} onScroll={props.onScroll}>
            {props.children}
        </div>
    );
}
