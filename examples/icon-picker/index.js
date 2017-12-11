import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import IconPicker from '../../src/icon-picker/IconPicker.component';

injectTapEventPlugin();

const options = (function () {
    const symbolUrls = [];
    let i = 1;

    for (; i <= 40; i++) {
        const filename = i > 9 ? i : `0${i}`;
        symbolUrls.push(`${filename}.${i > 25 ? 'svg' : 'png'}`);
    }

    return symbolUrls;
}());

let value = '03.png';

// Preload the images
function preload(pictureUrls) {
    let i;
    const images = [];
    for (i = 0; i < pictureUrls.length; i++) {
        images[i] = new Image();
        images[i].src = `./images/orgunitgroup/${pictureUrls[i]}`;
    }
}

preload(options);

function onChange(newValue) {
    value = newValue;
    renderIconPicker();
}

class ExampleWithMockD2 extends React.Component {
    getChildContext() {
        return {
            d2: {
                i18n: {
                    getTranslation(key) {
                        return key;
                    },
                },
            },
        };
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
ExampleWithMockD2.childContextTypes = {
    d2: PropTypes.object,
};

function renderIconPicker() {
    render(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <ExampleWithMockD2>
                <Card>
                    <CardText>
                        Without initial value
                        <IconPicker
                            options={options}
                            imgPath="./images/orgunitgroup"
                            labelText="Symbol"
                        />
                    </CardText>
                </Card>
                <Card>
                    <CardText>
                        With initial value
                        <IconPicker
                            options={options}
                            imgPath="./images/orgunitgroup"
                            value={value}
                            onChange={onChange}
                            labelText="Symbol"
                        />
                    </CardText>
                </Card>
            </ExampleWithMockD2>
        </MuiThemeProvider>
        , document.querySelector('#icon-picker'));
}

renderIconPicker();
