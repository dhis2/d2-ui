import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import i18n from "@dhis2/d2-i18n";
import orderBy from "lodash/fp/orderBy";

import CollapsibleCard from '../AnalyticObjectDetails/CollapsibleCard';
import PanelButtons from './PanelButtons';
import OldInterpretation from '../Interpretation/OldInterpretation';
import InterpretationsList from './InterpretationsList';
import NewInterpretation from '../Interpretation/NewInterpretation';
import InterpretationModel from '../../models/interpretation';
import styles from './styles/InterpretationsCard.style';

export class InterpretationsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interpretationToEdit: null,
            currentInterpretationId: props.currentInterpretationId,
            sharingDialogIsOpen: false,
            listIsExpanded: !props.model.interpretations.length > 5,
        };

        this.notifyChange = this.notifyChange.bind(this);
        this.openNewInterpretation = this.openNewInterpretation.bind(this);
        this.openSharingDialog = this.openSharingDialog.bind(this);
        this.closeNewInterpretation = this.closeNewInterpretation.bind(this);
        this.setCurrentInterpretation = this.setCurrentInterpretation.bind(
            this
        );
        this.isControlledComponent = !!props.onCurrentInterpretationChange;
        this.toggleShowAllInterpretations = this.toggleShowAllInterpretations.bind(this);
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

    openSharingDialog() {
        this.setState({ sharingDialogIsOpen: true });
    }

    closeSharingDialog() {
        this.setState({ sharingDialogIsOpen: false });
    }

    toggleShowAllInterpretations() {
        this.setState({ listIsExpanded: !this.state.listIsExpanded });
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
                    <PanelButtons 
                        model={model}
                        currentInterpretation={currentInterpretation}
                        setCurrentInterpretation={this.setCurrentInterpretation}
                        openNewInterpretation={this.openNewInterpretation}
                    />
                }
            >
            <div className={classes.cardContainer}>
                {currentInterpretation ? (
                    <OldInterpretation
                        model={model}
                        interpretation={currentInterpretation}
                        onChange={this.notifyChange}
                        onSelect={this.setCurrentInterpretation}
                        onSave={this.notifyChange}
                        onClose={this.closeNewInterpretation}
                        extended={true}
                    />
                ) : ( 
                    <InterpretationsList
                        model={model}
                        interpretations={sortedInterpretations}
                        setCurrentInterpretation={this.setCurrentInterpretation}
                        onChange={this.notifyChange}
                        isExpanded={this.state.listIsExpanded}
                        toggleShowAllInterpretations={this.toggleShowAllInterpretations}
                    />
                )}
            </div>
            {interpretationToEdit && (
                <NewInterpretation
                    model={model}
                    newInterpretation={interpretationToEdit}
                    onSave={this.notifyChange}
                    onClose={this.closeNewInterpretation}
                    isNew={true}
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
    d2: PropTypes.object.isRequired,
};

export default withStyles(styles)(InterpretationsCard);
