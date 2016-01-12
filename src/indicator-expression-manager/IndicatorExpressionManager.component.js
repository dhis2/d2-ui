import React from 'react';
import ExpressionDescription from './ExpressionDescription.component';
import ExpressionOperators from './ExpressionOperators.component';
import ExpressionFormula from './ExpressionFormula.component';
import ListSelect from '../list-select/ListSelect.component';
import DataElementOperandSelector from './DataElementOperandSelector.component';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Paper from 'material-ui/lib/paper';
import classes from 'classnames';
import log from 'loglevel';
import Translate from '../i18n/Translate.mixin';
import {config} from 'd2/lib/d2';
import ProgramOperandSelector from './ProgramOperandSelector';
import Heading from '../headings/Heading.component';

config.i18n.strings.add('data_elements');
config.i18n.strings.add('description');
config.i18n.strings.add('organisation_unit_counts');
config.i18n.strings.add('program_tracked_entity_attributes');
config.i18n.strings.add('program_indicators');
config.i18n.strings.add('program_data_elements');
config.i18n.strings.add('constants');
config.i18n.strings.add('this_field_is_required');
config.i18n.strings.add('programs');

/**
 * @component IndicatorExpressionManager
 *
 * @description
 * Component to manage the indicator expressions. Either numerator or denominator.
 *
 * This component require an `expressionStatusActions` object that contains the following actions.
 * - `requestExpressionStatus`
 *
 * The `requestExpressionStatus` action gets fired each time the expression is changed.
 * In case of `d2-flux` we suggest you implement the action handler somewhat like the following.
 * ```js
    import Action from 'd2-flux/action/Action';
    import indicatorExpressionStatusStore from './indicatorExpressionStatus.store';

    const indicatorExpressionStatusActions = Action.createActionsFromNames(['requestExpressionStatus']);

    indicatorExpressionStatusActions.requestExpressionStatus
        .throttle(500)
        .map(action => {
            const encodedFormula =  encodeURIComponent(action.data);
            const url = `/api/expressions/description?expression=${encodedFormula}`;

            return Observable.fromPromise(api.request(url));
        })
        .concatAll()
        .subscribe(action => {
            .then(function () {
                indicatorExpressionStatusStore.setState(tempResponse);
            });
        });

    export default indicatorExpressionStatusActions;

 * ```
 */
const IndicatorExpressionManager = React.createClass({
    propTypes: {
        descriptionLabel: React.PropTypes.string.isRequired,
        organisationUnitGroupOptions: React.PropTypes.array.isRequired,
        constantOptions: React.PropTypes.array.isRequired,
        programTrackedEntityAttributeOptions: React.PropTypes.array.isRequired,
        expressionStatusActions: React.PropTypes.object.isRequired,
        expressionStatusStore: React.PropTypes.object.isRequired,
        indicatorExpressionChanged: React.PropTypes.func.isRequired,
        dataElementOperandSelectorActions: React.PropTypes.object.isRequired,
        descriptionValue: React.PropTypes.string.isRequired,
        formulaValue: React.PropTypes.string.isRequired,
        titleText: React.PropTypes.string.isRequired,
    },

    mixins: [Translate],

    getDefaultProps() {
        return {
            organisationUnitGroupOptions: [],
            constantOptions: [],
            programTrackedEntityAttributeOptions: [],
        };
    },

    getInitialState() {
        return {
            formula: this.props.formulaValue,
            description: this.props.descriptionValue,
            expressionStatus: {
                description: '',
                isValid: false,
            },
        };
    },

    componentWillMount() {
        if (!this.props.expressionStatusStore) {
            return true;
        }

        let first = true;

        this.disposable = this.props.expressionStatusStore
            .subscribe(expressionStatus => {
                this.setState({
                    expressionStatus: {
                        description: expressionStatus.description,
                        isValid: expressionStatus.status === 'OK',
                        message: expressionStatus.message,
                    },
                }, () => {
                    if (first) {
                        first = false;
                        return;
                    }

                    this.props.indicatorExpressionChanged({
                        formula: this.state.formula,
                        description: this.state.description,
                        expressionStatus: this.state.expressionStatus,
                    });
                });
            }, error => log.error(error));

        if (this.props.formulaValue.trim()) {
            this.requestExpressionStatus();
        }
    },

    componentWillUnmount() {
        this.disposable && this.disposable.dispose();
    },

    render() {
        const listStyle = {width: '100%', outline: 'none'};

        const statusMessageClasses = classes(
            'indicator-expression-manager__readable-expression__message',
            {
                'indicator-expression-manager__readable-expression__message--valid': this.state.expressionStatus.isValid,
                'indicator-expression-manager__readable-expression__message--invalid': !this.state.expressionStatus.isValid,
            }
        );

        const isDescriptionValid = () => {
            return this.state.description && this.state.description.trim();
        };

        return (
            <div className="indicator-expression-manager">
                <div className="indicator-expression-manager__left" style={{paddingLeft: '2rem'}}>
                    <Paper style={{padding: '0 2rem', marginTop: '1rem'}}>
                    <div className="indicator-expression-manager__description">
                        <Heading style={{margin: 0, padding: 0}} level={3} text={this.props.titleText} />
                        <ExpressionDescription descriptionValue={this.state.description}
                                               descriptionLabel={this.getTranslation('description')}
                                               onDescriptionChange={this.descriptionChange}
                                               errorText={!isDescriptionValid() ? this.getTranslation('this_field_is_required') : undefined}
                            />
                    </div>
                    <ExpressionFormula onFormulaChange={this.formulaChange}
                                       formula={this.state.formula} />
                    <ExpressionOperators operatorClicked={this.addOperatorToFormula}  />
                    </Paper>
                </div>
                <div className="indicator-expression-manager__right" style={{paddingRight: '2rem'}}>
                    <Paper style={{padding: '0 2rem', marginTop: '1rem'}}>
                    <Tabs>
                        <Tab label={this.getTranslation('data_elements')}>
                            <DataElementOperandSelector onItemDoubleClick={this.dataElementOperandSelected}
                                                        dataElementOperandSelectorActions={this.props.dataElementOperandSelectorActions}
                                                        listStyle={listStyle}
                                />
                        </Tab>
                        <Tab label={this.getTranslation('programs')}>
                            <ProgramOperandSelector programOperandSelected={this.programOperandSelected} />
                        </Tab>
                        <Tab label={this.getTranslation('organisation_unit_counts')}>
                            <ListSelect onItemDoubleClick={this.organisationUnitGroupSelected}
                                        source={this.props.organisationUnitGroupOptions}
                                        listStyle={listStyle}
                                />
                        </Tab>
                        <Tab label={this.getTranslation('constants')}>
                            <ListSelect onItemDoubleClick={this.constantSelected}
                                        source={this.props.constantOptions}
                                        listStyle={listStyle}
                                />
                        </Tab>
                    </Tabs>
                    </Paper>
                </div>
                <div className="indicator-expression-manager__readable-expression" style={{paddingLeft: '2rem', paddingRight: '2rem'}}>
                    <Paper>{this.state.expressionStatus.description}</Paper>
                    <div className={statusMessageClasses}>{this.state.expressionStatus.message}</div>
                </div>
            </div>
        );
    },

    descriptionChange(newDescription) {
        this.setState({
            description: newDescription,
        }, () => {
            this.props.indicatorExpressionChanged({
                formula: this.state.formula,
                description: this.state.description,
                expressionStatus: this.state.expressionStatus,
            });
        });
    },

    formulaChange(newFormula) {
        this.setState({
            formula: newFormula,
        }, () => {
            this.requestExpressionStatus();
        });
    },

    addOperatorToFormula(operator) {
        this.appendToFormula(operator);
    },

    organisationUnitGroupSelected(value) {
        const ougFormula = ['OUG{', value, '}'].join('');

        this.appendToFormula(ougFormula);
    },

    constantSelected(value) {
        const constFormula = ['C{', value, '}'].join('');

        this.appendToFormula(constFormula);
    },

    programOperandSelected(programFormulaPart) {
        this.appendToFormula(programFormulaPart);
    },

    appendToFormula(partToAppend) {
        this.setState({
            formula: [this.state.formula, partToAppend].join(''),
        }, () => {
            this.requestExpressionStatus();
        });
    },

    dataElementOperandSelected(dataElementOperandId) {
        const dataElementOperandFormula = ['#{', dataElementOperandId, '}'].join('');

        this.appendToFormula(dataElementOperandFormula);
    },

    requestExpressionStatus() {
        this.props.expressionStatusActions.requestExpressionStatus(this.state.formula);
    },
});

export default IndicatorExpressionManager;
