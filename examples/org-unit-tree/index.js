import React from 'react';
import ReactDOM from 'react-dom';

import OrgUnitTree from '../../src/org-unit-tree';


function OrgUnitTreeExample() {
    return (
        <div>
            <OrgUnitTree />
        </div>
    );
}

ReactDOM.render(<OrgUnitTreeExample />, document.getElementById('app'));
