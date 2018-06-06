import React from 'react';

import {FlatContainer, RoundContainer, CircleContainer} from '@dhis2/d2-ui-core';

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
        <FlatContainer style={style.paper}>
            Flat Paper Container
        </FlatContainer>
        <RoundContainer style={style.paper}>
            Round Paper Container
        </RoundContainer>
        <CircleContainer style={style.paper}>
            Circle Paper Container
        </CircleContainer>
    </div>
);
