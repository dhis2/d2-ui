import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import Paper from 'material-ui/Paper/Paper';
import log from 'loglevel';
import { config } from 'd2/lib/d2';
import ExpressionDescription from './ExpressionDescription';
import ExpressionOperators from './ExpressionOperators';
import ExpressionFormula from './ExpressionFormula';
import DataElementOperandSelector from './DataElementOperandSelector';
import ProgramOperandSelector from './ProgramOperandSelector';
import Heading from '../headings/Heading.component';
import OrganisationUnitGroupSelector from './OrganisationUnitGroupSelector';
import ConstantSelector from './ConstantSelector';
import addD2Context from '../component-helpers/addD2Context';
import Action from '../action/Action';
import Row from '../layout/Row.component';
import Column from '../layout/Column.component';

config.i18n.strings.add('data_elements');
config.i18n.strings.add('description');
config.i18n.strings.add('organisation_unit_counts');
config.i18n.strings.add('program_tracked_entity_attributes');
config.i18n.strings.add('program_indicators');
config.i18n.strings.add('program_data_elements');
config.i18n.strings.add('constants');
config.i18n.strings.add('field_is_required');
config.i18n.strings.add('programs');

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
        minHeight: 395,
    },
};

class ExpressionManager extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            formula: this.props.formulaValue,
            description: this.props.descriptionValue,
            expressionStatus: {
                description: '',
                isValid: false,
            },
        };

        this.i18n = this.context.d2.i18n;
        this.requestExpressionStatusAction = Action.create('requestExpressionStatus');
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
            .map((action) => {
                const formula = action.data;
                const url = 'expressions/description';

                return Observable.fromPromise(this.context.d2.Api.getApi().get(url, { expression: formula }));
            })
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
                        <Tabs>
                            <Tab label={this.i18n.getTranslation('data_elements')}>
                                <DataElementOperandSelector
                                    listStyle={styles.list}
                                    onItemDoubleClick={this.dataElementOperandSelected}
                                />
                            </Tab>
                            <Tab label={this.i18n.getTranslation('programs')}>
                                <ProgramOperandSelector programOperandSelected={this.programOperandSelected} />
                            </Tab>
                            <Tab label={this.i18n.getTranslation('organisation_unit_counts')}>
                                <OrganisationUnitGroupSelector
                                    listStyle={styles.list}
                                    onSelect={this.appendToFormula}
                                />
                            </Tab>
                            <Tab label={this.i18n.getTranslation('constants')}>
                                <ConstantSelector
                                    listStyle={styles.list}
                                    onSelect={this.appendToFormula}
                                />
                            </Tab>
                        </Tabs>
                    </Paper>
                </Row>
                <Column>
                    <Paper style={styles.expressionDescription}>{this.state.expressionStatus.description}</Paper>
                    <div
                        style={this.state.expressionStatus.isValid ? styles.expressionMessage.valid : styles.expressionMessage.invalid}
                    >
                        {this.state.expressionStatus.message}
                    </div>
                </Column>
            </Column>
        );
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
}
ExpressionManager.propTypes = {
    descriptionLabel: PropTypes.string.isRequired,
    expressionStatusStore: PropTypes.object.isRequired,
    expressionChanged: PropTypes.func.isRequired,
    descriptionValue: PropTypes.string.isRequired,
    formulaValue: PropTypes.string.isRequired,
    titleText: PropTypes.string,
};

export default addD2Context(ExpressionManager);
