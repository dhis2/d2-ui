import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Popover from 'material-ui/Popover/Popover';
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import { config } from 'd2/lib/d2';
import ColorScale from './ColorScale.component';
import colorbrewer from './colorbrewer';
import Row from '../layout/Row.component';
import Column from '../layout/Column.component';

config.i18n.strings.add('number_of_items');

// Allowed color scales from ColorBrewer (needs to have at least 9 classes)
const scales = [
    'YlOrRd',
    'Reds',
    'YlGn',
    'Greens',
    'Blues',
    'BuPu',
    'RdPu',
    'PuRd',
    'Greys',
    'YlOrBr_reverse',
    'Reds_reverse',
    'YlGn_reverse',
    'Greens_reverse',
    'Blues_reverse',
    'BuPu_reverse',
    'RdPu_reverse',
    'PuRd_reverse',
    'Greys_reverse',
    'PuOr',
    'BrBG',
    'PRGn',
    'PiYG',
    'RdBu',
    'RdGy',
    'RdYlBu',
    'Spectral',
    'RdYlGn',
    'Paired',
    'Pastel1',
    'Set1',
    'Set3',
];

// Renders a color scale component consisting of a changeable color scale and number of classes
export default class ColorScaleSelect extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            open: false,
            anchorEl: null,
            scale: 'YlOrRd',
            classes: 5,
        };

        this.i18n = this.context.d2.i18n;
    }

    componentDidMount() {
        this.props.onChange(this.getColorBrewerScale(this.state.scale, this.state.classes));
    }

    // Show popover with allowed color scales
    showColorScales = (event) => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    }

    // Called when a new color scale is selected in the popover
    onColorScaleSelect = (event, scale) => {
        this.setState({ scale, open: false });
        this.props.onChange(this.getColorBrewerScale(scale, this.state.classes));
    }

    // Called when the number of classes is changed
    onClassesChange = (event, index, value) => {
        this.setState({ classes: value });
        this.props.onChange(this.getColorBrewerScale(this.state.scale, value));
    }

    // Returns a color brewer scale for a number of classes
    getColorBrewerScale(scale, classes) {
        return colorbrewer[scale][classes];
    }

    // Called when popover is closed
    onColorScalePopoverClose = (reason) => {
        this.setState({ open: false });
    }

    render() {
        const colors = this.getColorBrewerScale(this.state.scale, this.state.classes);
        const styles = {
            scale: {
                width: 36 * this.state.classes,
                minWidth: 36 * this.state.classes,
                flex: '0 0 auto',
            },
            popover: {
                maxHeight: '60%',
                overflowY: 'scroll',
            },
            popoverScale: {
                display: 'block',
                overflow: 'visible',
                margin: '10px 0',
                marginLeft: 20,
                width: 36 * this.state.classes,
                minWidth: 36 * this.state.classes,
                whiteSpace: 'nowrap',
            },
        };
        const colorScales = scales.map((scale, index) =>
            <ColorScale key={index} scale={scale} classes={this.state.classes} style={styles.popoverScale} onClick={this.onColorScaleSelect} />,
        );

        return (
            <Row style={{ alignItems: 'center', ...this.props.style }}>
                <SelectField floatingLabelText={this.i18n.getTranslation('number_of_items')} value={this.state.classes} onChange={this.onClassesChange}>
                    <MenuItem value={3} primaryText="3" />
                    <MenuItem value={4} primaryText="4" />
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={6} primaryText="6" />
                    <MenuItem value={7} primaryText="7" />
                    <MenuItem value={8} primaryText="8" />
                    <MenuItem value={9} primaryText="9" />
                </SelectField>

                <ColorScale scale={this.state.scale} classes={this.state.classes} style={{ ...styles.scale, margin: '0 20px 0 20px' }} onClick={this.showColorScales} />

                <Popover
                    style={styles.popover}
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.onColorScalePopoverClose}
                >
                    <Column>
                        {colorScales}
                    </Column>
                </Popover>
            </Row>
        );
    }
}

ColorScaleSelect.contextTypes = {
    d2: PropTypes.object,
};
