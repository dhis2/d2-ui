import React from 'react';
import PropTypes from 'prop-types';
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
                    checked={props.tabContent.hideChartLegend}
                    onChange={(event) => { props.onChange('hideChartLegend', event.target.checked); }}
                />}
            />
            <FormControlLabel
                label={strings.general.hideChartTitle}
                control={<Checkbox
                    checked={props.tabContent.hideChartTitle}
                    onChange={(event) => { props.onChange('hideChartTitle', event.target.checked); }}
                />}
            />
            <FormControlLabel
                label={strings.general.hideSubtitle}
                control={<Checkbox
                    checked={props.tabContent.hideSubtitle}
                    onChange={(event) => { props.onChange('hideSubtitle', event.target.checked); }}
                />}
            />
            <div >
                <Button variant="raised" size="small" color="primary"> Hide </Button>
            </div>
        </FormGroup>
    </div>
);

GeneralOptions.propTypes = {
    tabContent: PropTypes.shape({
        hideChartLegend: PropTypes.bool,
        hideChartTitle: PropTypes.bool,
        hideSubtitle: PropTypes.bool,
    }),
    onChange: PropTypes.func.isRequired,
};

GeneralOptions.defaultProps = {
    tabContent: {
        hideChartLegend: false,
        hideChartTitle: false,
        hideSubtitle: false,
    },
};

export default GeneralOptions;
