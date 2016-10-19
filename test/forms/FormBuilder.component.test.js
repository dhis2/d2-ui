import React from 'react';
import FormBuilder from '../../src/forms/FormBuilder.component';
import { shallow } from 'enzyme';
import { getStubContext } from '../../config/inject-theme';
import TextField from 'material-ui/TextField/TextField';
import AsyncValidatorRunner from '../../src/forms/AsyncValidatorRunner';

describe('FormBuilder component', () => {
    let formComponent;

    const renderComponent = (props, children) => {
        return shallow(<FormBuilder {...props}>{children}</FormBuilder>, {
            context: getStubContext(),
        });
    };

    beforeEach(() => {
        const fields = [
            { name: 'name', component: TextField, value: 'John' },
        ];

        function onUpdateField(fieldName, value) {
            fields[0].value = value;
        }

        formComponent = renderComponent({ fields, onUpdateField });
    });

    it('should have a asyncFieldValidator availble on the component', () => {
        expect(formComponent.instance().asyncValidationRunner).to.be.instanceof(AsyncValidatorRunner);
    });

    describe('field rendering', () => {
        it('should render a the TextField', () => {
            const textField = formComponent.find(TextField);

            expect(textField).to.have.length(1);
        });

        it('should pass the value to the TextField', () => {
            const textField = formComponent.find(TextField);

            expect(textField.props().value).to.equal('John');
        });

        it('should pass the new value to the TextField when props has changed', () => {
            formComponent.setProps({
                fields: [
                    {name: 'name', component: TextField, value: 'Mike'},
                ],
            });
            formComponent.update();

            const textField = formComponent.find(TextField);

            expect(textField.props().value).to.equal('Mike');
        });
    });

    describe('field rendering with sync validator', () => {
        let fields;
        let onUpdateFieldSpy;
        let onUpdateFormStatus;

        beforeEach(() => {
            fields = [
                {
                    name: 'name',
                    component: TextField,
                    value: 'John',
                    validators: [
                        {
                            validator: sinon.spy((value) => !!value),
                            message: 'field_is_required',
                        },
                    ],
                },
            ];

            function onUpdateField(fieldName, value) {
                fields[0].value = value;
            }

            onUpdateFieldSpy = sinon.spy(onUpdateField);
            onUpdateFormStatus = sinon.spy();

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });
        });

        it('should mark the field as valid', () => {
            const textField = formComponent.find(TextField);

            expect(textField.props().errorText).to.be.undefined;
        });

        describe('with invalid result', () => {
            beforeEach(() => {
                formComponent.setProps({
                    fields: [
                        {
                            name: 'name',
                            component: TextField,
                            value: '',
                            validators: [
                                {
                                    validator: sinon.spy((value) => !!value),
                                    message: 'field_is_required',
                                },
                            ],
                        },
                    ],
                });
            });

            it('should mark the field as invalid', () => {
                expect(formComponent.state().fields.name.valid).to.be.false;
            });

            it('should pass the error message to the text field', () => {
                expect(formComponent.find(TextField).first().props().errorText).to.equal('field_is_required');
            });

            it('should mark the form as invalid', () => {
                expect(formComponent.state().form.valid).to.be.false;
            });
        });

        describe('when changing textfield value', () => {
            it('should run the validator on value change', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John1' }});

                expect(fields[0].validators[0].validator).to.be.calledWith('John1');
            });

            it('should emit the value of the field from the form', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John1' }});

                expect(onUpdateFieldSpy).to.be.calledWith('name', 'John1');
            });

            it('should run the validator with an empty value', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: '' }});

                expect(fields[0].validators[0].validator).to.be.calledWith('');
            });

            it('should still emit the value from the form when it is invalid', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'ddd' }});

                expect(onUpdateFieldSpy).to.be.calledWith('name', 'ddd');
            });

            it('should not run the validator when the values are the same', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John' }});

                expect(fields[0].validators[0].validator).not.to.be.called;
            });

            it('should still emit the value when the values are the same', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John' }});

                expect(onUpdateFieldSpy).to.be.calledWith('name', 'John');
            });
        });

        describe('when changing an `object` value', () => {
            // Fake object field
            const ObjectField = () => (<div></div>);

            beforeEach(() => {
                fields = [
                    {
                        name: 'mapValues',
                        component: ObjectField,
                        value: new Map([['key1', 'value1'], ['key2', 'value2']]),
                        validators: [
                            {
                                validator: sinon.spy((value) => value.size >= 2),
                                message: 'field_is_required',
                            },
                        ],
                    },
                ];

                function onUpdateField(fieldName, value) {
                    fields[0].value = value;
                }

                onUpdateFieldSpy = sinon.spy(onUpdateField);
                onUpdateFormStatus = sinon.spy();

                formComponent = renderComponent({
                    fields,
                    onUpdateField: onUpdateFieldSpy,
                    onUpdateFormStatus,
                });
            });

            it('should run the validator even when the value is the same', () => {
                const objectField = formComponent.find(ObjectField);

                objectField.props().onChange({ target: { value: fields[0].value }});

                expect(fields[0].validators[0].validator).to.be.called;
            });

            it('should emit the value when the values are the same', () => {
                const objectField = formComponent.find(ObjectField);

                objectField.props().onChange({ target: { value: fields[0].value }});

                expect(onUpdateFieldSpy).to.be.deep.calledWith('mapValues', fields[0].value);
                expect(onUpdateFieldSpy.firstCall.args[1].get('key1')).to.equal('value1');
                expect(onUpdateFieldSpy.firstCall.args[1].get('key2')).to.equal('value2');
            });
        });

        describe('onUpdateFormStatus callback', () => {
            it('should emit the formStatus when a field was changed and the value is valid', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John1' }});

                expect(onUpdateFormStatus).to.be.calledWith({ pristine: false, valid: true, validating: false });
            });

            it('should emit the formStatus when a field was changed but the value is invalid', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: '' }});

                expect(onUpdateFormStatus).to.be.calledWith({ pristine: false, valid: false, validating: false });
            });
        });
    });

    describe('field rendering with async validator', () => {
        let fields;
        let onUpdateFieldSpy;
        let onUpdateFormStatus;
        let asyncValidationRunnerMock;

        beforeEach(() => {
            fields = [
                {
                    name: 'name',
                    component: TextField,
                    value: 'John',
                    asyncValidators: [
                        sinon.spy(() => new Promise(() => {}))
                    ],
                },
            ];

            function onUpdateField(fieldName, value) {
                fields[0].value = value;
            }

            onUpdateFieldSpy = sinon.spy(onUpdateField);
            onUpdateFormStatus = sinon.spy();

            asyncValidationRunnerMock = {
                run() {
                    return this;
                },

                listenToValidatorsFor: stub().returns({
                    subscribe(callback) {
                        callback({fieldName: 'name', isValid: true});
                    },
                }),
            };

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
                asyncValidationRunner: asyncValidationRunnerMock,
            });
        });

        it('should emit the formStatus with validating set to true before running the async validators', () => {
            const textField = formComponent.find(TextField);

            textField.props().onChange({ target: { value: 'John1' }});

            expect(onUpdateFormStatus).to.be.calledWith({ pristine: false, valid: true, validating: true });
        });

        // TODO: Incorrectly(?) sets pristine state to true?
        it('should emit the formStatus after the async validators complete', (done) => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = sinon.spy(() => Promise.resolve('Success'));

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });

            textField.props().onChange({ target: { value: 'John1' }});

            expect(onUpdateFormStatus).to.be.calledWith({ pristine: false, valid: true, validating: true });

            setTimeout(() => {
                expect(onUpdateFormStatus).to.be.calledWith({ pristine: true, valid: true, validating: false });
                formComponent.update();
                done();
            }, 5);
        });

        // TODO: Incorrectly(?) sets pristine state to true?
        it('should emit the formStatus after the async validators failed', (done) => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = sinon.spy(() => Promise.reject('Failure'));

            asyncValidationRunnerMock.listenToValidatorsFor
                .returns({
                    subscribe(callback) {
                        callback({fieldName: 'name', isValid: false});
                    },
                });

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });

            textField.props().onChange({ target: { value: 'John1' }});

            expect(onUpdateFormStatus).to.be.calledWith({ pristine: false, valid: true, validating: true });

            setTimeout(() => {
                expect(onUpdateFormStatus).to.be.calledWith({ pristine: true, valid: false, validating: false });
                formComponent.update();
                done();
            }, 5);
        });

        it('should call the onUpdateField after the async validators completed', (done) => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = sinon.spy(() => Promise.resolve('Success'));

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });

            textField.props().onChange({ target: { value: 'John1' }});

            setTimeout(() => {
                expect(onUpdateFieldSpy).to.be.calledWith('name', 'John1');
                formComponent.update();
                done();
            }, 5);
        });

        it('should call the onUpdateField after the async validators failed', (done) => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = sinon.spy(() => Promise.reject('Failure'));

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });

            textField.props().onChange({ target: { value: 'John1' }});

            setTimeout(() => {
                expect(onUpdateFieldSpy).to.be.calledWith('name', 'John1');
                formComponent.update();
                done();
            }, 5);
        });

        it('should cancel the running async validators when the value is changed again', () => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = sinon.spy(() => new Promise(() => {}));

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });

            sinon.spy(FormBuilder.prototype, 'cancelAsyncValidators');

            textField.props().onChange({ target: { value: 'John1' }});
            textField.props().onChange({ target: { value: 'John12' }});

            expect(formComponent.instance().cancelAsyncValidators).to.be.called;
        });
    });

    describe('when changeEvent is blur', () => {
        let fields;
        let onUpdateFieldSpy;
        let onUpdateFormStatus;

        beforeEach(() => {
            fields = [
                {
                    name: 'name',
                    component: TextField,
                    value: 'John',
                    props: {
                        changeEvent: 'onBlur',
                    },
                },
            ];

            function onUpdateField(fieldName, value) {
                fields[0].value = value;
            }

            onUpdateFieldSpy = sinon.spy(onUpdateField);
            onUpdateFormStatus = sinon.spy();

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });
        });

        it('should not run the handler for onChange', () => {
            sinon.spy(FormBuilder.prototype, 'updateFieldState');

            const textField = formComponent.find(TextField);
            textField.props().onChange({ target: { value: 'John2' }});
            textField.props().onBlur({ target: { value: 'John2' }});


            expect(onUpdateFieldSpy).to.be.calledWith('name', 'John2');
        });
    });
});
