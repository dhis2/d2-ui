import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddIcon from "@material-ui/icons/Add";
import i18n from "@dhis2/d2-i18n";

export const PanelButtons = ({         
    currentInterpretation,
    setCurrentInterpretation,
    openNewInterpretation,
 }) => (
    currentInterpretation ? (
        <IconButton
            onClick={() => setCurrentInterpretation(null)}
            title={i18n.t("Clear interpretation")}
        >
            <ChevronLeftIcon />
        </IconButton>
    ) : (
        <IconButton
            onClick={openNewInterpretation}
            title={i18n.t("Write new interpretation")}
        >
            <AddIcon />
        </IconButton>
    )
 );

 PanelButtons.propTypes = {
    currentInterpretation: PropTypes.object,
    setCurrentInterpretation: PropTypes.func,
    openNewInterpretation: PropTypes.func,
};

export default PanelButtons;
