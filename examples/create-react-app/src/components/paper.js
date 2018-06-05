import React from 'react';

import {FlatPaper, RoundPaper, CirclePaper} from '@dhis2/d2-ui-core';

const style = {
    container: {
        margin: 16,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paper: {
        padding: 20,
    },
};

export default () => (
    <div style={style.container}>
        <FlatPaper style={style.paper}>
            Flat Paper Container
        </FlatPaper>
        <RoundPaper style={style.paper}>
            Round Paper Container
        </RoundPaper>
        <CirclePaper style={style.paper}>
            Circle Paper Container
        </CirclePaper>
    </div>
);
