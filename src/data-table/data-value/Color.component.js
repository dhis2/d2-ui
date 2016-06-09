import React from 'react';
import {hcl} from 'd3-color';

export default function Color (props) {
    const colorStyle = {
        backgroundColor: props.value,
        color: hcl(props.value).l < 70 ? '#fff' : '#000',
        textAlign: 'center',
        position: 'relative',
        width: 90,
        height: 36,
        lineHeight: 2.5,
    };

    return (
        <div style={colorStyle}>{props.value}</div>
    );
};
