import React from 'react';
import addContext from './addContext';

export default function addD2Context(Component) {
    return addContext(Component, { d2: React.PropTypes.object });
}
