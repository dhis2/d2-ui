import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import styles, { MENU_ITEM_WIDTH } from '../header-bar-styles';
import HeaderMenuItems from './HeaderMenuItems';

class HeaderMenu extends Component {
    constructor(...args) {
        super(...args);

        this.state = {};

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    render() {
        const itemsPerRow = this.props.rowItemCount;
        const menuWidth = itemsPerRow * MENU_ITEM_WIDTH;
        const { name, children } = this.props;
        const menuStyle = Object.assign({}, styles.dropDownWrap, {
            display: this.state.open ? 'flex' : 'none',
            right: this.state.showScrollBar ? 20 : styles.dropDownWrap.right,
            width: this.state.showScrollBar ? menuWidth + 55 : menuWidth + 35,
        }, this.props.menuStyle);

        const useScrollAfterNumberOfRows = this.props.columnItemCount * MENU_ITEM_WIDTH;
        const calculatedHeight = Math.ceil(children.length / itemsPerRow) * MENU_ITEM_WIDTH;
        const innerMenuProps = {
            height: calculatedHeight > useScrollAfterNumberOfRows ? useScrollAfterNumberOfRows : calculatedHeight,
            width: this.state.showScrollBar ? menuWidth + 35 : menuWidth + 55,
            marginRight: this.state.showScrollBar ? 0 : -30,
            onScroll: this.onScroll.bind(this),
            padding: this.props.padding,
        };

        return (
            <div
                style={styles.headerMenu}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                {name}
                <div style={{ paddingTop: 55 }}>
                    <Paper style={menuStyle}>
                        <HeaderMenuItems {...innerMenuProps}>
                            {children}
                        </HeaderMenuItems>
                        {this.props.rightSide}
                        {this.props.moreButton}
                    </Paper>
                </div>
            </div>
        );
    }

    onMouseEnter(event) {
        this.setState({
            anchor: event.target,
            open: true,
        });
    }

    onMouseLeave() {
        this.setState({
            open: false,
        });
    }

    onScroll(event) {
        this.setState({
            showScrollBar: event.target.scrollTop > 1,
        });
    }
}

export default HeaderMenu;
