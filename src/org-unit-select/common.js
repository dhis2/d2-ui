import React from 'react';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';
import DropDown from '../form-fields/DropDown.component';

const style = {
    button: {
        position: 'relative',
        top: 3,
        marginLeft: 16,
    },
    progress: {
        height: 2,
        backgroundColor: 'rgba(0,0,0,0)',
        top: 46,
    },
};
style.button1 = Object.assign({}, style.button, { marginLeft: 0 });


function addToSelection(orgUnits) {
    const orgUnitArray = Array.isArray(orgUnits) ? orgUnits : orgUnits.toArray();
    const addedOus = orgUnitArray
        .filter(ou => !this.props.selected.includes(ou.path));

    this.props.onUpdateSelection(this.props.selected.concat(addedOus.map(ou => ou.path)));
}

function removeFromSelection(orgUnits) {
    const orgUnitArray = Array.isArray(orgUnits) ? orgUnits : orgUnits.toArray();
    const removedOus = orgUnitArray
        .filter(ou => this.props.selected.includes(ou.path));
    const removed = removedOus.map(ou => ou.path);
    const selectedOus = this.props.selected.filter(ou => !removed.includes(ou));

    this.props.onUpdateSelection(selectedOus);
}

function handleChangeSelection(event) {
    this.setState({ selection: event.target.value });
}

function renderDropdown(menuItems, label) {
    return (
        <div style={{ position: 'relative', minHeight: 89 }}>
            <DropDown
                value={this.state.selection}
                menuItems={menuItems}
                onChange={this.handleChangeSelection}
                floatingLabelText={this.getTranslation(label)}
                disabled={this.state.loading}
            />
            {this.renderControls()}
        </div>
    );
}

function renderControls() {
    const disabled = this.state.loading || !this.state.selection;

    return (
        <div style={{ position: 'absolute', display: 'inline-block', top: 24, marginLeft: 16 }}>
            {this.state.loading && (
                <LinearProgress size={0.5} style={style.progress} />
            )}
            <RaisedButton
                label={this.getTranslation('select')}
                style={style.button1}
                onClick={this.handleSelect}
                disabled={disabled}
            />
            <RaisedButton
                label={this.getTranslation('deselect')}
                style={style.button}
                onClick={this.handleDeselect}
                disabled={disabled}
            />
        </div>
    );
}

export {
    addToSelection,
    removeFromSelection,
    handleChangeSelection,
    renderDropdown,
    renderControls,
};
