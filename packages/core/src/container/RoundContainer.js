import React from 'react';

import Container from './Container';

const RoundContainer = ({style, children}) => (<Container style={style} rounded>{children}</Container>);

export default RoundContainer;
