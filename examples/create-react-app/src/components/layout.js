import React from 'react';
import Paper from 'material-ui/Paper';

import {TwoPanel} from '@dhis2/d2-ui-core';
import {SinglePanel} from '@dhis2/d2-ui-core';
import {MainContent} from '@dhis2/d2-ui-core';
import {Sidebar} from '@dhis2/d2-ui-core';
import {Heading} from '@dhis2/d2-ui-core';


const styles = {
    paper: {
        padding: '2rem',
        minHeight: '300px',
    },
    twoPanelMain: {
        marginTop: '2rem',
    },
    singlePanelMain: {
        marginTop: 0,
        backgroundColor: 'grey',
        border: '2px dashed magenta',
    },
};

const sections = [
    {
        key: '1',
        label: 'Section 1',
    },
    {
        key: '2',
        label: 'Section 2',
    },
    {
        key: '3',
        label: 'Section 3',
    },
];

function noop() {}

export default function LayoutExample (props) {
    return (
        <div>
            <TwoPanel mainStyle={styles.twoPanelMain}>
                <Sidebar
                    sections={sections}
                    onChangeSection={noop}
                />
                <MainContent>
                    <Paper style={styles.paper}>
                        <Heading>TwoPanelLayout &gt; MainContent &gt; Paper &gt; Heading </Heading>
                    </Paper>
                </MainContent>
            </TwoPanel>
            <SinglePanel mainStyle={styles.singlePanelMain}>
                <MainContent>
                    <Paper style={styles.paper}>
                        <Heading>SinglePanelLayout &gt; MainContent &gt; Paper &gt; Heading </Heading>
                    </Paper>
                </MainContent>
            </SinglePanel>
        </div>
    );
}
