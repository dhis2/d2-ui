import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import { Observable } from 'rxjs';

import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import Paper from 'material-ui/Paper/Paper';
import Divider from 'material-ui/Divider';

import ExpressionDescription from './ExpressionDescription';
import ExpressionOperators from './ExpressionOperators';
import ExpressionFormula from './ExpressionFormula';

import OrganisationUnitGroupSelector from './OrganisationUnitGroupSelector';
import DataElementOperandSelector from './DataElementOperandSelector';
import ReportingRatesSelector from './ReportingRatesSelector';
import ProgramOperandSelector from './ProgramOperandSelector';
import ConstantSelector from './ConstantSelector';

import { Heading } from '@dhis2/d2-ui-core';
import { Action } from '@dhis2/d2-ui-core';
import { Row } from '@dhis2/d2-ui-core';
import { Column } from '@dhis2/d2-ui-core';

import { setInstance } from 'd2';

const styles = {
    expressionDescription: {
        padding: '1rem',
        margin: '1rem 0',
    },
    expressionMessage: {
        valid: {
            padding: '1rem',
            color: '#006400',
        },
        invalid: {
            padding: '1rem',
            color: '#8B0000',
        },
    },
    list: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem',
    },
    expressionFormulaWrap: {
        padding: '1rem',
        maxWidth: '650px',
        marginRight: '1rem',
    },
    expressionValueOptionsWrap: {
        minHeight: 400,
        minWidth: 600,
    },
    expressionContentWrap: {
        minHeight: 360,
    },
    tabItemContainer: {
        backgroundColor: 'rgb(33, 150, 243)',
    },
    tabs: {
        color: 'white',
    },
    divider: {
        padding: '0 1rem 2rem',
    },
};

class ExpressionManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formula: this.props.formulaValue,
            description: this.props.descriptionValue,
            expressionStatus: {
                description: '',
                isValid: false,
            },
        };

        // override the d2 instance
        setInstance(this.props.d2)

        this.i18n = this.props.d2.i18n;

        this.i18n.strings.add('description');
        this.i18n.strings.add('program_tracked_entity_attributes');
        this.i18n.strings.add('program_indicators');
        this.i18n.strings.add('program_data_elements');
        this.i18n.strings.add('field_is_required');
        this.i18n.strings.add('organisation_unit_counts'); // shorten to org_unit_counts in maintenance
        this.i18n.strings.add('reporting_rates');
        this.i18n.strings.add('data_elements');
        this.i18n.strings.add('constants');
        this.i18n.strings.add('programs');

        this.requestExpressionStatusAction = Action.create('requestExpressionStatus');
    }

    getChildContext() {
        return {
            d2: this.props.d2,
        };
    }

    componentWillMount() {
        if (!this.props.expressionStatusStore) {
            return true;
        }

        let first = true;

        this.disposable = this.props.expressionStatusStore
            .subscribe((expressionStatus) => {
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

                    this.props.expressionChanged({
                        formula: this.state.formula,
                        description: this.state.description,
                        expressionStatus: this.state.expressionStatus,
                    });
                });
            }, error => log.error(error));

        this.expressionStatusDisposable = this.requestExpressionStatusAction
            .debounceTime(500)
            .map(this.props.validateExpression || this.validateExpression)
            .concatAll()
            .subscribe(
                response => this.props.expressionStatusStore.setState(response),
                error => log.error(error),
            );

        if (this.props.formulaValue.trim()) {
            this.requestExpressionStatus();
        }
    }

    componentWillUnmount() {
        this.disposable && this.disposable.unsubscribe();
        this.expressionStatusDisposable && this.expressionStatusDisposable.unsubscribe();
    }

    descriptionChange = (newDescription) => {
        this.setState({
            description: newDescription,
        }, () => {
            this.props.expressionChanged({
                formula: this.state.formula,
                description: this.state.description,
                expressionStatus: this.state.expressionStatus,
            });
        });
    }

    formulaChange = (newFormula) => {
        this.setState({
            formula: newFormula,
        }, () => {
            this.requestExpressionStatus();
        });
    }

    addOperatorToFormula = (operator) => {
        this.appendToFormula(operator);
    }

    programOperandSelected = (programFormulaPart) => {
        this.appendToFormula(programFormulaPart);
    }

    appendToFormula = (partToAppend) => {
        this.setState({
            formula: [this.state.formula, partToAppend].join(''),
        }, () => {
            this.requestExpressionStatus();
        });
    }

    dataElementOperandSelected = (dataElementOperandId) => {
        const dataElementOperandFormula = ['#{', dataElementOperandId, '}'].join('');

        this.appendToFormula(dataElementOperandFormula);
    }

    requestExpressionStatus = () => {
        this.requestExpressionStatusAction(this.state.formula);
    }

    validateExpression = action => {
        const formula = action.data;
        const url = 'expressions/description';

        return Observable.fromPromise(this.props.d2.Api.getApi().get(url, { expression: formula }));
    }

    render() {
        const isDescriptionValid = () => this.state.description && this.state.description.trim();

        return (
            <Column>
                <Heading level={3} text={this.props.titleText} />
                <Row>
                    <Paper style={styles.expressionFormulaWrap}>
                        <Column>
                            <ExpressionDescription
                                descriptionValue={this.state.description}
                                descriptionLabel={this.i18n.getTranslation('description')}
                                onDescriptionChange={this.descriptionChange}
                                errorText={!isDescriptionValid() ? this.i18n.getTranslation('field_is_required') : undefined}
                                onBlur={this.requestExpressionStatus}
                            />
                            <ExpressionFormula
                                onFormulaChange={this.formulaChange}
                                formula={this.state.formula}
                            />
                            <ExpressionOperators operatorClicked={this.addOperatorToFormula} />
                        </Column>
                    </Paper>
                    <Paper style={styles.expressionValueOptionsWrap}>
                        <Tabs style={styles.expressionContentWrap} tabItemContainerStyle={styles.tabItemContainer}>
                            <Tab style={styles.tabs} label={this.i18n.getTranslation('data_elements')}>
                                <DataElementOperandSelector
                                    listStyle={styles.list}
                                    onSelect={this.dataElementOperandSelected}
                                />
                            </Tab>
                            <Tab style={styles.tabs} label={this.i18n.getTranslation('programs')}>
                                <ProgramOperandSelector
                                    onSelect={this.programOperandSelected}
                                />
                            </Tab>
                            <Tab style={styles.tabs} label={this.i18n.getTranslation('organisation_unit_counts')}>
                                <OrganisationUnitGroupSelector
                                    listStyle={styles.list}
                                    onSelect={this.appendToFormula}
                                />
                            </Tab>
                            <Tab style={styles.tabs} label={this.i18n.getTranslation('constants')}>
                                <ConstantSelector
                                    listStyle={styles.list}
                                    onSelect={this.appendToFormula}
                                />
                            </Tab>
                            <Tab style={styles.tabs} label={this.i18n.getTranslation('reporting_rates')}>
                                <ReportingRatesSelector
                                    listStyle={styles.list}
                                    onSelect={this.appendToFormula}
                                />
                            </Tab>
                        </Tabs>
                        <div style={styles.divider}>
                            <Divider />
                        </div>
                    </Paper>
                </Row>
                <Column>
                    <Paper style={styles.expressionDescription}>{this.state.expressionStatus.description}</Paper>
                    <div style={this.state.expressionStatus.isValid
                        ? styles.expressionMessage.valid
                        : styles.expressionMessage.invalid}
                    >
                        {this.state.expressionStatus.message}
                    </div>
                </Column>
            </Column>
        );
    }
}
ExpressionManager.propTypes = {
    expressionStatusStore: PropTypes.object.isRequired,
    expressionChanged: PropTypes.func.isRequired,
    descriptionValue: PropTypes.string,
    formulaValue: PropTypes.string,
    titleText: PropTypes.string,
    validateExpression: PropTypes.func,
};

ExpressionManager.defaultProps = {
    descriptionValue: '',
    formulaValue: '',
    titleText: '',
};

ExpressionManager.childContextTypes = {
    d2: PropTypes.object,
};

export default ExpressionManager;
