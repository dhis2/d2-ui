import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui-next/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
import strings from './utils';


const StyleOptions = props => (
    <div>
        <FormGroup />
        <FormControlLabel
            label={strings.chart.noSpace}
            control={<Checkbox
                checked={props.tabContent.noSpace}
                onChange={event => props.onChange('noSpace', event.target.checked)}
            />}
        />
        <FormGroup />
    </div>
);

StyleOptions.propTypes = {
    onChange: PropTypes.func.isRequired,
    tabContent: PropTypes.shape({
        noSpace: PropTypes.bool,
    }),
};
StyleOptions.defaultProps = {
    tabContent: {
        noSpace: false,
    },
};


export default StyleOptions;
