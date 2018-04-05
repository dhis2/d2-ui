import React from 'react';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import IconOption from './IconOption.component';

export default function CurrentIcon(props) {
    if (!props.imgSrc) {
        return (
            <FlatButton onClick={props.onIconClicked}>
                <span>select</span>
            </FlatButton>
        );
    }

    return (
        <IconOption {...props} />
    );
}
