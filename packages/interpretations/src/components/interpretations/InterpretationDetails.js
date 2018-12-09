import React from "react";
import PropTypes from "prop-types";
import Interpretation from "./Interpretation";

export const InterpretationDetails = ({
    d2,
    model,
    interpretation,
    setCurrentInterpretation,
    onChange,
}) => (
    <Interpretation
        d2={d2}
        model={model}
        interpretation={interpretation}
        onChange={onChange}
        extended={true}
        onSelect={setCurrentInterpretation}
    />
);

InterpretationDetails.contextTypes = {
    d2: PropTypes.object.isRequired,
}

InterpretationDetails.propTypes = {
    model: PropTypes.object.isRequired,
    interpretation: PropTypes.object.isRequired,
    setCurrentInterpretation: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default InterpretationDetails;