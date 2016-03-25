import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

export default function IconOption(props) {
    return (
        <FlatButton onClick={(event) => props.onIconClicked(event, props.value)}>
            <img src={props.imgSrc} />
        </FlatButton>
    );
}
