import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MuiPopover from 'material-ui/Popover';

const defaultStyle = {
    popoverStyle: { },
    headerStyle: {
        flexGrow: 1,
        paddingBottom: "20px"
    },
    containerStyle: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
    },
    footerStyle: {
        flexGrow: 1,
        paddingTop: "20px",
    },
}

class Popover extends Component {

    static propTypes = {
        style: PropTypes.object,
        button: PropTypes.object.isRequired,
        headerStyle: PropTypes.object,
        footerStyle: PropTypes.object,
        anchorOrigin: PropTypes.object,
        transformOrigin: PropTypes.object,
        anchorEl: PropTypes.object,
        header: PropTypes.node,
        children: PropTypes.node,
        footer: PropTypes.node,
        className: PropTypes.string,
    };

    static defaultProps = {
        style: defaultStyle.popoverStyle,
        containerStyle: defaultStyle.containerStyle,
        headerStyle: defaultStyle.headerStyle,
        footerStyle: defaultStyle.footerStyle,
        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
        transformOrigin: { horizontal: 'left', vertical: 'top' },
        className: '',
    };

    state = {
        open: false,
        anchorEl: this.props.anchorEl || null,
    };

    handleOpen = event => {
        event.preventDefault();

        const newState = { open: true, }

        if (!this.state.anchorEl) {
            newState.anchorEl = event.currentTarget;
        }

        this.setState(newState);
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render = () => {
        return (
            <div>
                {this.props.button ? 
                    React.cloneElement(this.props.button, { onClick: this.handleOpen }) : ''}
                <MuiPopover 
                    open={ this.state.open }
                    style={ this.props.style }
                    anchorEl={ this.state.anchorEl }
                    anchorOrigin={ this.props.anchorOrigin }
                    targetOrigin={ this.props.transformOrigin } // TODO: change to transformOrigin when MUI 1.0
                    onRequestClose={ this.handleClose }
                    className={ this.props.className }
                >
                    <div style={this.props.containerStyle}>
                        {this.props.header ? 
                            <header style={this.props.headerStyle}>
                                { this.props.header }
                            </header> : ''}
                        { this.props.children }
                        {this.props.footer ? 
                            <footer style={this.props.footerStyle}>
                                { this.props.footer }
                            </footer> : ''}
                    </div>
                </MuiPopover>
            </div>
        );
    };
};

export default Popover;
