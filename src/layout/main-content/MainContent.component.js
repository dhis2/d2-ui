import React from 'react';

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
    children: React.PropTypes.oneOfType([
        React.PropTypes.array.isRequired,
        React.PropTypes.object.isRequired,
    ]),
};

export default MainContent;
