import React from 'react';
import FlatButton from 'material-ui/FlatButton/FlatButton';

export default function IconOption(props) {
    return (
        <FlatButton onClick={(event) => props.onIconClicked(event, props.value)}>
            <img src={props.imgSrc} />
        </FlatButton>
    );
}
