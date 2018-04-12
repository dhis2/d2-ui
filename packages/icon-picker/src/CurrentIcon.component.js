import React from 'react';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import { addD2Context } from 'd2-ui';
import { isFunction } from 'lodash/fp';
import IconOption from './IconOption.component';


const TranslateInternal = ({ props, context }) => {
    if (context.d2 && context.d2.i18n && isFunction(context.d2.i18n.getTranslation)) {
        return <span>{context.d2.i18n.getTranslation(props.children)}</span>;
    }

    return <span />;
};

const Translate = addD2Context(TranslateInternal);

export default function CurrentIcon(props) {
    if (!props.imgSrc) {
        return (
            <FlatButton onClick={props.onIconClicked}>
                <Translate>select</Translate>
            </FlatButton>
        );
    }

    return (
        <IconOption {...props} />
    );
}
