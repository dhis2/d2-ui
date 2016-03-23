import React from 'react';
import ReactDOM from 'react-dom';

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
        <SidebarExample currentSection={currentSection} searchText={searchText} />,
        document.getElementById('app')
    );
}

function changeSearchTextHandler(searchText) {
    console.log(searchText, currentSection, lastSection);
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
        paddingLeft: 264,
        paddingTop: 24,
    },
};

const sections = [
    { key: 's1', label: 'Section 1' },
    { key: 's2', label: 'Section 2' },
    { key: 's3', label: 'Section 3' },
    { key: 's4', label: 'Section 4' },
];

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
                        sections={sections.slice(0,2)}
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
        </div>
    );
}
SidebarExample.propTypes = {
    currentSection: React.PropTypes.string,
    searchText: React.PropTypes.string,
};

changeSectionHandler(sections[0].key);
