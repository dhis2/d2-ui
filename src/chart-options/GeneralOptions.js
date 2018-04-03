import React from 'react';
import Checkbox from 'material-ui-next/Checkbox';
import Button from 'material-ui-next/Button';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
import strings from './utils';


const GeneralOptions = props => (
    <div>
        <h3>General</h3>
        <FormGroup>
            <FormControlLabel
                label={strings.general.hideLegend}
                control={<Checkbox
                    checked={props.tabContent.hideChartLegend || false}
                    onChange={(event) => { props.onChange('hideChartLegend', event.target.checked); }}
                />}
            />
            <FormControlLabel
                label={strings.general.hideChartTitle}
                control={<Checkbox
                    checked={props.tabContent.hideChartTitle || false}
                    onChange={(event) => { props.onChange('hideChartTitle', event.target.checked); }}
                />}
            />
            <FormControlLabel
                label={strings.general.hideSubtitle}
                control={<Checkbox
                    checked={props.tabContent.hideSubtitle || false}
                    onChange={(event) => { props.onChange('hideSubtitle', event.target.checked); }}
                />}
            />
            <div >
                <Button variant="raised" size="small" color="primary"> Hide </Button>
            </div>
        </FormGroup>
    </div>
);
export default GeneralOptions;
