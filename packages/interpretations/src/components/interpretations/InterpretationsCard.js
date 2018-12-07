import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from '@material-ui/core/styles';
import i18n from "@dhis2/d2-i18n";
import orderBy from "lodash/fp/orderBy";

import CollapsibleCard from "../CollapsibleCard";
import InterpretationDialog from "./InterpretationDialog";
import Interpretation from "./Interpretation";
import InterpretationModel from "../../models/interpretation";
import { styles } from './styles/InterpretationsCard.style';

const getInterpretationsList = props => {
    const {
        classes,
        d2,
        model,
        interpretations,
        setCurrentInterpretation,
        onChange
    } = props;

    return interpretations.length === 0 ? (
        <div className={classes.emptyList}>
            <span>{i18n.t("No interpretations")}</span>
        </div>
    ) : (
        interpretations.map((interpretation, i) => (
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
    );
};

const getInterpretationDetails = props => {
    const {
        d2,
        model,
        setCurrentInterpretation,
        interpretation,
        onChange
    } = props;

    return (
        <Interpretation
            d2={d2}
            model={model}
            interpretation={interpretation}
            onChange={onChange}
            extended={true}
            onSelect={setCurrentInterpretation}
        />
    );
};

const getInterpretationButtons = props => {
    const {
        currentInterpretation,
        setCurrentInterpretation,
        openNewInterpretationDialog
    } = props;

    return currentInterpretation ? (
        <IconButton
            onClick={() => setCurrentInterpretation(null)}
            title={i18n.t("Clear interpretation")}
        >
            <ChevronLeftIcon />
        </IconButton>
    ) : (
        <IconButton
            onClick={openNewInterpretationDialog}
            title={i18n.t("Write new interpretation")}
        >
            <AddIcon />
        </IconButton>
    );
};

class InterpretationsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interpretationToEdit: null,
            currentInterpretationId: props.currentInterpretationId
        };

        this.notifyChange = this.notifyChange.bind(this);
        this.openNewInterpretationDialog = this.openNewInterpretationDialog.bind(
            this
        );
        this.closeInterpretationDialog = this.closeInterpretationDialog.bind(
            this
        );
        this.setCurrentInterpretation = this.setCurrentInterpretation.bind(
            this
        );
        this.isControlledComponent = !!props.onCurrentInterpretationChange;
    }

    componentWillReceiveProps(nextProps) {
        if (this.isControlledComponent) {
            this.setState({
                currentInterpretationId: nextProps.currentInterpretationId
            });
        }
    }

    componentDidMount() {
        const currentInterpretation = this.getCurrentInterpretation();
        if (currentInterpretation && this.props.onCurrentInterpretationChange) {
            this.props.onCurrentInterpretationChange(currentInterpretation);
        }
        if (this.props.currentInterpretationId === "new") {
            this.openNewInterpretationDialog();
        }
    }

    notifyChange() {
        this.props.onChange();
    }

    openNewInterpretationDialog() {
        const newInterpretation = new InterpretationModel(this.props.model, {});
        this.setState({ interpretationToEdit: newInterpretation });
    }

    closeInterpretationDialog() {
        this.setState({ interpretationToEdit: null });
    }

    setCurrentInterpretation(interpretationId) {
        const { model, onCurrentInterpretationChange } = this.props;

        if (this.isControlledComponent) {
            const currentInterpretation = interpretationId
                ? model.interpretations.find(
                      interpretation => interpretation.id === interpretationId
                  )
                : null;
            onCurrentInterpretationChange(currentInterpretation);
        } else {
            this.setState({ currentInterpretationId: interpretationId });
        }
    }

    getCurrentInterpretation() {
        const { model } = this.props;
        const { currentInterpretationId } = this.state;
        return model && model.interpretations && currentInterpretationId
            ? model.interpretations.find(
                  interpretation =>
                      interpretation.id === currentInterpretationId
              )
            : null;
    }

    render() {
        const { classes, model } = this.props;
        const { interpretationToEdit } = this.state;
        const { d2 } = this.context;
        const sortedInterpretations = orderBy(
            ["created"],
            ["desc"],
            model.interpretations
        );
        const currentInterpretation = this.getCurrentInterpretation();
        const actions = getInterpretationButtons({
            d2: d2,
            model: model,
            currentInterpretation: currentInterpretation,
            setCurrentInterpretation: this.setCurrentInterpretation,
            openNewInterpretationDialog: this.openNewInterpretationDialog
        });

        return (
            <CollapsibleCard
                title={i18n.t("Interpretations")}
                actions={actions}
            >
                {interpretationToEdit && (
                    <InterpretationDialog
                        model={model}
                        interpretation={interpretationToEdit}
                        onSave={this.notifyChange}
                        onClose={this.closeInterpretationDialog}
                    />
                )}

                <div className={classes.cardContainer}>
                    {currentInterpretation
                        ? getInterpretationDetails({
                            d2: d2,
                            model: model,
                            interpretation: currentInterpretation,
                            setCurrentInterpretation: this
                                .setCurrentInterpretation,
                            onChange: this.notifyChange
                          })
                        : getInterpretationsList({
                            classes: classes,
                            d2: d2,
                            model: model,
                            interpretations: sortedInterpretations,
                            setCurrentInterpretation: this
                                .setCurrentInterpretation,
                            onChange: this.notifyChange
                          })}
                </div>
            </CollapsibleCard>
        );
    }
}

InterpretationsCard.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    currentInterpretationId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onCurrentInterpretationChange: PropTypes.func
};

InterpretationsCard.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default withStyles(styles)(InterpretationsCard);
