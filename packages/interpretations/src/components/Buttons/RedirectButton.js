import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import { getLink, itemTypeMap } from '../../api/redirect';


export class RedirectButton extends Component {

    render() {
        return this.context.appName === 'dashboard' ? (
            <a
                href={getLink(this.context.item, this.context.d2)}
                style={{ height: 16, width: 16, marginRight: 24 }}
                title={`View in ${itemTypeMap[this.context.item.type].appName} app`}
            >
                <ActionButton
                    iconType={'openApp'}
                    tooltip={`View in ${itemTypeMap[this.context.item.type].appName} app`}
                    onClick={() => null}
                />
            </a>
        ) : null;
    }
};

RedirectButton.contextTypes = {
    item: PropTypes.object,
    d2: PropTypes.object,
    appName: PropTypes.string,
};

export default RedirectButton;