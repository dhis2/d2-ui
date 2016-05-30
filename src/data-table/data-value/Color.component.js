import React from 'react';
import {hcl} from 'd3-color';

export default function Color (props) {
    const colorStyle = {
        backgroundColor: props.value,
        color: hcl(props.value).l < 70 ? '#fff' : '#000',
        textAlign: 'center'
    };

    return (
        <div style={colorStyle}>{props.value}</div>
    );
};
