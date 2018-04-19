import React from 'react';
import PropTypes from 'prop-types';

import { OrgUnitTree } from 'd2-ui-org-unit-tree';

function InitiallyExpandedExample(props) {
    const expanded = [
        '/ImspTQPwCqd/Vth0fbpFcsO/EjnIQNVAXGp', // Mafindor - under Kono
        '/ImspTQPwCqd/TEQlaapDQoK/ZiOVcrSjSYe', // Dibia - under Port Loco
    ];

    const roots = Array.isArray(props.roots) ? props.roots : [props.roots];

    return (
        <div>
            <OrgUnitTree root={props.root} roots={roots} selected={expanded} initiallyExpanded={expanded} />
        </div>
    );
}
InitiallyExpandedExample.propTypes = { roots: PropTypes.any.isRequired };

export default InitiallyExpandedExample;
