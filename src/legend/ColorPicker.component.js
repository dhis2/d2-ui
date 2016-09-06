import React, { Component } from 'react';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';
import {hcl} from 'd3-color';

export default class ColorPicker extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            open: false,
            color: this.props.color || '#FFA500', // Orange is default
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleChange = (color) => {
        const hexColor = color.hex.toUpperCase();

        this.setState({color: hexColor});
        this.props.onChange(hexColor);
    }

    render() {
        const color = this.state.color;

        const styles = {
            wrapper: {
                position: 'relative',
                overflow: 'visible',
            },
            color: {
                backgroundColor: color,
                color: hcl(color).l < 70 ? '#fff' : '#000',
                textAlign: 'center',
                position: 'relative',
                width: 90,
                height: 36,
                lineHeight: 2.5,
                marginTop: 10,
                boxShadow: '0 1px 6px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.12)',
                cursor: 'pointer',
            },
            cover: {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            picker: {
                position: 'absolute',
                top: -207,
                left: 120,
            }
        };

        return (
            <div style={styles.wrapper}>
                <div style={styles.color} onClick={this.handleOpen}>{color}</div>

                {this.state.open ? <div is="popover">
                    <div style={styles.cover} onClick={this.handleClose}/>
                    <div style={styles.picker}>
                        <ChromePicker color={this.state.color} onChange={this.handleChange} />
                    </div>
                </div> : null}
            </div>
        )
    }
}

