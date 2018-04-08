import React from 'react';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton/FlatButton';
import Translate from '../i18n/Translate.component';

export default function Icon(props) {
    const onClick = event => props.onIconClicked(event, props.iconFileName);

    return (
        <FlatButton onClick={onClick}>
            {props.iconSrc
                ? <img src={props.iconSrc} alt="should add descriptions to pictures" />
                : <Translate>select</Translate>}
        </FlatButton>
    );
}

Icon.propTypes = {
    iconFileName: PropTypes.string,
    iconSrc: PropTypes.string.isRequired,
    onIconClicked: PropTypes.func.isRequired,
};

Icon.defaultProps = { iconFileName: '' };
