import React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import i18n from "@dhis2/d2-i18n";
import orderBy from "lodash/fp/orderBy";
import CollapsibleCard from './CollapsibleCard';
import Interpretation from '../Interpretation/Interpretation';
import InterpretationsList, { interpretationsToShowOnInit } from '../Lists/InterpretationsList';
import NewInterpretationField from '../Interpretation/NewInterpretationField';
import { haveWriteAccess } from "../../authorization/auth";
import styles from './styles/InterpretationsCard.style';

export class InterpretationsCard extends React.Component {
    constructor(props) {
        super(props);
        this.notifyChange = this.notifyChange.bind(this);
        this.isControlledComponent = !!props.onCurrentInterpretationChange;
        this.toggleShowAllInterpretations = this.toggleShowAllInterpretations.bind(this);
        this.setCurrentInterpretation = this.setCurrentInterpretation.bind(this);
        
        this.state = {
            currentInterpretationId: props.currentInterpretationId,
            listIsExpanded: !(props.model.interpretations.length > interpretationsToShowOnInit),
        };
    };

    componentDidMount() {
        const currentInterpretation = this.getCurrentInterpretation();
        if (currentInterpretation && this.props.onCurrentInterpretationChange) {
            this.props.onCurrentInterpretationChange(currentInterpretation);
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.isControlledComponent) {
            this.setState({
                currentInterpretationId: nextProps.currentInterpretationId
            });
        }
    };

    notifyChange() {
        this.props.onChange();
    };

    toggleShowAllInterpretations() {
        this.setState({ listIsExpanded: !this.state.listIsExpanded });
    };

    setCurrentInterpretation(interpretationId) {
        const { model, onCurrentInterpretationChange } = this.props;

        if (this.isControlledComponent) {
            const currentInterpretation = interpretationId
                ? model.interpretations.find(
                      item => item.id === interpretationId
                  )
                : null;
            onCurrentInterpretationChange(currentInterpretation);
        } else {
            this.setState({ currentInterpretationId: interpretationId });
        }
    };

    getCurrentInterpretation() {
        const { model } = this.props;
        const { currentInterpretationId } = this.state;

        return model && model.interpretations && currentInterpretationId
            ? model.interpretations.find(
                  interpretation =>
                      interpretation.id === currentInterpretationId
              )
            : null;
    };

    renderBackButton = () => 
        this.state.currentInterpretationId && (
            <Button
                className={this.props.classes.backButton}
                variant="outlined" 
                size="medium"
                onClick={() => this.setCurrentInterpretation(null)}
            >
                <ChevronLeft/>
                {i18n.t('Back to all interpretations')}
            </Button>
    );

    renderCardContent = () => {
        const currentInterpretation = this.getCurrentInterpretation();
        const sortedInterpretations = orderBy(
            ["created"],
            ["asc"],
            this.props.model.interpretations
        );

        return currentInterpretation ? (
            <Interpretation
                model={this.props.model}
                interpretation={currentInterpretation}
                onChange={this.notifyChange}
                onSelect={this.setCurrentInterpretation}
                extended={true}
            />
        ) : ( 
            <InterpretationsList
                model={this.props.model}
                d2={this.context.d2}
                interpretations={sortedInterpretations}
                onChange={this.notifyChange}
                onSelect={this.setCurrentInterpretation}
                isExpanded={this.state.listIsExpanded}
                toggleShowAllInterpretations={this.toggleShowAllInterpretations}
            />
        )
    };

    renderInputField = () => 
        (!this.state.currentInterpretationId && 
            haveWriteAccess(this.context.d2, this.props.model)) && (
            <NewInterpretationField
                model={this.props.model}
                onSave={this.notifyChange}
            />
    );

    render() {
        const BackButton = this.renderBackButton();
        const Interpretations = this.renderCardContent();
        const InputField = this.renderInputField();
        
        return (
            <CollapsibleCard title={i18n.t("Interpretations")}>
                {BackButton}
                {Interpretations}
                {InputField}
            </CollapsibleCard>
        );
    };
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
