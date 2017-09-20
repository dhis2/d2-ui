import React from 'react';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField/TextField';
import FormBuilder from '../FormBuilder.component';
import { getStubContext } from '../../../config/inject-theme';
import AsyncValidatorRunner from '../AsyncValidatorRunner';

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
        expect(formComponent.instance().asyncValidationRunner).toBeInstanceOf(AsyncValidatorRunner);
    });

    describe('field rendering', () => {
        it('should render a the Textfield', () => {
            const textField = formComponent.find(TextField);

            expect(textField).toHaveLength(1);
        });

        it('should pass the value to the Textfield', () => {
            const textField = formComponent.find(TextField);

            expect(textField.props().value).toBe('John');
        });

        it('should pass the new value to the TextField when props has changed', () => {
            formComponent.setProps({
                fields: [
                    {name: 'name', component: TextField, value: 'Mike'},
                ],
            });
            formComponent.update();

            const textField = formComponent.find(TextField);

            expect(textField.props().value).toBe('Mike');
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
                            validator: jest.fn((value) => !!value),
                            message: 'field_is_required',
                        },
                    ],
                },
            ];

            function onUpdateField(fieldName, value) {
                fields[0].value = value;
            }

            onUpdateFieldSpy = jest.fn(onUpdateField);
            onUpdateFormStatus = jest.fn();

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });
        });

        it('should mark the field as valid', () => {
            const textField = formComponent.find(TextField);

            expect(textField.props().errorText).toBe(undefined);
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
                                    validator: jest.fn((value) => !!value),
                                    message: 'field_is_required',
                                },
                            ],
                        },
                    ],
                });
            });

            it('should mark the field as invalid', () => {
                expect(formComponent.state().fields.name.valid).toBe(false);
            });

            it('should pass the error message to the text field', () => {
                expect(formComponent.find(TextField).first().props().errorText).toBe('field_is_required');
            });

            it('should mark the form as invalid', () => {
                expect(formComponent.state().form.valid).toBe(false);
            });
        });

        describe('when changing textfield value', () => {
            it('should run the validator on value change', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John1' }});

                expect(fields[0].validators[0].validator).toHaveBeenCalledWith('John1');
            });

            it('should emit the value of the field from the form', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John1' }});

                expect(onUpdateFieldSpy).toHaveBeenCalledWith('name', 'John1');
            });

            it('should run the validator with an empty value', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: '' }});

                expect(fields[0].validators[0].validator).toHaveBeenCalledWith('');
            });

            it('should still emit the value from the form when it is invalid', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'ddd' }});

                expect(onUpdateFieldSpy).toHaveBeenCalledWith('name', 'ddd');
            });

            it('should not run the validator when the values are the same', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John' }});

                expect(fields[0].validators[0].validator).not.toHaveBeenCalled();
            });

            it('should still emit the value when the values are the same', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John' }});

                expect(onUpdateFieldSpy).toHaveBeenCalledWith('name', 'John');
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
                                validator: jest.fn((value) => value.size >= 2),
                                message: 'field_is_required',
                            },
                        ],
                    },
                ];

                function onUpdateField(fieldName, value) {
                    fields[0].value = value;
                }

                onUpdateFieldSpy = jest.fn(onUpdateField);
                onUpdateFormStatus = jest.fn();

                formComponent = renderComponent({
                    fields,
                    onUpdateField: onUpdateFieldSpy,
                    onUpdateFormStatus,
                });
            });

            it('should run the validator even when the value is the same', () => {
                const objectField = formComponent.find(ObjectField);

                objectField.props().onChange({ target: { value: fields[0].value }});

                expect(fields[0].validators[0].validator).toHaveBeenCalled();
            });

            it('should emit the value when the values are the same', () => {
                const objectField = formComponent.find(ObjectField);

                objectField.props().onChange({ target: { value: fields[0].value }});

                expect(onUpdateFieldSpy).toHaveBeenCalledWith('mapValues', fields[0].value);
                expect(onUpdateFieldSpy.mock.calls[0][1].get('key1')).toBe('value1');
                expect(onUpdateFieldSpy.mock.calls[0][1].get('key2')).toBe('value2');
            });
        });

        describe('onUpdateFormStatus callback', () => {
            it('should emit the formStatus when a field was changed and the value is valid', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: 'John1' }});

                expect(onUpdateFormStatus).toHaveBeenCalledWith({ pristine: false, valid: true, validating: false });
            });

            it('should emit the formStatus when a field was changed but the value is invalid', () => {
                const textField = formComponent.find(TextField);

                textField.props().onChange({ target: { value: '' }});

                expect(onUpdateFormStatus).toHaveBeenCalledWith({ pristine: false, valid: false, validating: false });
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
                        jest.fn(() => new Promise(() => {})),
                    ],
                },
            ];

            function onUpdateField(fieldName, value) {
                fields[0].value = value;
            }

            onUpdateFieldSpy = jest.fn(onUpdateField);
            onUpdateFormStatus = jest.fn();

            asyncValidationRunnerMock = {
                run() {
                    return this;
                },

                listenToValidatorsFor: jest.fn().mockReturnValue({
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

            expect(onUpdateFormStatus).toHaveBeenCalledWith({ pristine: false, valid: true, validating: true });
        });

        // TODO: Incorrectly(?) sets pristine state to true?
        it('should emit the formStatus after the async validators complete', (done) => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = jest.fn(() => Promise.resolve('Success'));

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });

            textField.props().onChange({ target: { value: 'John1' }});

            expect(onUpdateFormStatus).toHaveBeenCalledWith({ pristine: false, valid: true, validating: true });

            setTimeout(() => {
                expect(onUpdateFormStatus).toHaveBeenCalledWith({ pristine: true, valid: true, validating: false });
                formComponent.update();
                done();
            }, 5);
        });

        // TODO: Incorrectly(?) sets pristine state to true?
        it('should emit the formStatus after the async validators failed', (done) => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = jest.fn(() => Promise.reject('Failure'));

            asyncValidationRunnerMock.listenToValidatorsFor
                .mockReturnValue({
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

            expect(onUpdateFormStatus).toHaveBeenCalledWith({ pristine: false, valid: true, validating: true });

            setTimeout(() => {
                expect(onUpdateFormStatus).toHaveBeenCalledWith({ pristine: true, valid: false, validating: false });
                formComponent.update();
                done();
            }, 5);
        });

        it('should call the onUpdateField after the async validators completed', (done) => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = jest.fn(() => Promise.resolve('Success'));

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });

            textField.props().onChange({ target: { value: 'John1' }});

            setTimeout(() => {
                expect(onUpdateFieldSpy).toHaveBeenCalledWith('name', 'John1');
                formComponent.update();
                done();
            }, 5);
        });

        it('should call the onUpdateField after the async validators failed', (done) => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = jest.fn(() => Promise.reject('Failure'));

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });

            textField.props().onChange({ target: { value: 'John1' }});

            setTimeout(() => {
                expect(onUpdateFieldSpy).toHaveBeenCalledWith('name', 'John1');
                formComponent.update();
                done();
            }, 5);
        });

        it('should cancel the running async validators when the value is changed again', () => {
            const textField = formComponent.find(TextField);

            fields[0].asyncValidators[0] = jest.fn(() => new Promise(() => {}));

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });

            jest.spyOn(FormBuilder.prototype, 'cancelAsyncValidators');

            textField.props().onChange({ target: { value: 'John1' }});
            textField.props().onChange({ target: { value: 'John12' }});

            expect(formComponent.instance().cancelAsyncValidators).toHaveBeenCalled();
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

            onUpdateFieldSpy = jest.fn(onUpdateField);
            onUpdateFormStatus = jest.fn();

            formComponent = renderComponent({
                fields,
                onUpdateField: onUpdateFieldSpy,
                onUpdateFormStatus,
            });
        });

        it('should not run the handler for onChange', () => {
            jest.spyOn(FormBuilder.prototype, 'updateFieldState');

            const textField = formComponent.find(TextField);
            textField.props().onChange({ target: { value: 'John2' }});
            textField.props().onBlur({ target: { value: 'John2' }});


            expect(onUpdateFieldSpy).toHaveBeenCalledWith('name', 'John2');
        });
    });
});
