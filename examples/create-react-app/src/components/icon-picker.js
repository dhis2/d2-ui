import React from 'react';
import PropTypes from 'prop-types';

import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';

import IconPicker from '@dhis2/d2-ui-icon-picker';

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
}

export default class IconPickerExample extends React.Component {
    getChildContext() {
        return {
            d2: this.props.d2
        };
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}

IconPickerExample.childContextTypes = {
    d2: PropTypes.object,
};
