import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import ColorScaleSelect from './ColorScaleSelect.component';
import LegendItems from './LegendItems.component';
import {scaleLinear} from 'd3-scale';


export default class Legend extends Component {
    constructor() {
        super();

        this.state = {
            startValue: 0,
            endValue: 100,
            warningDialogOpen: false,
        };

        this.onColorScaleChange = this.onColorScaleChange.bind(this);
        this.displayWarning = this.displayWarning.bind(this);
        this.createLegendItems = this.createLegendItems.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    onColorScaleChange(colorScheme) {
        this.setState({colorScheme})
    }

    // Make sure user want to replace current legend items
    //displayWarning() {
     //   console.log('warning');

        //  this.createLegendItems();
    //}
    //}

    createLegendItems() {
        const {startValue, endValue, colorScheme} = this.state;
        const scale = scaleLinear().domain([startValue, endValue]).rangeRound([0, colorScheme.length]);

        const items = colorScheme.map((color, index) => {
            const startValue = scale.invert(index);
            const endValue = scale.invert(index + 1);

            return {
                name: `${startValue} — ${endValue}`,
                startValue,
                endValue,
                color
            };
        });

        this.props.onItemsChange(items);
    }

    updateItem(newItems) {
        this.props.onItemsChange(newItems);
    }

    displayWarning = () => {
        this.setState({warningDialogOpen: true});
    }

    handleClose = () => {
        this.setState({warningDialogOpen: false});
        this.createLegendItems();
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Proceed"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <TextField floatingLabelText="StartValue" value={this.state.startValue} onChange={(event, value) => this.setState({startValue: event.target.value})} />
                <TextField floatingLabelText="End value"  value={this.state.endValue} onChange={(event, value) => this.setState({endValue: event.target.value})} />
                <ColorScaleSelect onChange={this.onColorScaleChange} />
                <RaisedButton label="Create legend items" onClick={this.displayWarning} />
                <LegendItems items={this.props.items} updateItem={this.updateItem} /> // If on is changed call this.props.onItemsChange(items);

                // Confir dialog
                <Dialog
                    title='Are you sure?'
                    actions={actions}
                    modal={false}
                    open={this.state.warningDialogOpen}
                    onRequestClose={this.handleClose}
                >
                    This will replace your current legend items.
                </Dialog>
            </div>
        );
    }
};
Legend.propTypes = {
    items: PropTypes.array.isRequired,
};
