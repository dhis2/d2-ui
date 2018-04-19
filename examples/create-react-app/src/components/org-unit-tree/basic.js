import React from 'react';
import PropTypes from 'prop-types';
import { OrgUnitTree } from 'd2-ui-org-unit-tree';

function BasicOrgUnitTreeExample(props) {
    return <OrgUnitTree rootUnit={props.rootUnit} />;
}
BasicOrgUnitTreeExample.propTypes = {
    rootUnit: PropTypes.object.isRequired,
};

export default BasicOrgUnitTreeExample;
