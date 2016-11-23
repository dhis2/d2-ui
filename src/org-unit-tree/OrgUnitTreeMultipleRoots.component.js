import React from 'react';
import OrgUnitTree from './OrgUnitTree.component';
import Model from 'd2/lib/model/Model';

export default function OrgUnitTreeMultipleRoots(props) {
    if (props.roots) {
        return (
            <div>
                {props.roots
                    .map((root, index) => <OrgUnitTree
                        key={index}
                        {...props}
                        root={root}
                        onSelectClick={props.onSelectClick}
                    />)
                }
            </div>
        );
    }
    return (
        <OrgUnitTree {...props} />
    );
}
OrgUnitTreeMultipleRoots.propTypes = Object.assign(
    {},
    OrgUnitTree.propTypes,
    {
        root: React.PropTypes.instanceOf(Model),
        roots: React.PropTypes.arrayOf(
            React.PropTypes.instanceOf(Model)
        ),
    }
);
