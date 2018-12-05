import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdParserClass from './MdParser';

class Parser extends Component {
    constructor(props) {
        super(props);

        this.MdParser = new MdParserClass();
    }

    render() {
        const { children, style } = this.props;

        return (
            <p
                style={style}
                dangerouslySetInnerHTML={{
                    __html: this.MdParser.render(children),
                }}
            />
        );
    }
}

Parser.defaultProps = {
    style: null,
};

Parser.propTypes = {
    style: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default Parser;
