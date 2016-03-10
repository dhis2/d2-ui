import React from 'react';


class TreeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: !props.initiallyExpanded,
            hasBeenExpanded: props.initiallyExpanded,
        };
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

    render() {
        const styles = {
            tree: {
                marginLeft: 16,
            },
            treeLabel: {
                display: 'inline-block',
                cursor: 'pointer',
            },
            arrow: {
                display: 'inline-block',
                marginLeft: -16,
                marginRight: 8,
                transition: 'transform 150ms ease-out',
                transform: this.state.collapsed ? 'rotate(-90deg)' : '',
            },
            children: {
                position: 'relative',
                marginLeft: 8,
                height: this.state.collapsed ? 0 : 'inherit',
            },
        };

        const label = (
            <div className="label" style={styles.treeLabel} onClick={this.toggleCollapsed.bind(this)}>
                <div style={styles.arrow}>{this.props.arrowSymbol}</div>
                {this.props.label}
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

// TODO: Document props
TreeView.propTypes = {
    label: React.PropTypes.node.isRequired,
    children: React.PropTypes.node,
    persistent: React.PropTypes.bool,
    initiallyExpanded: React.PropTypes.bool,
    arrowSymbol: React.PropTypes.node,

    onExpand: React.PropTypes.func,
};

TreeView.defaultProps = {
    persistent: false,
    initiallyExpanded: false,
    arrowSymbol: '▾',
};

export default TreeView;
