import React, { Component, PropTypes } from 'react';
import colorbrewer from './colorbrewer';

export default function ColorScale({scheme, classes, onClick}) {
    const colors = colorbrewer[scheme][classes];

    const styles = {
        list: {
            padding: 0,
            cursor: 'pointer',
        }
    };

    const items = colors.map((color, index) => {
        const styles = {
            marginLeft: 0,
            display: 'inline-block',
            backgroundColor: color,
            width: 20,
            height: 20,
        };

        return (<li key={index} style={styles} />);
    });

    return (
        <ul style={styles.list} onClick={(event => onClick(event, scheme))}>
            {items}
        </ul>
    );
}

