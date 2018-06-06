import React from 'react';

import Container from './Container';

const CircleContainer = ({style, children}) => (<Container style={style} circle>{children}</Container>);

export default CircleContainer;
