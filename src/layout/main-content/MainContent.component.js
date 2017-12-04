import React from 'react';
import PropTypes from 'prop-types';

function MainContent(props) {
    const mainContentStyle = {
        marginBottom: '4rem',
        width: '100%',
    };

    return (
        <div style={mainContentStyle}>
            {props.children}
        </div>
    );
}
MainContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired,
    ]),
};

export default MainContent;
