import React from 'react';
import Message from './Message.component';
import mapProps from '../component-helpers/mapProps';

export default mapProps(props => ({ style: { color: 'red' }, ...props }), Message);

