import React from 'react';
import { config } from 'd2/lib/d2';
import addD2Context from 'd2-ui/lib/component-helpers/addD2Context';

config.i18n.strings.add('no_results_found');

function NoResults(props, { d2 }) {
    return (
        <div>{d2.i18n.getTranslation('no_results_found')}</div>
    );
}

export default addD2Context(NoResults);
