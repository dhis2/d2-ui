import React from "react";
import PropTypes from "prop-types";
import i18n from "@dhis2/d2-i18n";
import Interpretation from "./Interpretation";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/InterpretationsList.style';

export const InterpretationsList = ({         
    classes,
    d2,
    model,
    interpretations,
    setCurrentInterpretation,
    onChange
}) =>  {
    if (!interpretations.length) {
        return (
        <div className={classes.emptyList}>
            <span>{i18n.t("No interpretations")}</span>
        </div>
        );
    }
    //TODO  length > 5 && showPreviousComments
    // "Show previous comments  ( x  of < interpretations.length - rendered comments> )"
    return (
        interpretations.length ? (
            interpretations.map(interpretation => (
                <div
                    key={interpretation.id}
                    className={classes.interpretation}
                    onClick={() => setCurrentInterpretation(interpretation.id)}
                >
                    <Interpretation
                        d2={d2}
                        model={model}
                        interpretation={interpretation}
                        onChange={onChange}
                        extended={false}
                        onSelect={setCurrentInterpretation}
                    />
                </div>
            ))
        ) : (
          null
        )
    );
};

InterpretationsList.contextTypes = {
    d2: PropTypes.object.isRequired,
}

InterpretationsList.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    interpretations: PropTypes.array.isRequired,
    setCurrentInterpretation: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(InterpretationsList);