import React, { Component } from 'react';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';
import { hcl } from 'd3-color';

class ColorPicker extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            open: false,
            color: this.props.color,
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (color) => {
        const hexColor = color.hex.toUpperCase();

        this.setState({ color: hexColor });
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
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
            },
        };

        return (
            <div style={styles.wrapper}>
                <div
                    style={styles.color}
                    role="button"
                    onClick={this.handleOpen}
                    tabIndex={0}
                >
                    {color}
                </div>
                {this.state.open &&
                    <div>
                        <div
                            style={styles.cover}
                            role="button"
                            onClick={this.handleClose}
                            tabIndex={0}
                        />
                        <div style={styles.picker}>
                            <ChromePicker
                                color={this.state.color}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ColorPicker;
