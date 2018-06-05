import React from 'react';

import D2Paper from './D2Paper';

const FlatPaper = ({style, children}) => (<D2Paper style={style} rounded={false}>{children}</D2Paper>);

export default FlatPaper;
