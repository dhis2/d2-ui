import React from 'react';
import PropTypes from 'prop-types';

class TreeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: !props.initiallyExpanded,
            hasBeenExpanded: props.initiallyExpanded,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    toggleCollapsed() {
        this.setState(state => ({
            collapsed: !state.collapsed,
            hasBeenExpanded: true,
        }), () => {
            if (!this.state.collapsed && typeof this.props.onExpand === 'function') {
                this.props.onExpand(this.props.model);
            }

            if (this.state.collapsed && typeof this.props.onCollapse === 'function') {
                this.props.onCollapse(this.props.model);
            }
        });
    }

    componentWillReceiveProps(newProps) {
        // When initiallyExpanded status changed and the tree is collapsed we fire a toggleEvent to open it up
        if (newProps.initiallyExpanded && this.state.collapsed) {
            this.toggleCollapsed();
        }
    }

    handleClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
        if (e !== undefined) {
            e.stopPropagation();
        }
    }

    render() {
        const styles = {
            tree: {
                marginLeft: 16,
                whiteSpace: 'nowrap',
            },
            itemLabel: {
                display: 'inline-block',
                position: 'relative',
            },
            arrow: {
                display: 'inline-block',
                position: 'absolute',
                left: -16,
                top: -1,
                width: 11,
                height: 16,
                paddingLeft: 4,
                textAlign: 'center',
                cursor: 'pointer',
            },
            arrowSymbol: {
                transition: 'transform 150ms ease-out',
                transform: this.state.collapsed ? '' : 'rotate(90deg)',
                position: 'absolute',
            },
            clickTarget: {
                cursor: this.props.onClick && 'pointer',
            },
            children: {
                position: 'relative',
                marginLeft: 6,
                height: this.state.collapsed ? 0 : 'inherit',
            },
        };

        const label = (
            <div style={styles.itemLabel}>
                <div className="arrow" style={styles.arrow} onClick={this.toggleCollapsed.bind(this)}>
                    <div style={styles.arrowSymbol}>{this.props.arrowSymbol}</div>
                </div>
                <div className="label" onClick={this.handleClick} style={styles.clickTarget}>{this.props.label}</div>
            </div>
        );

        styles.children.display = this.state.collapsed ? 'none' : 'block';

        // Render children if not collapsed, or (persistent and has been expanded)
        const children = (!this.state.collapsed || (this.props.persistent && this.state.hasBeenExpanded)) && (
            <div className="children" style={styles.children}>{this.props.children}</div>
        );

        const className = `tree-view ${this.props.className}`;
        return <div className={className} style={{ ...styles.tree, ...this.props.style }}>{label}{children}</div>;
    }
}

// TODO: Documentation
TreeView.propTypes = {
    label: PropTypes.string,
    model: PropTypes.object,
    children: PropTypes.node,
    persistent: PropTypes.bool,
    initiallyExpanded: PropTypes.bool,
    arrowSymbol: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    onClick: PropTypes.func,
};

TreeView.defaultProps = {
    persistent: false,
    initiallyExpanded: false,
    arrowSymbol: '▸',
    style: {},
};

export default TreeView;
