import React from 'react';
import PropTypes from 'prop-types';
import OrgUnitTree from './OrgUnitTree.component';

export default function OrgUnitTreeMultipleRoots(props) {
    if (props.roots) {
        return (
            <div>
                {props.roots
                    .map((root, index) => (<OrgUnitTree
                        key={index}
                        {...props}
                        root={root}
                        onSelectClick={props.onSelectClick}
                    />))
                }
            </div>
        );
    }

    const root = props.root;
    return (
        <OrgUnitTree root={root} {...props} />
    );
}

function isOrgUnitModel(obj) {
    return obj && obj.modelDefinition && obj.modelDefinition.plural === 'organisationUnits';
}

function OrgUnitModelValidator(props, propName, componentName) {
    if (props[propName] && !isOrgUnitModel(props[propName])) {
        return new Error(`Invalid org unit model supplied to \`${componentName}.${propName}\``);
    }
}

function OrgUnitModelArrayElementValidator(propValue, key, componentName, location, propFullName) {
    if (!isOrgUnitModel(propValue[key])) {
        return new Error(`Invalid org unit model supplied to \`${componentName}.${propFullName}\``);
    }
}

OrgUnitTreeMultipleRoots.propTypes = Object.assign({}, OrgUnitTree.propTypes,
    {
        root: OrgUnitModelValidator,
        roots: PropTypes.arrayOf(OrgUnitModelArrayElementValidator),
    },
);
