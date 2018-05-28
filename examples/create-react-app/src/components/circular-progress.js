import React from 'react';

import { CircularProgress } from '@dhis2/d2-ui-core';

export default function Chips() {
    return (
        <div>
            <CircularProgress />
            <CircularProgress large />
            <CircularProgress small />
            <CircularProgress large small />
        </div>
    );
}
