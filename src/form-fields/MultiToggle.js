import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import Checkbox from 'material-ui/Checkbox';

class MultiToggle extends Component {
    getInitialState() {
        return {
            values: this.props.items.reduce((prev, curr) => {
                if (curr.value) {
                    prev.push(curr.name);
                }
                return prev;
            }, []),
        };
    }

    _handleToggle(value, event, checked) {
        this.setState((oldState) => {
            if (checked) {
                if (oldState.values.indexOf(value) === -1) {
                    oldState.values.push(value);
                }
            } else if (oldState.values.indexOf(value) !== -1) {
                oldState.values.splice(oldState.values.indexOf(value), 1);
            }
            return oldState;
        }, () => {
            this.props.onChange({ target: { value: this.state.values } });
        });
    }

    render() {
        const style = Object.assign({}, this.context.muiTheme.forms, this.props.style);
        return (
            <div>
                <div style={{ marginTop: 16, marginBottom: 8 }}>{this.props.label}</div>
                {this.props.items.map((item) => {
                    const togglor = this._handleToggle.bind(null, item.name);
                    return (
                        <Checkbox
                            key={item.name}
                            name={item.name}
                            value="true"
                            defaultChecked={item.value === true}
                            label={item.text}
                            onCheck={togglor}
                            style={style}
                            labelPosition="right"
                        />
                    );
                })}
            </div>
        );
    }
}

MultiToggle.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.bool,
        text: PropTypes.string.isRequired,
    })),
    style: PropTypes.object,
};

MultiToggle.contextTypes = {
    muiTheme: PropTypes.object,
};

export default MultiToggle;
