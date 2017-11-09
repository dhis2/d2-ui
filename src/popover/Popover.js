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
        animated: PropTypes.bool,
        autoCloseWhenOffScreen: PropTypes.bool,
        style: PropTypes.object,
        button: PropTypes.object,
        headerStyle: PropTypes.object,
        footerStyle: PropTypes.object,
        anchorOrigin: PropTypes.object,
        targetOrigin: PropTypes.object,
        animation: PropTypes.func,
        header: PropTypes.node,
        children: PropTypes.node,
        footer: PropTypes.node,
        className: PropTypes.string,
    };


    static defaultProps = {
        animated: true,
        autoCloseWhenOffScreen: true,
        style: defaultStyle.popoverStyle,
        containerStyle: defaultStyle.containerStyle,
        headerStyle: defaultStyle.headerStyle,
        footerStyle: defaultStyle.footerStyle,
        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
        targetOrigin: { horizontal: 'left', vertical: 'top' },
        className: '',
    };

    state = {
        open: false,
    };

    handleOpen = event => {
        event.preventDefault();
        this.setState({
            open: true,
            anchorElement: event.currentTarget,
        });
    };
    
    handleClose = () => {
        this.setState({open: false});
    };

    render = () => {
        return (
            <div>
                {this.props.button ? 
                    React.cloneElement(this.props.button, { onClick: this.handleOpen, }) : ''}
                <MuiPopover 
                    open={ this.state.open }
                    style={ this.props.style }
                    animated={ this.props.animated }
                    autoCloseWhenOffScreen={ this.props.autoCloseWhenOffScreen }
                    anchorEl={ this.state.anchorElement }
                    anchorOrigin={this.props.anchorOrigin}
                    targetOrigin={this.props.targetOrigin}
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
