import React from 'react';
import Checkbox from 'material-ui-next/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
import strings from './utils';


const StyleOptions = props => (
    <div>
        <FormGroup />
        <FormControlLabel
            label={strings.chart.noSpace}
            control={<Checkbox
                checked={props.tabContent.noSpace || false}
                onChange={event => props.onChange('noSpace', event.target.checked)}
            />}
        />
        <FormGroup />
    </div>
);

export default StyleOptions;
