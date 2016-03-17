import React from 'react';

import OrgUnitTree from '../../src/org-unit-tree';


function InitiallyExpandedExample(props) {
    const expanded = [
        'ImspTQPwCqd', // Sierra Leone - root
        'Vth0fbpFcsO', // Kono - under Sierra Leone
        'EjnIQNVAXGp', // Mafindor - under Kono
        'ZiOVcrSjSYe', // Dibia - under Port Loco, which is NOT initially expanded!
    ];

    return (
        <div>
            <OrgUnitTree root={props.root} selected={expanded} initiallyExpanded={expanded} />
            <OrgUnitTree root={props.root} selected={props.root.id} initiallyExpanded={props.root.id} />
        </div>
    );
}
InitiallyExpandedExample.propTypes = { root: React.PropTypes.any.isRequired };

export default InitiallyExpandedExample;
