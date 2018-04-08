import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import IconPicker from '../../src/icon-picker/IconPicker.component';

injectTapEventPlugin();

class IconExample extends Component {
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

    getOptions = () => {
        const symbolUrls = [];
        let i = 1;

        for (; i <= 40; i++) {
            const filename = i > 9 ? i : `0${i}`;
            symbolUrls.push(`${filename}.${i > 25 ? 'svg' : 'png'}`);
        }

        return symbolUrls;
    }

    render() {
        const options = this.getOptions();

        return (
            <div>
                <Card>
                    <CardText>
                        Without initial value
                        <IconPicker
                            iconPath="./images/orgunitgroup"
                            options={options}
                            labelText="Symbol"
                        />
                    </CardText>
                </Card>

                <Card>
                    <CardText>
                        With initial value
                        <IconPicker
                            iconPath="./images/orgunitgroup"
                            iconFileName={'03.png'}
                            options={options}
                            labelText="Symbol"
                        />
                    </CardText>
                </Card>
            </div>
        );
    }
}

IconExample.childContextTypes = {
    d2: PropTypes.object,
};

render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <IconExample />
    </MuiThemeProvider>,
    document.querySelector('#icon-picker'),
);
