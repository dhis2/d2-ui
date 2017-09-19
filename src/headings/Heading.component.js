import { PropTypes, default as React } from 'react';

function Heading(props) {
    const {
        level,
        text,
        style,
        children,
        ...other
    } = props;

    const tag = { type: level <= 6 ? `h${level}` : 'span' };
    const headingStyle = {
        fontSize: 24,
        fontWeight: 300,
        color: 'rgba(0, 0, 0, 0.87)',
        padding: '16px 0 5px 0',
        margin: 0,
        ...style,
    };

    return (
        <tag.type {...other} style={headingStyle}>{children || text}</tag.type>
    );
}
Heading.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    text: PropTypes.string,
};
Heading.defaultProps = {
    level: 1,
};

export default Heading;
