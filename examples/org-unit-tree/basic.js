import React from 'react';
import PropTypes from 'prop-types';
import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';

function BasicOrgUnitTreeExample(props) {
    return <OrgUnitTree rootUnit={props.rootUnit} />;
}
BasicOrgUnitTreeExample.propTypes = {
    rootUnit: PropTypes.object.isRequired,
};

export default BasicOrgUnitTreeExample;
