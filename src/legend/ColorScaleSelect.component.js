import React, { Component, PropTypes } from 'react';
import ColorScale from './ColorScale.component';
import colorbrewer from './colorbrewer';
import Popover from 'material-ui/lib/popover/popover';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

const schemes = ['YlOrRd', 'YlGnBu', 'GnBu', 'BuGn', 'PuBuGn'];

class ColorScaleSelect extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            anchorEl: null,
            scheme: 'YlOrRd',
            classes: 5
        };

        this.showColorScales = this.showColorScales.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.onColorScaleSelect = this.onColorScaleSelect.bind(this);
        this.onClassesChange = this.onClassesChange.bind(this);
    }

    componentDidMount() {
        this.props.onChange(this.getColorBrewerScale(this.state.scheme, this.state.classes));
    }

    showColorScales(event) {
        this.setState({open: true, anchorEl: event.currentTarget});
    }
    onColorScaleSelect(event, scheme) {
        this.setState({scheme: scheme, open: false});
        this.props.onChange(this.getColorBrewerScale(scheme,this.state.classes));
    }
    onClassesChange(event, index, value) {
        this.setState({classes: value});
        // console.log(event, index, value);
    }
    getColorBrewerScale(scheme, classes) {
        return colorbrewer[scheme][classes];
    }
    handleRequestClose(reason) {
        this.setState({open: false});
    }
    render() {
        const colors = this.getColorBrewerScale(this.state.scheme, this.state.classes);
        const colorSchemes = schemes.map((scheme, index) => <ColorScale key={index} scheme={scheme} classes={this.state.classes} onClick={this.onColorScaleSelect} />);

        const styles = {
            list: {
                padding: 0,
                cursor: 'pointer',
            },
            popover: {} };

        const items = colors.map((color, index) => {
            const styles = {
                marginLeft: 0,
                display: 'inline-block',
                backgrodColor: color,
                width: 20,
                height: 20,
            };

            return (<li key={index} style={styles} />);
        });

        return (
            <div>
                <ColorScale scheme={this.state.scheme} classes={this.state.classes} onClick={this.showColorScales} />

                <SelectField floatingLabelText="Number of items" value={this.state.classes} onChange={this.onClassesChange}>
                    <MenuItem value={3} primaryText="3"/>
                    <MenuItem value={4} primaryText="4"/>
                    <MenuItem value={5} primaryText="5"/>
                    <MenuItem value={6} primaryText="6"/>
                    <MenuItem value={7} primaryText="7"/>
                    <MenuItem value={8} primaryText="8"/>
                    <MenuItem value={9} primaryText="9"/>
                </SelectField>

                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <div style={styles.popover}>
                        {colorSchemes}
                    </div>
                </Popover>
            </div>
        );
    }
}

export default ColorScaleSelect;
