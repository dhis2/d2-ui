import React from 'react';
import log from 'loglevel';
import CircularProgress from 'material-ui/lib/circular-progress';
import LinearProgress from 'material-ui/lib/linear-progress';

import Model from 'd2/lib/model/Model';
// Importing ModelCollection here causes problems with the unit tests, so mock it in stead
function ModelCollection() {}

import TreeView from '../tree-view';


const styles = {
    progress: {
        position: 'absolute',
        display: 'inline-block',
        width: '100%',
        left: -8,
    },
    progressBar: {
        height: 2,
        backgroundColor: 'transparent',
    },
    spacer: {
        position: 'relative',
        display: 'inline-block',
        width: '1.2rem',
        height: '1rem',
    },
    label: {
        display: 'inline-block',
    },
};

class OrgUnitTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            children: props.root.children === false ? [] : undefined,
            loading: false,
        };
        if (this.props.root.children instanceof ModelCollection) {
            this.state.children = this.props.root.children.toArray();
        }

        this.loadChildren = this.loadChildren.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.props.initiallyExpanded.indexOf(this.props.root.id) >= 0) {
            this.loadChildren();
        }
    }

    loadChildren() {
        if (this.state.children === undefined && !this.state.loading) {
            this.setState({ loading: true });

            const root = this.props.root;
            root.modelDefinition.list({
                paging: false,
                fields: 'id,displayName,children::isNotEmpty',
                filter: [
                    `parent.id:eq:${root.id}`,
                ],
            }).then(units => {
                this.setState({ children: units.toArray(), loading: false });
            });
        }
    }

    handleClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e, { id: this.props.root.id, displayName: this.props.root.displayName });
        }
        e.stopPropagation();
    }

    renderChildren() {
        const expandedProp = Array.isArray(this.props.initiallyExpanded) ?
            this.props.initiallyExpanded.filter(id => id !== this.props.root.id) :
            this.props.initiallyExpanded !== this.props.root.id && this.props.initiallyExpanded || [];

        if (Array.isArray(this.state.children) && this.state.children.length > 0) {
            return this.state.children.map(orgUnit => (
                <OrgUnitTree
                    key={orgUnit.id}
                    root={orgUnit}
                    selected={this.props.selected}
                    initiallyExpanded={expandedProp}
                    onClick={this.props.onClick}
                    labelStyle={this.props.labelStyle}
                    selectedLabelStyle={this.props.selectedLabelStyle}
                    arrowSymbol={this.props.arrowSymbol}
                />));
        }

        if (this.state.loading || true) {
            return <div style={styles.progress}><LinearProgress style={styles.progressBar}/></div>;
        }

        return null;
    }

    render() {
        const root = this.props.root;

        const isClickable = !!this.props.onClick;
        const isSelected = this.props.selected === root.id || this.props.selected.indexOf(root.id) >= 0;
        const initiallyExpanded = this.props.initiallyExpanded === root.id ||
            this.props.initiallyExpanded.indexOf(root.id) >= 0;

        const labelStyle = Object.assign({}, styles.label, {
            fontWeight: isSelected ? 700 : 300,
            color: isSelected ? 'orange' : 'inherit',
            cursor: isClickable ? 'pointer' : 'inherit',
        }, isSelected ? this.props.selectedLabelStyle : this.props.labelStyle);
        const label = (<div style={labelStyle} onClick={isClickable && this.handleClick}>{root.displayName}</div>);

        if (this.state.children === undefined || Array.isArray(this.state.children) && this.state.children.length > 0) {
            return (
                <div>
                    <TreeView
                        label={label}
                        onExpand={this.loadChildren}
                        persistent
                        initiallyExpanded={initiallyExpanded}
                        arrowSymbol={this.props.arrowSymbol}
                    >
                        {this.renderChildren()}
                    </TreeView>
                </div>
            );
        }

        return <div onClick={this.handleClick}>
            <div style={styles.spacer}></div>
            {label}</div>;
    }
}

OrgUnitTree.propTypes = {
    root: React.PropTypes.instanceOf(Model).isRequired,
    selected: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string,
    ]),
    initiallyExpanded: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string,
    ]),

    onClick: React.PropTypes.func,

    labelStyle: React.PropTypes.object,
    selectedLabelStyle: React.PropTypes.object,
    arrowSymbol: React.PropTypes.string,
};

OrgUnitTree.defaultProps = {
    selected: [],
    initiallyExpanded: [],
    labelStyle: {},
    selectedLabelStyle: {},
};

export default OrgUnitTree;
