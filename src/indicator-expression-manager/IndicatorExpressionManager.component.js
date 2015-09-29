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
        expressionStatusActions: React.PropTypes.object.isRequired,
        expressionStatusStore: React.PropTypes.object.isRequired,
        indicatorExpressionChanged: React.PropTypes.func.isRequired,
        dataElementOperandSelectorActions: React.PropTypes.object.isRequired,
        descriptionValue: React.PropTypes.string.isRequired,
        formulaValue: React.PropTypes.string.isRequired,
    },

    getDefaultProps() {
        return {
            organisationUnitGroupOptions: [],
            constantOptions: [],
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
        const listStyle = {
            width: '100%',
        };

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
                <div className="indicator-expression-manager__left">
                    <div className="indicator-expression-manager__description">
                        <ExpressionDescription descriptionValue={this.state.description}
                                               descriptionLabel={this.i18n.description}
                                               onDescriptionChange={this.descriptionChange}
                                               errorText={!isDescriptionValid() ? this.i18n.thisFieldIsRequired : undefined}
                            />
                    </div>
                    <ExpressionFormula onFormulaChange={this.formulaChange}
                                       formula={this.state.formula} />
                    <ExpressionOperators operatorClicked={this.addOperatorToFormula}  />
                </div>
                <div className="indicator-expression-manager__right">
                    <Tabs>
                        <Tab label={this.i18n.dataElements}>
                            <DataElementOperandSelector onItemDoubleClick={this.dataElementOperandSelected}
                                                        dataElementOperandSelectorActions={this.props.dataElementOperandSelectorActions}
                                                        listStyle={listStyle}
                                />
                        </Tab>
                        <Tab label={this.i18n.organisationUnitCounts}>
                            <ListSelect onItemDoubleClick={this.organisationUnitGroupSelected}
                                        source={this.props.organisationUnitGroupOptions}
                                        listStyle={listStyle}
                                />
                        </Tab>
                        <Tab label={this.i18n.constants}>
                            <ListSelect onItemDoubleClick={this.constantSelected}
                                        source={this.props.constantOptions}
                                        listStyle={listStyle}
                                />
                        </Tab>
                    </Tabs>
                </div>
                <div className="indicator-expression-manager__readable-expression">
                    <Paper>{this.state.expressionStatus.description}</Paper>
                    <div className={statusMessageClasses}>{this.state.expressionStatus.message}</div>
                </div>
            </div>
        );
    },

    i18n: {
        description: 'Description',
        constants: 'Constants',
        organisationUnitCounts: 'Organisation unit counts',
        dataElements: 'Data elements',
        thisFieldIsRequired: 'This field is required',
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
