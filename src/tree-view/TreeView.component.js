import React from 'react';

// TODO: Add a flag to keep children in DOM when collapsed

class TreeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: !props.initiallyExpanded,
        };
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
                marginLeft: 16,
                height: this.state.collapsed ? 0 : 'inherit',
            },
        };

        const label = (
            <div style={styles.treeLabel} onClick={this.toggleCollapsed.bind(this)}>
                <div style={styles.arrow}>{this.props.arrowSymbol}</div>
                {this.props.label}
            </div>
        );
        const children = !this.state.collapsed && (<div style={styles.children}>{this.props.children}</div>);

        return <div style={styles.tree}>{label}{children}</div>;
    }

    toggleCollapsed() {
        this.setState(state => {
            return { collapsed: !state.collapsed };
        });
    }
}

TreeView.propTypes = {
    label: React.PropTypes.node.isRequired,
    children: React.PropTypes.node,
    initiallyExpanded: React.PropTypes.bool,
    arrowSymbol: React.PropTypes.node,
};

TreeView.defaultProps = {
    arrowSymbol: '▾',
};

export default TreeView;
