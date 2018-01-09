import React from 'react';
import PropTypes from 'prop-types';

import { createClassName } from '../component-helpers/utils';
import SvgIcon from '../svg-icon/SvgIcon';

const styles = {
    root: {
        position: 'fixed',
        top: 48,
        left: 0,
        right: 0,
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 6px 3px',
        transition: 'all ease-out 75ms',
        zIndex: 10,
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    content: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    endFlap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        transition: 'all ease-out 75ms',
    },
    dragHandle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 10,
        cursor: 'ns-resize',
        transition: 'all ease-out 75ms',
        // borderTop: '1px solid rgba(0,0,0,0.3)',
    },
};

const BACKGROUND_RGB = '255,255,255';
const BACKGROUND_RGB_EDIT = '255,248,224';
const END_FLAP_HEIGHT = 10;

/**
 * The ControlBar component can be used to put an expandable horizontal bar underneath the DHIS header bar, useful for
 * UI elements that apply to the entire screen.
 */
class ControlBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dragging: false,
        };
    }

    onStartDrag = () => {
        this.setState({ dragging: true });
        window.addEventListener('mousemove', this.onDrag);
        window.addEventListener('mouseup', this.onEndDrag);
    };

    onDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const newHeight = event.clientY - 52;

        if (this.props.onChangeHeight && newHeight !== this.props.height && newHeight > 0) {
            requestAnimationFrame(() => {
                this.props.onChangeHeight(newHeight);
            });
        }
    };

    onEndDrag = () => {
        this.setState({ dragging: false });
        window.removeEventListener('mousemove', this.onDrag);
        window.removeEventListener('mouseup', this.onEndDrag);
    };

    getEndFlapHeight() {
        return this.showDragHandle() ? END_FLAP_HEIGHT : 0;
    }

    showDragHandle() {
        return typeof this.props.onChangeHeight === 'function';
    }

    renderEndFlap() {
        const backgroundColor = this.props.editMode ? BACKGROUND_RGB_EDIT : BACKGROUND_RGB;

        const endFlapStyle = {
            ...styles.endFlap,
            height: this.getEndFlapHeight(),
            backgroundColor: 'lightblue',
        };

        const dragFlapStyle = {
            ...styles.dragHandle,
            height: this.getEndFlapHeight(),
            backgroundColor: `rgb(${backgroundColor})`,
            // borderTop: this.showDragHandle() ? '1px solid rgba(0,0,0,0.3)' : '0px solid transparent',
        };

        const props = Object.assign(
            {},
            this.showDragHandle() ? { onMouseDown: this.onStartDrag } : {},
        );

        // Disable jsx-a11y no-role rule, because what's the alternative?
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div className="d2-ui-control-bar-endflap" style={endFlapStyle}>
                <div
                    className="d2-ui-control-bar-dragflap"
                    style={dragFlapStyle}
                    {...props}
                >
                    <SvgIcon icon={'DragHandle'} style={{ marginTop: -7, fill: 'rgba(0,0,0,0.3)' }} />
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }

    render() {
        const className = createClassName('d2-ui-control-bar', this.props.selector);
        const contentClassName = createClassName('d2-ui-control-bar-contents', this.props.selector);

        const height = Math.max(this.props.height, 0) + this.getEndFlapHeight();

        const rootStyle = Object.assign(
            {},
            styles.root,
            // Adjust height to make room for extra components
            { height },
            // Set background color for edit mode
            { background: this.props.editMode ? `rgb(${BACKGROUND_RGB_EDIT})` : 'white' },
            // Disable animations while dragging
            this.state.dragging ? { transition: 'none' } : {},
            // Make room for the end flap
            { paddingBottom: this.getEndFlapHeight() },
        );

        return (
            <div style={rootStyle} className={className}>
                <div style={styles.content} className={contentClassName}>
                    {this.props.children}
                </div>
                {this.renderEndFlap()}
            </div>
        );
    }
}

const positiveIntegerPropValidator = (props, propName, componentName) => {
    const propValue = props[propName];
    if (isNaN(parseFloat(propValue)) || !isFinite(propValue) ||
        !Number.isInteger(propValue) || props[propName] < 1) {
        // eslint-disable-next-line max-len
        return new Error(`Invalid prop \`${propName}\` with value \`${propValue}\` supplied to component \`${componentName}\`: Must be a positive integer`);
    }
    return undefined;
};

ControlBar.propTypes = {
    /**
     * The height of the control bar in number of lines. Must be a positive integer.
     */
    height: positiveIntegerPropValidator,

    /**
     * If true, the background color of the control bar changes to indicate that edit mode is active.
     */
    editMode: PropTypes.bool,

    /**
     * Callback function that is called when the control bar is resized.
     * The callback receives one argument: The new height in pixels.
     *
     * If no callback is specified the control bar will not have a drag handle.
     */
    onChangeHeight: PropTypes.func,

    /**
     * The contents of the control bar.
     */
    children: PropTypes.node.isRequired,

    /**
     * If set, adds a class to the element in the format d2-ui-control-bar-selector
     */
    selector: PropTypes.string,
};

ControlBar.defaultProps = {
    height: 32,
    editMode: false,
    onChangeHeight: null,
    selector: '',
};

export default ControlBar;
