import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui-next/Button';
import { createClassName } from '../component-helpers/utils';

const ButtonTemp = (props) => {
    const { selector, ...passThroughProps } = props;

    const className = createClassName('d2-ui-textfield', selector);

    return (<Button {...passThroughProps} />);
};

ButtonTemp.propTypes = {
    selector: PropTypes.string,
};

ButtonTemp.defaultProps = {
    selector: undefined,
};
export default ButtonTemp;
