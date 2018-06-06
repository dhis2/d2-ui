import React from 'react';

import Container from './Container';

const FlatContainer = ({style, children}) => (<Container style={style} rounded={false}>{children}</Container>);

export default FlatContainer;
