import React from 'react';
import TextField from 'material-ui/TextField';

import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';

const MentionsWrapperExample = ({ d2 }) => (
    <MentionsWrapper d2={d2}>
        <TextField
            multiline
            rowsMax="4"
            placeholder="Type some text. @ triggers the mentions suggestions"
        />
    </MentionsWrapper>
);

export default MentionsWrapperExample;
