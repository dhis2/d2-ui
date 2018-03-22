import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';

import TwoPanelLayout from '../../src/layout/TwoPanel.component';
import SinglePanelLayout from '../../src/layout/SinglePanel.component';
import MainContent from '../../src/layout/main-content/MainContent.component';
import Sidebar from '../../src/sidebar/Sidebar.component';
import Heading from '../../src/headings/Heading.component';


injectTapEventPlugin();

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

const layout = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <TwoPanelLayout mainStyle={styles.twoPanelMain}>
                <Sidebar
                    sections={sections}
                    onChangeSection={noop}
                />
                <MainContent>
                    <Paper style={styles.paper}>
                        <Heading>TwoPanelLayout &gt; MainContent &gt; Paper &gt; Heading </Heading>
                    </Paper>
                </MainContent>
            </TwoPanelLayout>
            <SinglePanelLayout mainStyle={styles.singlePanelMain}>
                <MainContent>
                    <Paper style={styles.paper}>
                        <Heading>SinglePanelLayout &gt; MainContent &gt; Paper &gt; Heading </Heading>
                    </Paper>
                </MainContent>
            </SinglePanelLayout>
        </div>
    </MuiThemeProvider>
);

render(layout, document.getElementById('layout'));
