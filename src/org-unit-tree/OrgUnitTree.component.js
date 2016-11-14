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
    changeRootLabel: {
        fontSize: 11,
        display: 'inline-block',
        fontWeight: 300,
        marginLeft: 8,
        color: 'blue',
        cursor: 'pointer',
    },
    line: {
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRightWidth: 0,
        borderRadius: '3px 0 0 3px',
        background: 'transparent',
        paddingLeft: 2,
    },
    currentLine: {
        background: 'rgba(0,0,0,0.05)',
        borderColor: 'rgba(0,0,0,0.1)',
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
                this.setState({
                    children: unit.children
                        .toArray()
                        .sort((a, b) => a.displayName.localeCompare(b.displayName)),
                    loading: false,
                });
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
        // If initiallyExpanded is an array, remove the current root id and pass the rest on
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
                    currentRoot={this.props.currentRoot}
                    onChangeCurrentRoot={this.props.onChangeCurrentRoot}
                    labelStyle={this.props.labelStyle}
                    selectedLabelStyle={this.props.selectedLabelStyle}
                    arrowSymbol={this.props.arrowSymbol}
                    idsThatShouldBeReloaded={this.props.idsThatShouldBeReloaded}
                />));
        }

        if (this.state.loading || true) {
            return <div style={styles.progress}><LinearProgress style={styles.progressBar} /></div>;
        }

        return null;
    }

    render() {
        const currentOu = this.props.root;

        // Calculate properties of the current org unit
        const isChild = !!currentOu.parent;
        const hasChildren = this.state.children === undefined || Array.isArray(this.state.children) &&
            this.state.children.length > 0;
        const isClickable = !!this.props.onClick;
        const isSelected = this.props.selected === currentOu.id || this.props.selected.includes(currentOu.id);
        const isCurrentRoot = this.props.currentRoot && this.props.currentRoot.id === currentOu.id;
        const isInitiallyExpanded = this.props.initiallyExpanded === currentOu.id ||
            this.props.initiallyExpanded.includes(currentOu.id);
        const canBecomeCurrentRoot = this.props.onChangeCurrentRoot && !isCurrentRoot && hasChildren;

        const labelStyle = Object.assign({}, styles.label, {
            fontWeight: isSelected ? 700 : 300,
            color: isSelected ? 'orange' : 'inherit',
            cursor: isClickable ? 'pointer' : 'inherit',
        }, isSelected ? this.props.selectedLabelStyle : this.props.labelStyle);
        const lineStyle = Object.assign({}, styles.line, isCurrentRoot ? styles.currentLine : {});

        const setCurrentRoot = (e) => {
            e.stopPropagation();
            // If this org unit is the root of the tree, clear the current root
            // Otherwise set the current root to this org unit
            this.props.onChangeCurrentRoot(currentOu);
        };

        const label = (
            <div style={labelStyle} onClick={isClickable && this.handleClick}>
                {currentOu.displayName}
                {canBecomeCurrentRoot && (
                    <div style={styles.changeRootLabel}
                         onClick={setCurrentRoot}
                         className="change-root"
                    >{this.props.changeRootLabel}</div>
                )}
            </div>
        );

        if (hasChildren) {
            return (
                <TreeView
                    label={label}
                    onExpand={this.loadChildren}
                    persistent
                    initiallyExpanded={isInitiallyExpanded}
                    arrowSymbol={this.props.arrowSymbol}
                    className="orgunit with-children"
                    style={lineStyle}
                >
                    {this.renderChildren()}
                </TreeView>
            );
        }

        return (
            <div onClick={this.handleClick}
                 className="orgunit without-children"
                 style={lineStyle}
            >
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
     * onChangeCurrentRoot callback, which is triggered when the change current root label is clicked. Setting this also
     * enables the display of the change current root label
     *
     * the onChangeCurrentRoot callback will receive two arguments: The original click event, and the organisation unit
     * model object that was selected as the new root
     */
    onChangeCurrentRoot: React.PropTypes.func,

    /**
     * Organisation unit model representing the current root
     *
     * Setting this to the root org unit (where level=1) has the same effect as setting it to undefined
     */
    currentRoot: React.PropTypes.object,

    /**
     * The text of the label that may be clicked to change the current root
     *
     * If no other value is specified, this is set to 'Select →'
     */
    changeRootLabel: React.PropTypes.string,

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
};

OrgUnitTree.defaultProps = {
    selected: [],
    initiallyExpanded: [],
    changeRootLabel: 'Select →',
    labelStyle: {},
    selectedLabelStyle: {},
    idsThatShouldBeReloaded: [],
};

export default OrgUnitTree;
