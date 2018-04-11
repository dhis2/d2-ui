import React from 'react';
import { isFunction } from 'lodash/fp';
import { addD2Context } from 'd2-ui';

const TranslateInternal = ({ props, context }) => {
    if (context.d2 && context.d2.i18n && isFunction(context.d2.i18n.getTranslation)) {
        return <span>{context.d2.i18n.getTranslation(props.children)}</span>;
    }

    return <span />;
};

const Translate = addD2Context(TranslateInternal);

const PublicAccessValue = ({ value }) => {
    const metaData = value.substr(0, 2);
    const data = value.substr(2, 2);
    const other = value.substr(4, 4);

    if (other === '----' && (data === '--' || data === 'r-' || data === 'rw')) {
        if (metaData === 'rw') {
            return <Translate>public_can_edit</Translate>;
        } else if (metaData === 'r-') {
            return <Translate>public_can_view</Translate>;
        }

        return <Translate>public_none</Translate>;
    }

};

export default PublicAccessValue;
