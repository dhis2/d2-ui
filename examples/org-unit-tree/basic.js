import React from 'react';
import OrgUnitTree from '../../src/org-unit-tree';


function BasicOrgUnitTreeExample(props) {
    return <OrgUnitTree rootUnit={props.rootUnit} />;
}
BasicOrgUnitTreeExample.propTypes = {
    rootUnit: React.PropTypes.object.isRequired,
};

export default BasicOrgUnitTreeExample;
