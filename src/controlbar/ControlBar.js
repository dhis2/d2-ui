import React from 'react';
import PropTypes from 'prop-types';

import { createClassName } from '../component-helpers/utils';
import Button from '../button/Button';

const styles = {
    root: {
        position: 'fixed',
        top: 48,
        left: 0,
        right: 0,
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 4px 0px',
        transition: 'all ease-out 75ms',
        zIndex: 10,
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    endFlap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        backgroundImage: 'linear-gradient(transparent, white 5px, white)',
        transition: 'all ease-out 75ms',
    },
    dragHandle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 10,
        backgroundImage: 'linear-gradient(transparent, white 10px, white)',
        cursor: 'ns-resize',
        transition: 'all ease-out 75ms',
    },
    expandButtonWrap: {
        transition: 'all ease-out 75ms',
        marginTop: 5,
    },
    expandButton: {
        bottom: 0,
    },
};
const expandButtonHeight = 36;
const editModeBackgroundRGB = '255,249,196';


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

        const newHeight = event.clientY - 45 - (this.showExpandButton() ? expandButtonHeight : 0);

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

    showExpandButton() {
        return this.props.expandButtonLabel && typeof this.props.onExpandClick === 'function';
    }

    showDragHandle() {
        return typeof this.props.onChangeHeight === 'function';
    }

    endFlapHeight() {
        return (
            // (this.showExpandButton() || this.showDragHandle() ? 5 : 0) +
            (this.showExpandButton() ? expandButtonHeight + 5 : 0) +
            (this.showDragHandle() ? 10 : 0)
        );
    }

    renderEndFlap(showDragHandle, showExpandButton) {
        const backgroundColor = this.props.editMode ? editModeBackgroundRGB : '255,255,255';
        const dragLineColor = 'rgba(0,0,0,0.18)';

        const endFlapStyle = Object.assign({},
            styles.endFlap,
            { height: this.endFlapHeight() },
            { backgroundImage: `linear-gradient(transparent, rgb(${backgroundColor}) 5px, rgb(${backgroundColor}))` },
        );

        const buttonWrapStyle = Object.assign({},
            styles.expandButtonWrap,
            // { background: `rgb(${backgroundColor})` },
        );

        const dragFlapStyle = Object.assign({},
            styles.dragHandle,
            {
                backgroundImage: `linear-gradient(transparent,
                                                  transparent 3px,
                                                  ${dragLineColor} 3px,
                                                  ${dragLineColor} 4px,
                                                  transparent 4px,
                                                  transparent 6px,
                                                  ${dragLineColor} 6px,
                                                  ${dragLineColor} 7px,
                                                  transparent 7px,
                                                  transparent 10px,
                                                  transparent
                                   )`,
            },
        );

        return (
            <div style={endFlapStyle}>
                {showExpandButton ? (
                    <div style={buttonWrapStyle}>
                        <Button
                            onClick={this.props.onExpandClick}
                            color="primary"
                        >{this.props.expandButtonLabel}</Button>
                    </div>
                ) : null }
                {showDragHandle ? (
                    <div
                        style={dragFlapStyle}
                        onMouseDown={this.onStartDrag}
                    />
                ) : null }
            </div>
        );
    }

    render() {
        const className = createClassName('d2-ui-control-bar', this.props.selector);
        const showExpandButton = this.showExpandButton();
        const showDragHandle = typeof this.props.onChangeHeight === 'function';
        const height = Math.max(this.props.height, 0) + Math.max(this.endFlapHeight() - 12, 0);

        const rootStyle = Object.assign(
            {},
            styles.root,
            // Adjust height to make room for extra components
            { height },
            // Set background color for edit mode
            { background: this.props.editMode ? `rgb(${editModeBackgroundRGB})` : 'white' },
            // Disable animations while dragging
            this.state.dragging ? { transition: 'none' } : {},
            // Make room for content at the bottom when there's an expand button
            { paddingBottom: this.showExpandButton() ? expandButtonHeight : undefined },
        );

        return (
            <div style={rootStyle} className={className}>
                {this.props.children}
                {this.renderEndFlap(showDragHandle, showExpandButton)}
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
     * The label to use on the expand/collapse button. Default is 'Expand'.
     */
    expandButtonLabel: PropTypes.string,

    /**
     * Callback that gets called when the expand/collapse button is clicked.
     * The callback receives one argument: The original click event from the Button component.
     *
     * If no callback is specified the control bar will not have an expand/collapse button.
     */
    onExpandClick: PropTypes.func,

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
    expandButtonLabel: 'Expand',
    onExpandClick: null,
    selector: '',
};

export default ControlBar;
