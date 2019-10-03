import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import StopIcon from '@material-ui/icons/Stop';

import TreeView from '@dhis2/d2-ui-core/tree-view/TreeView.component';
import styles from './styles/OrgUnitTree.component.styles';
import OUFolderIconComponent from './OUFolderIcon.component';
import OUCheckboxComponent from './OUCheckbox.component';
import { loadChildren } from './utils';

class OrgUnitTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            children:
                props.root.children === false ||
                (Array.isArray(props.root.children) &&
                    props.root.children.length === 0)
                    ? []
                    : undefined,
            loading: false,
        };
        if (
            props.root.children &&
            typeof props.root.children.toArray === 'function' &&
            !props.root.children.hasUnloadedData
        ) {
            this.state.children = props.root.children
                .toArray()
                // Sort here since the API returns nested children in random order
                .sort((a, b) => a.displayName.localeCompare(b.displayName));
        }
    }

    componentDidMount() {
        if (
            this.props.initiallyExpanded.some(ou =>
                ou.includes(`/${this.props.root.id}`)
            )
        ) {
            this.loadChildren();
        }
    }

    componentWillReceiveProps(newProps) {
        if (
            newProps.initiallyExpanded.some(ou =>
                ou.includes(`/${newProps.root.id}`)
            ) ||
            newProps.idsThatShouldBeReloaded.includes(newProps.root.id)
        ) {
            this.loadChildren();
        }
    }

    onCollapse = orgUnit => {
        if (typeof this.props.onCollapse === 'function') {
            this.props.onCollapse(orgUnit);
        }
    };

    onExpand = orgUnit => {
        this.loadChildren();

        if (typeof this.props.onExpand === 'function') {
            this.props.onExpand(orgUnit);
        }
    };

    onContextMenuClick = e => {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onContextMenuClick !== undefined) {
            this.props.onContextMenuClick(
                e,
                this.props.root,
                this.hasChildren(),
                this.loadChildren
            );
        }
    };

    setChildState = children => {
        let data = children;

        if (this.props.onChildrenLoaded) {
            this.props.onChildrenLoaded(children);
        }

        if (!Array.isArray(children)) {
            data = children.toArray();
        }

        this.setState({
            children: data.sort((a, b) =>
                a.displayName.localeCompare(b.displayName)
            ),
            loading: false,
        });
    };

    hideChildren = () => {
        this.setChildState([]);
    };

    loadChildren = async () => {
        if (this.state.children !== undefined) {
            return this.state.children;
        }

        if (
            (this.state.children === undefined && !this.state.loading) ||
            this.props.idsThatShouldBeReloaded.indexOf(this.props.root.id) >= 0
        ) {
            this.setState({ loading: true });

            const children = await loadChildren(
                this.props.root,
                this.props.displayNameProperty,
                this.props.forceReloadChildren,
                this.props.useUserDataViewFallback
            );

            this.setChildState(children);

            return children;
        }
    };

    handleSelectClick = e => {
        if (this.props.onSelectClick) {
            this.props.onSelectClick(e, this.props.root);
        }
        e.stopPropagation();
    };

    hasChildren = () =>
        this.state.children === undefined ||
        (Array.isArray(this.state.children) && this.state.children.length > 0);

    shouldIncludeOrgUnit = orgUnit => {
        if (
            !this.props.orgUnitsPathsToInclude ||
            this.props.orgUnitsPathsToInclude.length === 0
        ) {
            return true;
        }
        return !!this.props.orgUnitsPathsToInclude.some(ou =>
            ou.includes(`/${orgUnit.id}`)
        );
    };

    setCurrentRoot = e => {
        e.stopPropagation();

        this.props.onChangeCurrentRoot(this.props.root);
    };

    renderChild(orgUnit, expandedProp) {
        if (!this.shouldIncludeOrgUnit(orgUnit)) {
            return null;
        }

        const highlighted =
            this.props.searchResults.includes(orgUnit.path) &&
            this.props.highlightSearchResults;

        return (
            <OrgUnitTree
                key={orgUnit.id}
                root={orgUnit}
                onExpand={this.onExpand}
                onCollapse={this.onCollapse}
                selected={this.props.selected}
                initiallyExpanded={expandedProp}
                onSelectClick={this.props.onSelectClick}
                onContextMenuClick={this.props.onContextMenuClick}
                currentRoot={this.props.currentRoot}
                onChangeCurrentRoot={this.props.onChangeCurrentRoot}
                labelStyle={{
                    ...this.props.labelStyle,
                    fontWeight: highlighted
                        ? 500
                        : this.props.labelStyle.fontWeight,
                    color: highlighted ? 'orange' : 'inherit',
                }}
                selectedLabelStyle={this.props.selectedLabelStyle}
                arrowSymbol={this.props.arrowSymbol}
                idsThatShouldBeReloaded={this.props.idsThatShouldBeReloaded}
                hideCheckboxes={this.props.hideCheckboxes}
                onChildrenLoaded={this.props.onChildrenLoaded}
                hideMemberCount={this.props.hideMemberCount}
                orgUnitsPathsToInclude={this.props.orgUnitsPathsToInclude}
                treeStyle={this.props.treeStyle}
                searchResults={this.props.searchResults}
                highlightSearchResults={this.props.highlightSearchResults}
                forceReloadChildren={this.props.forceReloadChildren}
                showFolderIcon={this.props.showFolderIcon}
                disableSpacer={this.props.disableSpacer}
                checkboxColor={this.props.checkboxColor}
                displayNameProperty={this.props.displayNameProperty}
            />
        );
    }

    renderChildren() {
        // If initiallyExpanded is an array, remove the current root id and pass the rest on
        // If it's a string, pass it on unless it's the current root id
        const expandedProp = Array.isArray(this.props.initiallyExpanded)
            ? this.props.initiallyExpanded.filter(
                  id => id !== this.props.root.id
              )
            : (this.props.initiallyExpanded !== this.props.root.id &&
                  this.props.initiallyExpanded) ||
              [];

        if (
            Array.isArray(this.state.children) &&
            this.state.children.length > 0
        ) {
            return this.state.children.map(orgUnit =>
                this.renderChild(orgUnit, expandedProp)
            );
        }

        if (this.state.loading) {
            return (
                <div style={styles.progress}>
                    <LinearProgress style={styles.progressBar} />
                </div>
            );
        }

        return null;
    }

    renderLabel(
        isSelected,
        isSelectable,
        isInitiallyExpanded,
        canBecomeCurrentRoot,
        currentOu,
        hasChildren,
        memberCount
    ) {
        const labelStyle = {
            ...styles.label,
            fontWeight: isSelected ? 500 : 300,
            color: isSelected ? 'orange' : 'inherit',
            cursor: canBecomeCurrentRoot ? 'pointer' : 'default',
            ...(isSelected
                ? this.props.selectedLabelStyle
                : this.props.labelStyle),
        };

        return (
            <div
                style={labelStyle}
                onClick={
                    canBecomeCurrentRoot
                        ? this.setCurrentRoot
                        : isSelectable
                            ? this.handleSelectClick
                            : undefined
                }
                onContextMenu={this.onContextMenuClick}
                role="button"
                tabIndex={0}
            >
                {isSelectable &&
                    !this.props.hideCheckboxes && (
                        <OUCheckboxComponent
                            checked={isSelected}
                            disabled={!isSelectable}
                            onClick={this.handleSelectClick}
                            color={this.props.checkboxColor}
                        />
                    )}
                {this.props.showFolderIcon &&
                    hasChildren && (
                        <OUFolderIconComponent
                            isExpanded={isInitiallyExpanded}
                            styles={this.props.labelStyle.folderIcon}
                        />
                    )}
                {this.props.showFolderIcon &&
                    !hasChildren && (
                        <StopIcon
                            style={{
                                ...styles.stopIcon,
                                ...this.props.labelStyle.stopIcon,
                            }}
                        />
                    )}
                <span style={this.props.labelStyle.text}>
                    {currentOu.displayName}
                </span>
                {hasChildren &&
                    !this.props.hideMemberCount &&
                    !!memberCount && (
                        <span style={styles.memberCount}>({memberCount})</span>
                    )}
            </div>
        );
    }

    render() {
        const currentOu = this.props.root;
        const hasChildren = this.hasChildren();
        const isSelectable = !!this.props.onSelectClick;
        const pathRegEx = new RegExp(`/${currentOu.id}$`);
        const memberRegEx = new RegExp(`/${currentOu.id}`);
        const isSelected =
            this.props.selected &&
            this.props.selected.some(ou => pathRegEx.test(ou));
        const isCurrentRoot =
            this.props.currentRoot &&
            this.props.currentRoot.id === currentOu.id;
        const isInitiallyExpanded = this.props.initiallyExpanded.some(ou =>
            ou.includes(`/${currentOu.id}`)
        );
        const canBecomeCurrentRoot =
            this.props.onChangeCurrentRoot && !isCurrentRoot && hasChildren;

        const memberCount =
            this.props.selected !== undefined
                ? this.props.selected.filter(ou => memberRegEx.test(ou)).length
                : currentOu.memberCount;

        const ouContainerStyle = {
            ...styles.ouContainer,
            ...(isCurrentRoot ? styles.currentOuContainer : {}),
            ...this.props.treeStyle,
        };

        const label = this.renderLabel(
            isSelected,
            isSelectable,
            isInitiallyExpanded,
            canBecomeCurrentRoot,
            currentOu,
            hasChildren,
            memberCount
        );

        if (hasChildren) {
            return (
                <TreeView
                    label={label}
                    onExpand={this.onExpand}
                    onCollapse={this.onCollapse}
                    model={this.props.root}
                    initiallyExpanded={isInitiallyExpanded}
                    arrowSymbol={this.props.arrowSymbol}
                    className="orgunit with-children"
                    style={ouContainerStyle}
                    persistent
                >
                    {this.renderChildren()}
                </TreeView>
            );
        }

        return (
            <div
                onClick={isSelectable ? this.handleSelectClick : undefined}
                className="orgunit without-children"
                style={ouContainerStyle}
                role="button"
                tabIndex={0}
            >
                {!this.props.disableSpacer && <div style={styles.spacer} />}
                {label}
            </div>
        );
    }
}

function orgUnitPathPropValidator(
    propValue,
    key,
    compName,
    location,
    propFullName
) {
    if (!/(\/[a-zA-Z][a-zA-Z0-9]{10})+/.test(propValue[key])) {
        return new Error(
            `Invalid org unit path \`${
                propValue[key]
            }\` supplied to \`${compName}.${propFullName}\``
        );
    }
    return undefined;
}

OrgUnitTree.propTypes = {
    /**
     * The root OrganisationUnit of the tree, ModelBase
     *
     * If the root OU is known to have no children, the `children` property of the root OU should be either
     * `false` or an empty array. If the children property is undefined, the children will be fetched from
     * the server when the tree is expanded.
     */
    root: PropTypes.object.isRequired,

    /**
     * Display name property
     */
    displayNameProperty: PropTypes.string,

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
     * onExpand callback is triggered when user expands organisation unit
     *
     * Will receive one argument - OU that was expanded
     */
    onExpand: PropTypes.func,

    /**
     * onCollapse callback is triggered when user collapses organisation unit
     *
     * Will receive one argument - OU that was collapsed
     */
    onCollapse: PropTypes.func,

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
     * Custom styling for trees
     */
    treeStyle: PropTypes.object,

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

    /**
     * Results from search
     */
    searchResults: PropTypes.array,

    /**
     * Indicates if search results should be highlighted
     */
    highlightSearchResults: PropTypes.bool,

    /**
     * Indicates if showing folder icon is enabled
     */
    showFolderIcon: PropTypes.bool,

    /**
     * Prop indicating if spacer should be enabled
     */
    disableSpacer: PropTypes.bool,

    /**
     * Prop indicating checkbox color
     */
    checkboxColor: PropTypes.string,

    /**
     * Prop function invoked when user opens context menu against org unit
     */
    onContextMenuClick: PropTypes.func,

    /**
     * Indicates the userDataViewFallback parameter must be used in the requests made when expanding the tree
     */
    useUserDataViewFallback: PropTypes.bool,
};

OrgUnitTree.defaultProps = {
    displayNameProperty: 'displayName',
    selected: [],
    initiallyExpanded: [],
    onSelectClick: undefined,
    onContextMenuClick: undefined,
    onExpand: undefined,
    onCollapse: undefined,
    onChangeCurrentRoot: undefined,
    currentRoot: undefined,
    onChildrenLoaded: undefined,
    labelStyle: {},
    treeStyle: {},
    selectedLabelStyle: {},
    idsThatShouldBeReloaded: [],
    arrowSymbol: undefined,
    hideCheckboxes: false,
    hideMemberCount: false,
    orgUnitsPathsToInclude: null,
    forceReloadChildren: false,
    searchResults: [],
    highlightSearchResults: false,
    showFolderIcon: false,
    disableSpacer: false,
    checkboxColor: 'primary',
    useUserDataViewFallback: false,
};

export default OrgUnitTree;
