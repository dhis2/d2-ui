import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';
import styles from '../header-bar-styles';

class HeaderMenu extends Component {
    constructor(...args) {
        super(...args);

        this.state = {};

        this._mouseEnter = this._mouseEnter.bind(this);
        this._mouseLeave = this._mouseLeave.bind(this);
        this._onScroll = this._onScroll.bind(this);
    }

    render() {
        const itemsPerRow = this.props.rowItemCount;
        const menuWidth = itemsPerRow * 125;
        const { name, children } = this.props;
        const menuStyle = Object.assign({}, styles.dropDownWrap, {
            display: this.state.open ? 'flex' : 'none',
            right: this.state.showScrollBar ? 20 : styles.dropDownWrap.right,
            width: this.state.showScrollBar ? menuWidth + 55 : menuWidth + 35,
        });

        const useScrollAfterNumberOfRows = this.props.columnItemCount * 125;
        const calculatedHeight = Math.ceil(children.length / itemsPerRow) * 125;
        const innerMenuStyle = {
            height: calculatedHeight > useScrollAfterNumberOfRows ? useScrollAfterNumberOfRows : calculatedHeight,
            width: this.state.showScrollBar ? menuWidth + 35 : menuWidth + 55,
            overflowY: 'scroll',
            marginRight: this.state.showScrollBar ? 0 : -30,
            display: 'flex',
            flexWrap: 'wrap',
            boxSizing: 'content-box',
        };

        return (
            <div
                style={styles.headerMenu}
                onMouseEnter={this._mouseEnter}
                onMouseLeave={this._mouseLeave}
            >
                {name}
                <div style={{paddingTop: 55}}>
                    <Paper style={menuStyle}>
                        <div style={innerMenuStyle} onScroll={this._onScroll}>
                            {children}
                        </div>
                        {this.props.moreButton}
                    </Paper>
                </div>
            </div>
        );
    }

    _mouseEnter(event) {
        this.setState({
            anchor: event.target,
            open: true,
        });
    }

    _mouseLeave() {
        this.setState({
            open: false,
        });
    }

    _onScroll(event) {
        this.setState({
            showScrollBar: event.target.scrollTop > 1,
        });
    }
}

export default HeaderMenu;
