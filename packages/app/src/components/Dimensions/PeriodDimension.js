import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';

export class PeriodDimension extends Component {
    render = () => {
        return <h3>{i18n.t('Period Dimension')}</h3>;
    };
}

export default PeriodDimension;
