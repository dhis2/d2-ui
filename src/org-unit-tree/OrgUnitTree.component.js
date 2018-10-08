import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';

import ModelBase from 'd2/lib/model/Model';
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
        outline: 'none',
    },
    ouContainer: {
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRightWidth: 0,
        borderRadius: '3px 0 0 3px',
        background: 'transparent',
        paddingLeft: 2,
        outline: 'none',
    },
    currentOuContainer: {
        background: 'rgba(0,0,0,0.05)',
        borderColor: 'rgba(0,0,0,0.1)',
    },
    memberCount: {
        fontSize: '0.75rem',
        marginLeft: 4,
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
        if (props.root.children instanceof ModelCollection && !props.root.children.hasUnloadedData) {
            this.state.children = props.root.children
                .toArray()
                // Sort here since the API returns nested children in random order
                .sort((a, b) => a.displayName.localeCompare(b.displayName));
        }

        this.loadChildren = this.loadChildren.bind(this);
        this.handleSelectClick = this.handleSelectClick.bind(this);
    }

    componentDidMount() {
        if (this.props.initiallyExpanded.some(ou => ou.includes(`/${this.props.root.id}`))) {
            this.loadChildren();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.initiallyExpanded.some(ou => ou.includes(`/${newProps.root.id}`)) ||
            newProps.idsThatShouldBeReloaded.includes(newProps.root.id)) {
            this.loadChildren();
        }
    }

    setChildState(children) {
        if (this.props.onChildrenLoaded) {
            this.props.onChildrenLoaded(children);
        }
        this.setState({
            children: children.toArray().sort((a, b) => a.displayName.localeCompare(b.displayName)),
            loading: false,
        });
    }

    loadChildren() {
        if ((this.state.children === undefined && !this.state.loading) ||
            this.props.idsThatShouldBeReloaded.indexOf(this.props.root.id) >= 0) {
            this.setState({ loading: true });

            const root = this.props.root;
            // d2.ModelCollectionProperty.load takes a second parameter `forceReload` and will just return
            // the current valueMap unless either `this.hasUnloadedData` or `forceReload` are true
            root.children.load(
                { fields: 'id,displayName,children::isNotEmpty,path,parent' },
                this.props.forceReloadChildren,
            ).then((children) => {
                this.setChildState(children);
            });
        }
    }

    handleSelectClick(e) {
        if (this.props.onSelectClick) {
            this.props.onSelectClick(e, this.props.root);
        }
        e.stopPropagation();
    }

    shouldIncludeOrgUnit(orgUnit) {
        if (!this.props.orgUnitsPathsToInclude || this.props.orgUnitsPathsToInclude.length === 0) {
            return true;
        }
        return !!(this.props.orgUnitsPathsToInclude.some(ou => ou.includes(`/${orgUnit.id}`)));
    }

    renderChild(orgUnit, expandedProp) {
        if (this.shouldIncludeOrgUnit(orgUnit)) {
            return (
                <OrgUnitTree
                    key={orgUnit.id}
                    root={orgUnit}
                    selected={this.props.selected}
                    initiallyExpanded={expandedProp}
                    onSelectClick={this.props.onSelectClick}
                    currentRoot={this.props.currentRoot}
                    onChangeCurrentRoot={this.props.onChangeCurrentRoot}
                    labelStyle={this.props.labelStyle}
                    selectedLabelStyle={this.props.selectedLabelStyle}
                    arrowSymbol={this.props.arrowSymbol}
                    idsThatShouldBeReloaded={this.props.idsThatShouldBeReloaded}
                    hideCheckboxes={this.props.hideCheckboxes}
                    onChildrenLoaded={this.props.onChildrenLoaded}
                    hideMemberCount={this.props.hideMemberCount}
                    orgUnitsPathsToInclude={this.props.orgUnitsPathsToInclude}
                    forceReloadChildren={this.props.forceReloadChildren}
                />
            );
        }
        return null;
    }

    renderChildren() {
        // If initiallyExpanded is an array, remove the current root id and pass the rest on
        // If it's a string, pass it on unless it's the current root id
        const expandedProp = Array.isArray(this.props.initiallyExpanded)
            ? this.props.initiallyExpanded.filter(id => id !== this.props.root.id)
            : (this.props.initiallyExpanded !== this.props.root.id && this.props.initiallyExpanded) || [];

        if (Array.isArray(this.state.children) && this.state.children.length > 0) {
            return this.state.children.map(orgUnit => this.renderChild(orgUnit, expandedProp));
        }

        if (this.state.loading) {
            return <div style={styles.progress}><LinearProgress style={styles.progressBar} /></div>;
        }

        return null;
    }

    render() {
        const currentOu = this.props.root;

        // True if this OU has children = is not a leaf node
        const hasChildren = this.state.children === undefined ||
            (Array.isArray(this.state.children) && this.state.children.length > 0);
        // True if a click handler exists
        const isSelectable = !!this.props.onSelectClick;
        const pathRegEx = new RegExp(`/${currentOu.id}$`);
        const memberRegEx = new RegExp(`/${currentOu.id}`);
        const isSelected = this.props.selected && this.props.selected.some(ou => pathRegEx.test(ou));
        // True if this OU is the current root
        const isCurrentRoot = this.props.currentRoot && this.props.currentRoot.id === currentOu.id;
        // True if this OU should be expanded by default
        const isInitiallyExpanded = this.props.initiallyExpanded.some(ou => ou.includes(`/${currentOu.id}`));
        // True if this OU can BECOME the current root, which means that:
        // 1) there is a change root handler
        // 2) this OU is not already the current root
        // 3) this OU has children (is not a leaf node)
        const canBecomeCurrentRoot = this.props.onChangeCurrentRoot && !isCurrentRoot && hasChildren;

        const memberCount = this.props.selected !== undefined
            ? this.props.selected.filter(ou => memberRegEx.test(ou)).length
            : currentOu.memberCount;

        // Hard coded styles for OU name labels - can be overridden with the selectedLabelStyle and labelStyle props
        const labelStyle = Object.assign({}, styles.label, {
            fontWeight: isSelected ? 500 : 300,
            color: isSelected ? 'orange' : 'inherit',
            cursor: canBecomeCurrentRoot ? 'pointer' : 'default',
        }, isSelected ? this.props.selectedLabelStyle : this.props.labelStyle);

        // Styles for this OU and OUs contained within it
        const ouContainerStyle = Object.assign({}, styles.ouContainer, isCurrentRoot ? styles.currentOuContainer : {});

        // Wrap the change root click handler in order to stop event propagation
        const setCurrentRoot = (e) => {
            e.stopPropagation();
            this.props.onChangeCurrentRoot(currentOu);
        };

        const label = (
            <div
                style={labelStyle}
                onClick={(canBecomeCurrentRoot && setCurrentRoot) || (isSelectable && this.handleSelectClick)}
                role="button"
                tabIndex={0}
            >
                {isSelectable && !this.props.hideCheckboxes && (
                    <input
                        type="checkbox"
                        readOnly
                        disabled={!isSelectable}
                        checked={isSelected}
                        onClick={this.handleSelectClick}
                    />
                )}
                {currentOu.displayName}
                {hasChildren && !this.props.hideMemberCount && !!memberCount && (
                    <span style={styles.memberCount}>({memberCount})</span>
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
                    style={ouContainerStyle}
                >
                    {this.renderChildren()}
                </TreeView>
            );
        }

        return (
            <div
                onClick={isSelectable && this.handleSelectClick}
                className="orgunit without-children"
                style={ouContainerStyle}
                role="button"
                tabIndex={0}
            >
                <div style={styles.spacer} />
                {label}
            </div>
        );
    }
}

function orgUnitPathPropValidator(propValue, key, compName, location, propFullName) {
    if (!/(\/[a-zA-Z][a-zA-Z0-9]{10})+/.test(propValue[key])) {
        return new Error(`Invalid org unit path \`${propValue[key]}\` supplied to \`${compName}.${propFullName}\``);
    }
    return undefined;
}

OrgUnitTree.propTypes = {
    /**
     * The root OrganisationUnit of the tree
     *
     * If the root OU is known to have no children, the `children` property of the root OU should be either
     * `false` or an empty array. If the children property is undefined, the children will be fetched from
     * the server when the tree is expanded.
     */
    root: PropTypes.instanceOf(ModelBase).isRequired,

    /**
     * An array of paths of selected OUs
     *
     * The path of an OU is the UIDs of the OU and all its parent OUs separated by slashes (/)
     */
    selected: PropTypes.arrayOf(orgUnitPathPropValidator),

    /**
     * An array of OU paths that will be expanded automatically as soon as they are encountered
     *
     * The path of an OU is the UIDs of the OU and all its parent OUs separated by slashes (/)
     */
    initiallyExpanded: PropTypes.arrayOf(orgUnitPathPropValidator),

    /**
     * onSelectClick callback, which is triggered when a click triggers the selection of an organisation unit
     *
     * The onSelectClick callback will receive two arguments: The original click event, and the OU that was clicked
     */
    onSelectClick: PropTypes.func,

    /**
     * onChangeCurrentRoot callback, which is triggered when the change current root label is clicked. Setting this also
     * enables the display of the change current root label
     *
     * the onChangeCurrentRoot callback will receive two arguments: The original click event, and the organisation unit
     * model object that was selected as the new root
     */
    onChangeCurrentRoot: PropTypes.func,

    /**
     * Organisation unit model representing the current root
     */
    currentRoot: PropTypes.object,

    /**
     * onChildrenLoaded callback, which is triggered when the children of this root org unit have been loaded
     *
     * The callback receives one argument: A D2 ModelCollection object that contains all the newly loaded org units
     */
    onChildrenLoaded: PropTypes.func,

    /**
     * Custom styling for OU labels
     */
    labelStyle: PropTypes.object,

    /**
     * Custom styling for the labels of selected OUs
     */
    selectedLabelStyle: PropTypes.object,

    /**
     * An array of organisation unit IDs that should be reloaded from the API
     */
    idsThatShouldBeReloaded: PropTypes.arrayOf(PropTypes.string),

    /**
     * Custom arrow symbol
     */
    arrowSymbol: PropTypes.string,

    /**
     * If true, don't display checkboxes next to org unit labels
     */
    hideCheckboxes: PropTypes.bool,

    /**
     * if true, don't display the selected member count next to org unit labels
     */
    hideMemberCount: PropTypes.bool,

    /**
     * Array of paths of Organisation Units to include on tree. If not defined or empty, all children from root to leafs will be shown
     */
    orgUnitsPathsToInclude: PropTypes.array,

    /**
     * If true `root.children.load` (a method on d2.ModelCollectionProperty) will be called with forceReload set to true, which is required
     * for dynamic OrgUnitTrees, i.e. in cases where parent-child relations are updated
     */
    forceReloadChildren: PropTypes.bool,
};

OrgUnitTree.defaultProps = {
    selected: [],
    initiallyExpanded: [],
    onSelectClick: undefined,
    onChangeCurrentRoot: undefined,
    currentRoot: undefined,
    onChildrenLoaded: undefined,
    labelStyle: {},
    selectedLabelStyle: {},
    idsThatShouldBeReloaded: [],
    arrowSymbol: undefined,
    hideCheckboxes: false,
    hideMemberCount: false,
    orgUnitsPathsToInclude: null,
    forceReloadChildren: false,
};

export default OrgUnitTree;
