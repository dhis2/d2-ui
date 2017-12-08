import React from 'react';
import { render } from 'react-dom';

import Toggle from 'material-ui/Toggle';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Button from '../../src/button/Button';
import ControlBar from '../../src/controlbar/ControlBar';

injectTapEventPlugin();

const rootEl = document.getElementById('app');

const headerStyles = {
    position: 'fixed',
    top: 0,
    height: 48,
    left: 0,
    right: 0,
    background: 'rgb(39, 102, 150)',
    color: 'white',
};

const controlBarContentStyles = {
    position: 'absolute',
    height: '100%',
};

const controlBarStyles = {
    height: '100%',
    fontSize: 20,
    lineHeight: '36px',
    overflowY: 'auto',
    paddingLeft: 16,
};

const initialHeight = 48;
let height = initialHeight;
let expandedHeight = 150;
let editMode = false;
let dragHandle = false;
let expandButton = false;

function renderControlBar() {
    render(<ControlBarWithLines />, rootEl);
}

function heightChangeHandler(newHeight) {
    height = Math.min(Math.max(newHeight, 8), 550);

    const marginHeight = (96 - initialHeight) +
        (expandButton ? 36 : 0) +
        (dragHandle && expandButton ? 10 : 0) +
        height;
    document.body.style.marginTop = `${marginHeight}px`;

    if (editMode) {
        if (height > initialHeight) {
            expandedHeight = height;
        }
    }

    renderControlBar();
}

function isExpanded() {
    return height > initialHeight;
}

function expandClick(...args) {
    console.info('Expand click:', ...args);
    heightChangeHandler(isExpanded() ? initialHeight : expandedHeight);
}

const addLine = () => { height += 36; heightChangeHandler(height); renderControlBar(); };
const remLine = () => { height -= 36; heightChangeHandler(height); renderControlBar(); };

const addLines = num => () => { height += num * 36; heightChangeHandler(height); renderControlBar(); };

const toggleEditMode = () => { editMode = !editMode; heightChangeHandler(height); renderControlBar(); };
const toggleDragHandle = () => { dragHandle = !dragHandle; heightChangeHandler(height); renderControlBar(); };
const toggleExpandButton = () => { expandButton = !expandButton; heightChangeHandler(height); renderControlBar(); };

function ControlBarWithLines() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <div style={headerStyles}><div style={{ padding: 16 }}>Placeholder header bar</div></div>
                <ControlBar
                    editMode={editMode}
                    height={height}
                    onChangeHeight={dragHandle && heightChangeHandler || null}
                    onExpandClick={expandButton && expandClick || null}
                    expandButtonLabel={isExpanded() ? 'Collapse' : 'Expand'}
                >
                    <div style={controlBarStyles} className="control-bar-contents">
                        This is where the contents of the control bar would, like, you know... Go.<br />
                        <Button onClick={() => {}} raised style={{ marginRight: 16 }}>Button</Button>
                        <Button onClick={() => {}} color="primary" raised style={{ marginRight: 16 }}>Button</Button>
                        <Button onClick={() => {}} color="accent" raised style={{ marginRight: 16 }}>Button</Button>
                        <Button onClick={() => {}} color="primary" style={{ marginRight: 16 }}>Button</Button>
                        <Button onClick={() => {}} color="accent" style={{ marginRight: 16 }}>Button</Button>
                        <Button onClick={() => {}}>Button</Button>
                        <br />
                        <h1>Lorem ipsum dolor</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, <em>quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.</em> Duis aute irure dolor in
                            reprehenderit in <a href="https://placeholder.com/lorem-ipsum/">voluptate velit</a> esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <h2>Lorem ipsum dolor</h2>
                        <p>
                            <strong><a href="https://placeholder.com/lorem-ipsum/">Lorem ipsum</a> dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.</strong> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <ul>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>consectetur adipiscing elit</li>
                        </ul>
                        <h3>Lorem ipsum dolor</h3>
                        <ol>
                            <li>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
                            <li>Ut enim ad minim veniam</li>
                        </ol>
                        <h4>Lorem ipsum dolor</h4>
                        <p>
                            <a href="https://placeholder.com/lorem-ipsum/">Lorem ipsum</a> dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                            officia deserunt mollit anim id est laborum.
                        </p>
                        <div>
                            <img src="http://via.placeholder.com/175x150" style={{ paddingRight: 16 }} />
                            <img src="http://via.placeholder.com/175x150" style={{ paddingRight: 16 }} />
                            <img src="http://via.placeholder.com/175x150" style={{ paddingRight: 16 }} />
                            <img src="http://via.placeholder.com/175x150" />
                        </div>
                    </div>
                </ControlBar>
                <div>
                    <p>This here be a example of control bar stuffs yo.</p>
                    <Button color="primary" onClick={addLine}>+ Add</Button>
                    <Button color="primary" onClick={addLines(5)} style={{ marginRight: 16 }}>+5</Button>
                    <Button color="accent" onClick={remLine}>- Remove</Button>
                    <Button color="accent" onClick={addLines(-5)} style={{ marginRight: 16 }}>-5</Button>
                    <Button onClick={expandClick}>{ isExpanded() ? 'Collapse' : 'Expand' }</Button>
                    <div style={{ maxWidth: 250 }}>
                        <Toggle style={{ display:'inline-block' }} onClick={toggleEditMode} label="Edit mode" />
                        <Toggle style={{ display:'inline-block' }} onClick={toggleDragHandle} label="Draggable" />
                        <Toggle style={{ display:'inline-block' }} onClick={toggleExpandButton} label="Expandable" />
                    </div>
                </div>
                <div>
                    <ul>
                        <li>Initial height: {initialHeight}</li>
                        <li>Current height: {height}</li>
                        <li>Expanded height: {expandedHeight}</li>
                        <li>Edit mode: {editMode ? 'Enabled' : 'Disabled'}</li>
                        <li>Drag handle: {dragHandle ? 'Enabled' : 'Disabled'}</li>
                        <li>Expand button: {expandButton ? 'Enabled' : 'Disabled'}</li>
                    </ul>
                </div>
            </div>
        </MuiThemeProvider>
    );
}

renderControlBar();
