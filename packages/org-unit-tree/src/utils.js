/**
 * Execute an operation for each org unit within a tree along a path
 * @param root
 * @param path
 * @param op A callback that accepts one parameter: An org unit
 */
export const forEachOnPath = (root, path, op) => {
    op(root);
    if (
        path.length > 0 &&
        (Array.isArray(root.children) || root.children.size > 0)
    ) {
        if (root.children.has(path[0])) {
            forEachOnPath(root.children.get(path[0]), path.slice(1), op);
        } else {
            forEachOnPath(root, path.slice(1), op);
        }
    }
};

/**
 * Decrement the selected member count of of the specified org unit and all its ascendants in the org unit tree with the
 * specified root
 * @param root
 * @param orgUnit
 */
export const decrementMemberCount = (root, orgUnit) => {
    forEachOnPath(
        root,
        orgUnit.path
            .substr(1)
            .split('/')
            .slice(1),
        ou => ou.memberCount--
    );
};

/**
 * Increment the selected member count of of the specified org unit and all its ascendants in the org unit tree with the
 * specified root
 * @param root The root org unit
 * @param orgUnit
 */
export const incrementMemberCount = (root, orgUnit) => {
    forEachOnPath(
        root,
        orgUnit.path
            .substr(1)
            .split('/')
            .slice(1),
        ou => ou.memberCount++
    );
};

/**
 * Merge the specified children into the org unit tree with the specified root
 * @param root
 * @param children
 */
export const mergeChildren = (root, children) => {
    function assignChildren(root, path, children) {
        if (path.length === 0) {
            root.children = children;
        } else {
            assignChildren(root.children.get(path[0]), path.slice(1), children);
        }
        return root;
    }

    const childPath = children
        .toArray()[0]
        .path.substr(1)
        .split('/');
    childPath.splice(-1, 1);
    return assignChildren(root, childPath.slice(1), children);
};

/**
 * Load children for org unit (root) node
 * @param root
 * @param displayNameProperty
 * @param forceReloadChildren
 * @returns {*}
 */
export const loadChildren = (
    root,
    displayNameProperty,
    forceReloadChildren
) => {
    const fields = [
        'id',
        `${displayNameProperty}~rename(displayName)`,
        'code',
        'children::isNotEmpty',
        'path',
        'parent',
    ];

    // d2.ModelCollectionProperty.load takes a second parameter `forceReload` and will just return
    // the current valueMap unless either `this.hasUnloadedData` or `forceReload` are true
    return root.children.load(
        { fields: fields.join(',') },
        forceReloadChildren
    );
};
