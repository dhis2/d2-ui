import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Sidebar from '../../src/sidebar/Sidebar.component';

let currentSection;
let lastSection;
let sidebarRef;

function changeSectionHandler(key, searchText) {
    currentSection = key;
    if (key !== 'search' && sidebarRef) {
        sidebarRef.clearSearchBox();
    }
    ReactDOM.render(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <SidebarExample currentSection={currentSection} searchText={searchText} />
        </MuiThemeProvider>,
        document.getElementById('app'),
    );
}

function changeSearchTextHandler(searchText) {
    if (searchText.toString().trim().length > 0) {
        if (currentSection !== 'search') {
            lastSection = currentSection;
        }
        changeSectionHandler('search', searchText);
    } else {
        changeSectionHandler(lastSection);
    }
}

function storeRef(ref) {
    sidebarRef = ref;
}

const styles = {
    box: {
        position: 'relative',
        border: '1px solid #808080',
        borderRadius: 3,
        width: 512,
        height: 256,
        float: 'left',
        margin: 16,
    },
    header: {
        height: 44,
        background: '#276696',
        color: 'white',
        fontSize: 16,
        fontWeight: 700,
    },
    headerText: {
        padding: 12,
    },
    leftBar: {
        position: 'absolute',
    },
    page: {
        paddingLeft: 295 + 8,
        paddingTop: 24,
    },
};

const sections = [
    { key: 's1', label: 'Section 1' },
    { key: 's2', label: 'Section 2' },
    { key: 's3', label: 'Section 3' },
    { key: 's4', label: 'Section 4' },
];

const icons = ['fingerprint', 'alarm', '', 'face'];

function SidebarExample(props) {
    return (
        <div>
            <div style={styles.box}>
                <div style={styles.header}>
                    <div style={styles.headerText}>Simple Sidebar</div>
                </div>
                <div style={styles.leftBar}>
                    <Sidebar
                        sections={sections}
                        onChangeSection={changeSectionHandler}
                        currentSection={props.currentSection}
                    />
                </div>
                <div style={styles.page}>Current section: {props.currentSection}</div>
            </div>
            <div style={styles.box}>
                <div style={styles.header}>
                    <div style={styles.headerText}>Sidebar with Search</div>
                </div>
                <div style={styles.leftBar}>
                    <Sidebar
                        sections={sections.slice(0, 2)}
                        onChangeSection={changeSectionHandler}
                        currentSection={props.currentSection}
                        showSearchField
                        searchFieldLabel="Search"
                        onChangeSearchText={changeSearchTextHandler}
                        ref={storeRef}
                    />
                </div>
                <div style={styles.page}>
                    Current section: {props.currentSection}<br />
                    Current search: {props.searchText}
                </div>
            </div>

            {/* With icons */}
            <div style={styles.box}>
                <div style={styles.header}>
                    <div style={styles.headerText}>Sidebar with icon names</div>
                </div>
                <div style={styles.leftBar}>
                    <Sidebar
                        sections={sections.map(({ key, label }, i) => ({ key, label, icon: icons[i] }))}
                        onChangeSection={changeSectionHandler}
                        currentSection={props.currentSection}
                    />
                </div>
                <div style={styles.page}>
                    Current section: {props.currentSection}<br /><br />
                    Icons are simple strings, which are converted into Material icons &lt;FontIcon /> elements by the
                    Sidebar component.<br /><br />
                    This requires that the Material icons font is loaded by the app.
                </div>
            </div>
            <div style={styles.box}>
                <div style={styles.header}>
                    <div style={styles.headerText}>Sidebar with explicit icons</div>
                </div>
                <div style={styles.leftBar}>
                    <Sidebar
                        sections={sections.map(({ key, label }, i) => ({
                            key,
                            label,
                            icon: <FontIcon className="material-icons">{icons[i]}</FontIcon>,
                        }))}
                        onChangeSection={changeSectionHandler}
                        currentSection={props.currentSection}
                    />
                </div>
                <div style={styles.page}>
                    Current section: {props.currentSection}<br /><br />
                    Icons are passed to the Sidebar component as &lt;FontIcon /> elements.<br /><br />
                    This allows using custom icon fonts, or even SVG icons.
                </div>
            </div>
            <div style={styles.box}>
                <div style={styles.header}>
                    <div style={styles.headerText}>Simple Sidebar with paths</div>
                </div>
                <div style={styles.leftBar}>
                    <Sidebar
                        sections={sections.map(({ key, label }, i) => ({
                            key,
                            label,
                            path: key,
                        }))}
                        currentSection={props.currentSection}
                    />
                </div>
            </div>

            {/* TODO: With top buttons (sidebarButtons prop) */}
            {/* TODO: With custom styles */}
        </div>
    );
}
SidebarExample.propTypes = {
    currentSection: PropTypes.string,
    searchText: PropTypes.string,
};

changeSectionHandler(sections[0].key);
