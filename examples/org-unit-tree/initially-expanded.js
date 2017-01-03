import React from 'react';

import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTreeMultipleRoots.component';


function InitiallyExpandedExample(props) {
    const expanded = [
        '/ImspTQPwCqd/Vth0fbpFcsO/EjnIQNVAXGp', // Mafindor - under Kono
        '/ImspTQPwCqd/TEQlaapDQoK/ZiOVcrSjSYe', // Dibia - under Port Loco
    ];

    const roots = Array.isArray(props.roots) ? props.roots : [props.roots];

    return (
        <div>
            <OrgUnitTree roots={roots} selected={expanded} initiallyExpanded={expanded} />
        </div>
    );
}
InitiallyExpandedExample.propTypes = { roots: React.PropTypes.any.isRequired };

export default InitiallyExpandedExample;
