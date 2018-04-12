import React from 'react';
import { isFunction } from 'lodash/fp';
import { addD2Context } from 'd2-ui';

export const TranslatedSpan = ({ props, context }) => {
    if (context.d2 && context.d2.i18n && isFunction(context.d2.i18n.getTranslation)) {
        return <span>{context.d2.i18n.getTranslation(props.children)}</span>;
    }

    return <span />;
};

const Translate = addD2Context(TranslatedSpan);

const PublicAccessValue = ({ value }) => {
    const metaData = value.substr(0, 2);
    const data = value.substr(2, 2);
    const other = value.substr(4, 4);

    if (other === '----' && (data === '--' || data === 'r-' || data === 'rw')) {
        if (metaData === 'rw') {
            return <span>public_can_edit</span>;
        } else if (metaData === 'r-') {
            return <span>public_can_view</span>;
        } else if (metaData === '--') {
            return <span>public_none</span>;
        }

        return <span />;

    }

};

export default PublicAccessValue;
