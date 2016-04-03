import React from 'react';


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
            if (!this.state.collapsed && this.props.onExpand instanceof Function) {
                this.props.onExpand();
            }
        });
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
                left: -12, top: -2, width: '1rem', height: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
            },
            arrowSymbol: {
                transition: 'transform 150ms ease-out',
                transform: this.state.collapsed ? '' : 'rotate(90deg)',
                position: 'absolute',
            },
            clickTarget: {
                cursor: 'pointer',
            },
            children: {
                position: 'relative',
                marginLeft: 16,
                height: this.state.collapsed ? 0 : 'inherit',
            },
        };
        if (!this.props.onClick) {
            styles.clickTarget.cursor = 'initial';
        }

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

        return <div className="tree-view" style={styles.tree}>{label}{children}</div>;
    }
}

// TODO: Documentation
TreeView.propTypes = {
    label: React.PropTypes.node.isRequired,
    children: React.PropTypes.node,
    persistent: React.PropTypes.bool,
    initiallyExpanded: React.PropTypes.bool,
    arrowSymbol: React.PropTypes.node,

    onExpand: React.PropTypes.func,
    onClick: React.PropTypes.func,
};

TreeView.defaultProps = {
    persistent: false,
    initiallyExpanded: false,
    arrowSymbol: '▸',
};

export default TreeView;
