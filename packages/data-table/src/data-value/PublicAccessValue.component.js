import React from 'react';
import { isString } from 'lodash/fp';
import { isFunction } from 'lodash/fp';
import log from 'loglevel';
import { addD2Context } from 'd2-ui';

function Translate(props, context) {
    if (context.d2 && context.d2.i18n && isFunction(context.d2.i18n.getTranslation)) {
        return (<span>{context.d2.i18n.getTranslation(props.children)}</span>);
    }

    log.error('<Translate />: d2 is not available on the `context`');
    return <span />;
}

const TranslateSpan = addD2Context(Translate);

const PublicAccessValue = ({ value }) => {
    const metaData = value.substr(0, 2);
    const data = value.substr(2, 2);
    const other = value.substr(4, 4);

    if (other === '----' && (data === '--' || data === 'r-' || data === 'rw')) {
        if (metaData === 'rw') {
            return <TranslateSpan>public_can_edit</TranslateSpan>;
        } else if (metaData === 'r-') {
            return <TranslateSpan>public_can_view</TranslateSpan>;
        } else if (metaData === '--') {
            return <TranslateSpan>public_none</TranslateSpan>;
        }

        return null;
    }
};

export default PublicAccessValue;
