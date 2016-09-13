import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

import Model from 'd2/lib/model/Model';
import ModelCollection from 'd2/lib/model/ModelCollection';

import TreeView from '../tree-view/TreeView.component';


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
            children: (
                props.root.children === false ||
                Array.isArray(props.root.children) && props.root.children.length === 0
            )
                ? []
                : undefined,
            loading: false,
        };
        if (props.root.children instanceof ModelCollection) {
            this.state.children = props.root.children
                .toArray()
                // Sort here since the API returns nested children in random order
                .sort((a, b) => a.displayName.localeCompare(b.displayName));
        }

        this.loadChildren = this.loadChildren.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.props.initiallyExpanded === this.props.root.id ||
            this.props.initiallyExpanded.indexOf(this.props.root.id) >= 0) {
            this.loadChildren();
        }
    }

    componentWillReceiveProps(newProps) {
        if ((newProps.initiallyExpanded === newProps.root.id ||
            newProps.initiallyExpanded.indexOf(newProps.root.id) >= 0) ||
            newProps.idsThatShouldBeReloaded.indexOf(newProps.root.id) >= 0) {
            this.loadChildren();
        }
    }

    loadChildren() {
        if ((this.state.children === undefined && !this.state.loading) || this.props.idsThatShouldBeReloaded.indexOf(this.props.root.id) >= 0) {
            this.setState({ loading: true });

            const root = this.props.root;
            root.modelDefinition.get(root.id, {
                fields: 'children[id,displayName,children::isNotEmpty,path,parent]',
            }).then(unit => {
                this.setState({ children: unit.children.toArray(), loading: false });
            });
        }
    }

    handleClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e, this.props.root);
        }
        e.stopPropagation();
    }

    renderChildren() {
        // If initiallyExpanded is an array, remove the current root id from it
        // If it's a string, pass it on unless it's the current root id
        const expandedProp = Array.isArray(this.props.initiallyExpanded)
            ? this.props.initiallyExpanded.filter(id => id !== this.props.root.id)
            : this.props.initiallyExpanded !== this.props.root.id && this.props.initiallyExpanded || [];

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
                    emitModel={this.props.emitModel}
                    idsThatShouldBeReloaded={this.props.idsThatShouldBeReloaded}
                />));
        }

        if (this.state.loading || true) {
            return <div style={styles.progress}><LinearProgress style={styles.progressBar} /></div>;
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
                <TreeView
                    label={label}
                    onExpand={this.loadChildren}
                    persistent
                    initiallyExpanded={initiallyExpanded}
                    arrowSymbol={this.props.arrowSymbol}
                >
                    {this.renderChildren()}
                </TreeView>
            );
        }

        return (
            <div onClick={this.handleClick}>
                <div style={styles.spacer}></div>{label}
            </div>
        );
    }
}

OrgUnitTree.propTypes = {
    /**
     * The root OrganisationUnit of the tree
     *
     * If the root OU is known to have no children, the `children` property of the root OU should be either
     * `false` or an empty array. If the children property is undefined, the children will be fetched from
     * the server when the tree is expanded.
     */
    root: React.PropTypes.instanceOf(Model).isRequired,

    /**
     * An array of IDs of selected OUs
     */
    selected: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string,
    ]),

    /**
     * An array of IDs of OUs that will be expanded automatically as soon as they are encountered
     *
     * Note that only IDs that are actually encountered during rendering are expanded. If you wish to expand
     * the tree until a specific OU, the IDs of all parent OUs of that OU will have to be included in the
     * initiallyExpanded array as well.
     */
    initiallyExpanded: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string,
    ]),

    /**
     * onClick callback, which is triggered when the label of an OU is clicked
     *
     * The onClick callback will receive two arguments: The original click event, and an object containing
     * the displayName and id of the OU that was clicked.
     */
    onClick: React.PropTypes.func,

    /**
     * Custom styling for OU labels
     */
    labelStyle: React.PropTypes.object,
    /**
     * Custom styling for the labels of selected OUs
     */
    selectedLabelStyle: React.PropTypes.object,
    /**
     * Custom arrow symbol
     */
    arrowSymbol: React.PropTypes.string,
    emitModel: React.PropTypes.bool,
};

OrgUnitTree.defaultProps = {
    selected: [],
    initiallyExpanded: [],
    labelStyle: {},
    selectedLabelStyle: {},
    idsThatShouldBeReloaded: [],
};

export default OrgUnitTree;
