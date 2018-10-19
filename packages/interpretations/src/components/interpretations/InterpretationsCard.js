import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import IconButton from 'material-ui/IconButton';
import { SvgIcon } from '@dhis2/d2-ui-core';
import { grey600 } from 'material-ui/styles/colors';
import i18n from '@dhis2/d2-i18n'
import orderBy from 'lodash/fp/orderBy';
import InterpretationDialog from './InterpretationDialog';
import Interpretation from './Interpretation';
import { EditButton } from './misc';
import InterpretationModel from '../../models/interpretation';
import styles from './InterpretationsStyles.js';

const getInterpretationsList = props => {
    const { d2, model, interpretations, setCurrentInterpretation, onChange } = props;
    const getUserUrl = user => `${baseurl}/dhis-web-messaging/profile.action?id=${user.id}`;

    return (
        <div>
            <div style={{fontStyle: "italic", marginLeft: 15}}>
                {interpretations.length === 0 && <span>{i18n.t('No interpretations')}</span>}
            </div>

            {interpretations.map(interpretation => (
                <div
                    key={interpretation.id}
                    style={styles.interpretation}
                    className="interpretation-box"
                    onClick={() => setCurrentInterpretation(interpretation.id)}
                >
                    <Interpretation
                        d2={d2}
                        model={model}
                        interpretation={interpretation}
                        onChange={onChange}
                        extended={false}
                    />
                </div>
            ))}
        </div>
    );
};

const getInterpretationDetails = props => {
    const { d2, model, interpretation, onChange } = props;
    const comments = orderBy(["created"], ["desc"], interpretation.comments);

    return (
        <Interpretation
            d2={d2}
            model={model}
            interpretation={interpretation}
            onChange={onChange}
            extended={true}
        />
    );
};

const getInterpretationButtons = props => {
    const { d2, model, currentInterpretation, setCurrentInterpretation, openNewInterpretationDialog } = props;

    return (
        currentInterpretation ?
            <IconButton
                style={styles.back}
                onClick={() => setCurrentInterpretation(null)}
                tooltip={i18n.t('Clear interpretation')}
                tooltipPosition="top-left"
            >
               <SvgIcon icon="ChevronLeft" color={grey600} />
            </IconButton>
        :
            <IconButton
                style={styles.newInterpretation}
                onClick={openNewInterpretationDialog}
                tooltip={i18n.t('Write new interpretation')}
                tooltipPosition="top-left"
            >
                <SvgIcon icon="Add" color={grey600} />
            </IconButton>
    );
};

class InterpretationsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: true,
            interpretationToEdit: null,
            currentInterpretationId: props.currentInterpretationId,
        };

        this.notifyChange = this.notifyChange.bind(this);
        this.toggleExpand = this.toggleExpand.bind(this);
        this.openNewInterpretationDialog = this.openNewInterpretationDialog.bind(this);
        this.closeInterpretationDialog = this.closeInterpretationDialog.bind(this);
        this.setCurrentInterpretation = this.setCurrentInterpretation.bind(this);
        this.isControlledComponent = !!props.onCurrentInterpretationChange;
    }

    componentWillReceiveProps(nextProps) {
        if (this.isControlledComponent) {
            this.setState({ currentInterpretationId: nextProps.currentInterpretationId });
        }
    }

    componentDidMount() {
        const currentInterpretation = this.getCurrentInterpretation();
        if (currentInterpretation && this.props.onCurrentInterpretationChange) {
            this.props.onCurrentInterpretationChange(currentInterpretation);
        }
        if (this.props.currentInterpretationId == "new") {
            this.openNewInterpretationDialog();
        }
    }

    notifyChange(interpretation) {
        this.props.onChange();
    }

    toggleExpand() {
        this.setState({ isExpanded: !this.state.isExpanded });
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
                ? model.interpretations.find(interpretation => interpretation.id === interpretationId)
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
            ? model.interpretations.find(interpretation => interpretation.id === currentInterpretationId)
            : null;
    }

    render() {
        const { model } = this.props;
        const { isExpanded, interpretationToEdit } = this.state;
        const { d2 } = this.context;
        const sortedInterpretations = orderBy(["created"], ["desc"], model.interpretations);
        const currentInterpretation = this.getCurrentInterpretation();

        return (
            <Card
                style={styles.interpretationsCard}
                containerStyle={styles.container}
                expanded={isExpanded}
                onExpandChange={this.toggleExpand}
            >
                {interpretationToEdit &&
                    <InterpretationDialog
                        model={model}
                        interpretation={interpretationToEdit}
                        onSave={this.notifyChange}
                        onClose={this.closeInterpretationDialog}
                    />
                }

                <CardHeader
                    style={styles.interpretationsCardHeader}
                    title={i18n.t('Interpretations')}
                    showExpandableButton={true}
                    textStyle={styles.headerText}
                >
                    {isExpanded && getInterpretationButtons({
                        d2: d2,
                        model: model,
                        currentInterpretation: currentInterpretation,
                        setCurrentInterpretation: this.setCurrentInterpretation,
                        openNewInterpretationDialog: this.openNewInterpretationDialog,
                    })}
                </CardHeader>

                <CardText expandable={true} style={styles.body}>
                    {currentInterpretation
                        ?
                            getInterpretationDetails({
                                d2: d2,
                                model: model,
                                interpretation: currentInterpretation,
                                onChange: this.notifyChange,
                            })
                        :
                            getInterpretationsList({
                                d2: d2,
                                model: model,
                                interpretations: sortedInterpretations,
                                setCurrentInterpretation: this.setCurrentInterpretation,
                                onChange: this.notifyChange,
                            })
                    }
                </CardText>
            </Card>
        );
    }
}

InterpretationsCard.propTypes = {
    model: PropTypes.object.isRequired,
    currentInterpretationId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onCurrentInterpretationChange: PropTypes.func,
};

InterpretationsCard.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default InterpretationsCard;
