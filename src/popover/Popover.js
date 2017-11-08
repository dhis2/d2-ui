import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MuiPopover from 'material-ui/Popover';

const defaultStyle = {
    popoverStyle: {
        overflow: "hidden",
    },
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
        open: PropTypes.bool,
        animated: PropTypes.bool,
        autoCloseWhenOffScreen: PropTypes.bool,
        style: PropTypes.object,
        button: PropTypes.object,
        headerStyle: PropTypes.object,
        footerStyle: PropTypes.object,
        animation: PropTypes.func,
        header: PropTypes.node,
        children: PropTypes.node,
        footer: PropTypes.node,
        className: PropTypes.string,
    };

    static defaultProps = {
        open: false,
        animated: true,
        autoCloseWhenOffScreen: true,
        style: defaultStyle.popoverStyle,
        containerStyle: defaultStyle.containerStyle,
        headerStyle: defaultStyle.headerStyle,
        footerStyle: defaultStyle.footerStyle,
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
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={ this.handleClose }
                    className={ this.props.className }
                >
                    <div style={this.props.containerStyle}>
                        {this.props.header ? 
                        <header style={this.props.headerStyle}>
                            { this.props.header }
                        </header> : ''}
                        
                        <div>
                            { this.props.children }
                        </div>

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
