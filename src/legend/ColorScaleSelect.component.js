import React, { Component, PropTypes } from 'react';
import ColorScale from './ColorScale.component';
import colorbrewer from './colorbrewer';
import Popover from 'material-ui/lib/popover/popover';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { config } from 'd2/lib/d2';

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
    'Set3'
];

// Renders a color scale component consisting of a changeable color scale and number of classes
export default class ColorScaleSelect extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            open: false,
            anchorEl: null,
            scale: 'YlOrRd',
            classes: 5
        };

        this.i18n = this.context.d2.i18n;
    }

    componentDidMount() {
        this.props.onChange(this.getColorBrewerScale(this.state.scale, this.state.classes));
    }

    // Show popover with allowed color scales
    showColorScales = (event) => {
        this.setState({open: true, anchorEl: event.currentTarget});
    }

    // Called when a new color scale is selected in the popover
    onColorScaleSelect = (event, scale) => {
        this.setState({scale: scale, open: false});
        this.props.onChange(this.getColorBrewerScale(scale, this.state.classes));
    }

    // Called when the number of classes is changed
    onClassesChange = (event, index, value) => {
        this.setState({classes: value});
        this.props.onChange(this.getColorBrewerScale(this.state.scale, value));
    }

    // Returns a color brewer scale for a number of classes
    getColorBrewerScale(scale, classes) {
        return colorbrewer[scale][classes];
    }

    // Called when popover is closed
    onColorScalePopoverClose = (reason) => {
        this.setState({open: false});
    }

    render() {
        const colors = this.getColorBrewerScale(this.state.scale, this.state.classes);
        const styles = {
            select: {
                display: 'inline-block',
                position: 'relative',
                top: -8,
            },
            selectField: {
                width: 160,
                marginRight: 20,
                marginBottom: 36,
            },
            scale: {
                position: 'relative',
                width: 36 * this.state.classes,
                top: 11,
                marginBottom: 36,
            },
            popover: {
                maxHeight: '60%',
                overflowY: 'auto'
            },
            popoverScale: {
                display: 'block',
                overflow: 'visible',
                marginLeft: 20,
                width: 36 * this.state.classes,
                whiteSpace: 'nowrap',
            },
        };
        const colorScales = scales.map((scale, index) =>
            <ColorScale key={index} scale={scale} classes={this.state.classes} style={styles.popoverScale} onClick={this.onColorScaleSelect} />
        );

        return (
            <div style={styles.select}>
                <SelectField style={styles.selectField} floatingLabelText={this.i18n.getTranslation('number_of_items')} value={this.state.classes} onChange={this.onClassesChange}>
                    <MenuItem value={3} primaryText="3"/>
                    <MenuItem value={4} primaryText="4"/>
                    <MenuItem value={5} primaryText="5"/>
                    <MenuItem value={6} primaryText="6"/>
                    <MenuItem value={7} primaryText="7"/>
                    <MenuItem value={8} primaryText="8"/>
                    <MenuItem value={9} primaryText="9"/>
                </SelectField>

                <ColorScale scale={this.state.scale} classes={this.state.classes} style={styles.scale} onClick={this.showColorScales} />

                <Popover
                    style={styles.popover}
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.onColorScalePopoverClose}
                >
                    <div>
                        {colorScales}
                    </div>
                </Popover>
            </div>
        );
    }
}

ColorScaleSelect.contextTypes = {
    d2: PropTypes.object,
};
