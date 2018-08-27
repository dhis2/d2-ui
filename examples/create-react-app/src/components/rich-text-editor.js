import React from 'react';
import TextField from 'material-ui/TextField';

import RichTextEditor from '@dhis2/d2-ui-rich-text-editor';

const RichTextEditorExample = () => (
    <RichTextEditor>
        <TextField
            multiline
            rowsMax="4"
            placeholder="Type some text and use Ctrl/Cmd + B/I also on selection"
        />
    </RichTextEditor>
);

export default RichTextEditorExample;
