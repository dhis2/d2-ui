import PropTypes from 'prop-types';
import React from 'react';

const defaultStyle = {
    padding: '0.5rem 0',
};

export default function Message({ style: propsStyle, message }) {
    const style = Object.assign({}, defaultStyle, propsStyle);

    return (
        <div style={style}>{ message }</div>
    );
}
Message.propTypes = {
    style: PropTypes.object,
    message: PropTypes.string,
};
