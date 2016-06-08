import React, { Component, PropTypes } from 'react';
import colorbrewer from './colorbrewer';

export default function ColorScale({scheme, classes, onClick}) {
    const colors = colorbrewer[scheme][classes];

    const styles = {
        list: {
            paddingLeft: 0,
            marginRight: 20,
            height: 25,
            cursor: 'pointer',
            boxShadow: '0 1px 6px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.12)',
            display: 'inline-block',
        }
    };

    const items = colors.map((color, index) => {
        const styles = {
            marginLeft: 0,
            display: 'inline-block',
            backgroundColor: color,
            width: 25,
            height: '100%',
        };

        return (<li key={index} style={styles} />);
    });

    return (
        <ul style={styles.list} onClick={(event => onClick(event, scheme))}>
            {items}
        </ul>
    );
}

