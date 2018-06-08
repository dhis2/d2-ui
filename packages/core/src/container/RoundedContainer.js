import React from 'react';

import Container from './Container';

const RoundedContainer = ({style, children}) => (<Container style={style} rounded>{children}</Container>);

export default RoundedContainer;
