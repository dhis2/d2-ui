import React from 'react';

import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTreeMultipleRoots.component';


function InitiallyExpandedExample(props) {
    const expanded = [
        'ImspTQPwCqd', // Sierra Leone - root
        'Vth0fbpFcsO', // Kono - under Sierra Leone
        'EjnIQNVAXGp', // Mafindor - under Kono
        'ZiOVcrSjSYe', // Dibia - under Port Loco, which is NOT initially expanded!
    ];

    const roots = Array.isArray(props.roots) ? props.roots : [props.roots];

    return (
        <div>
            <OrgUnitTree roots={roots} selected={props.selected || expanded} initiallyExpanded={props.selected || expanded} />
        </div>
    );
}
InitiallyExpandedExample.propTypes = { roots: React.PropTypes.any.isRequired };

export default InitiallyExpandedExample;
