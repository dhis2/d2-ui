import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import i18n from "@dhis2/d2-i18n";
import orderBy from "lodash/fp/orderBy";

import CollapsibleCard from "../CollapsibleCard";
import NewInterpretation from './NewInterpretation';
import InterpretationModel from "../../models/interpretation";
import InterpretationDetails from './InterpretationDetails';
import InterpretationsList from './InterpretationsList';
import InterpretationButtons from './InterpretationButtons';
import styles from './styles/InterpretationsCard.style';

class InterpretationsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interpretationToEdit: null,
            currentInterpretationId: props.currentInterpretationId
        };

        this.notifyChange = this.notifyChange.bind(this);
        this.openNewInterpretation = this.openNewInterpretation.bind(this);
        this.closeNewInterpretation = this.closeNewInterpretation.bind(this);
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
            this.openNewInterpretation();
        }
    }

    notifyChange() {
        this.props.onChange();
    }

    openNewInterpretation() {
        const newInterpretation = new InterpretationModel(this.props.model, {});
        this.setState({ interpretationToEdit: newInterpretation });
    }

    closeNewInterpretation() {
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
            ["asc"],
            model.interpretations
        );
        const currentInterpretation = this.getCurrentInterpretation();
        
        return (
            <CollapsibleCard
                title={i18n.t("Interpretations")}
                actions={
                    <InterpretationButtons 
                    d2={d2}
                    model={model}
                    currentInterpretation={currentInterpretation}
                    setCurrentInterpretation={this.setCurrentInterpretation}
                    openNewInterpretation={this.openNewInterpretation}
                    />
                }
            >
            <div className={classes.cardContainer}>
                {currentInterpretation ? (
                    <InterpretationDetails
                        d2={d2}
                        model={model}
                        interpretation={currentInterpretation}
                        setCurrentInterpretation={this.setCurrentInterpretation} 
                        onChange={this.notifyChange}
                    />
                ) : ( 
                    <InterpretationsList
                        d2={d2}
                        model={model}
                        interpretations={sortedInterpretations}
                        setCurrentInterpretation={this.setCurrentInterpretation}
                        onChange={this.notifyChange}
                    />
                )}
            </div>
            {interpretationToEdit && (
                    <NewInterpretation
                        model={model}
                        newInterpretation={interpretationToEdit}
                        onSave={this.notifyChange}
                        onClose={this.closeNewInterpretation}
                    />
            )}
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
