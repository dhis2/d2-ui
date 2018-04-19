import {
    isEmptyString,
    isEmptyStringOrUndefined,
    isEmail,
    isNull,
    isRequired,
    isUrl,
    isUrlArray,
    isRelativeUrl,
    isNumber,
    isPositiveNumber,
    isValidPassword,
} from '../Validators';

describe('Validators', () => {
    describe('isEmptyString', () => {
        it('should return false on boolean value', () => {
            expect(isEmptyString(true)).toBe(false);
            expect(isEmptyString(false)).toBe(false);
        });

        it('should return true on an empty string', () => {
            expect(isEmptyString('')).toBe(true);
        });

        it('should return false on a string with whitespace', () => {
            expect(isEmptyString('   ')).toBe(false);
        });

        it('should return false on undefined', () => {
            expect(isEmptyString(undefined)).toBe(false);
        });

        it('should return false on null', () => {
            expect(isEmptyString(null)).toBe(false);
        });
    });

    describe('isEmptyStringOrUndefined', () => {
        it('should return true when the value is an empty string', () => {
            expect(isEmptyStringOrUndefined('')).toBe(true);
        });

        it('should return true when the value is undefined', () => {
            expect(isEmptyStringOrUndefined(undefined)).toBe(true);
        });

        it('should return false when the value is 0', () => {
            expect(isEmptyStringOrUndefined(0)).toBe(false);
        });

        it('should return false when the value is an object', () => {
            expect(isEmptyStringOrUndefined({})).toBe(false);
        });

        it('should have a message', () => {
            expect(isEmptyStringOrUndefined.message).toBe('value_should_be_empty_string_or_undefined');
        });
    });

    describe('isEmail', () => {
        it('should return true for a valid email', () => {
            expect(isEmail('superman@gmail.com')).toBe(true);
        });

        it('should return false for an invalid email', () => {
            expect(isEmail('@gmail.com')).toBe(false);
        });

        it('should return true when the value is undefined', () => {
            expect(isEmail(undefined)).toBe(true);
        });

        it('should return true when the value is null', () => {
            expect(isEmail(null)).toBe(false);
        });

        it('should return true when the value is an empty string', () => {
            expect(isEmail('')).toBe(true);
        });

        it('should return false when the value is whitespace string', () => {
            expect(isEmail(' ')).toBe(false);
        });

        it('should have a message property', () => {
            expect(isEmail.message).toBe('value_should_be_an_email');
        });
    });

    describe('isNull', () => {
        it('should return true when value is null', () => {
            expect(isNull(null)).toBe(true);
        });

        it('should return false when the value is a string', () => {
            expect(isNull('string')).toBe(false);
        });
    });

    describe('isRequired', () => {
        it('should return true when the value is available', () => {
            expect(isRequired('mark')).toBe(true);
        });

        it('should return false when the value is undefined', () => {
            expect(isRequired(undefined)).toBe(false);
        });

        it('should return false when the value is null', () => {
            expect(isRequired(null)).toBe(false);
        });

        it('should return true when the value is 0', () => {
            expect(isRequired(0)).toBe(true);
        });

        it('should return false when the value is an empty string', () => {
            expect(isRequired('')).toBe(false);
        });

        it('should return true for whitespace string', () => {
            expect(isRequired('  ')).toBe(true);
        });

        it('should have a message property', () => {
            expect(isRequired.message).toBe('value_required');
        });

        it('should accept false as a value', () => {
            expect(isRequired(false)).toBe(true);
        });

        it('should not accept NaN as a value', () => {
            expect(isRequired(NaN)).toBe(false);
        });
    });

    describe('isUrl', () => {
        it('should return true when the url is valid', () => {
            expect(isUrl('http://dhis2.org')).toBe(true);
        });

        it('should return true when the url is https', () => {
            expect(isUrl('http://dhis2.org')).toBe(true);
        });

        it('should return true when the url is localhost:8080', () => {
            expect(isUrl('http://localhost:8080')).toBe(true);
        });

        it('should pass if the value is empty', () => {
            expect(isUrl('')).toBe(true);
        });

        it('should pass if the value is undefined', () => {
            expect(isUrl()).toBe(true);
        });

        it('should have a message', () => {
            expect(isUrl.message).toBe('value_should_be_a_url');
        });
    });

    describe('isRelativeUrl', () => {
        it('should return true when there is no value', () => {
            expect(isRelativeUrl()).toBe(true);
        });

        it('should return true when the value is an empty string', () => {
            expect(isRelativeUrl('')).toBe(true);
        });

        it('should return true if there is a space in the name', () => {
            expect(isRelativeUrl('   a ')).toBe(true);
        });

        it('should have a message', () => {
            expect(isRelativeUrl.message).toBe('value_should_be_a_relative_url');
        });
    });

    describe('isNumber', () => {
        it('should return true when the value is 100', () => {
            expect(isNumber(100)).toBe(true);
        });

        it('should return true when the value is -100', () => {
            expect(isNumber(-100)).toBe(true);
        });

        it('should return true when the value is the string "100"', () => {
            expect(isNumber('100')).toBe(true);
        });

        it('should return true when the value is the string "-100"', () => {
            expect(isNumber('-100')).toBe(true);
        });

        it('should return true when the value is 1.9', () => {
            expect(isNumber(1.9)).toBe(true);
        });

        it('should return true when the value is -1.9', () => {
            expect(isNumber(-1.9)).toBe(true);
        });

        it('should return true when the value is the string "1.9"', () => {
            expect(isNumber('1.9')).toBe(true);
        });

        it('should return true when the value is the string "-1.9"', () => {
            expect(isNumber('-1.9')).toBe(true);
        });

        it('should return false when the value is an arbitrary string that starts with a number', () => {
            expect(isNumber('13 bananas')).toBe(false);
        });

        it('should return true when the value is a string containing a number in scientific notation', () => {
            expect(isNumber('314159e-5')).toBe(true);
        });

        it('should return true when the value is a string containing a negative number in scientific notation', () => {
            expect(isNumber('-314159e-5')).toBe(true);
        });

        it('should return true when the value is a number in scientific notation', () => {
            expect(isNumber(1.234e-45)).toBe(true);
        });

        it('should return true when the value is a negative number in scientific notation', () => {
            expect(isNumber(-1.234e-45)).toBe(true);
        });

        it('should return true when the value is 0', () => {
            expect(isNumber(0)).toBe(true);
        });

        it('should return true when the value is the string "0"', () => {
            expect(isNumber('0')).toBe(true);
        });

        it('should return true when the value is the empty string ""', () => {
            expect(isNumber('')).toBe(true);
        });

        it('should return false when the value is Infinity', () => {
            expect(isNumber(Infinity)).toBe(false);
        });

        it('should return false if the value is an object', () => {
            expect(isNumber({})).toBe(false);
        });

        it('should return true when the value is a number type', () => {
            expect(isNumber(new Number(2.1))).toBe(true); // eslint-disable-line no-new-wrappers
        });

        it('should return true when object.toString() returns the empty string', () => {
            expect(isNumber({ toString() { return ''; } })).toBe(true);
        });

        it('should return false when object.toString() returns an arbitrary string', () => {
            expect(isNumber({ toString() { return 'bla'; } })).toBe(false);
        });

        it('should return true when object.toString() returns a numeric string', () => {
            expect(isNumber({ toString() { return '1'; } })).toBe(true);
        });

        it('should return true if the value is undefined', () => {
            expect(isNumber()).toBe(true);
        });

        it('should return false if the number is null', () => {
            expect(isNumber(null)).toBe(false);
        });

        it('should have a message', () => {
            expect(isNumber.message).toBe('value_should_be_a_number');
        });
    });

    describe('isPositiveNumber', () => {
        it('should return true when the value is 100', () => {
            expect(isPositiveNumber(100)).toBe(true);
        });

        it('should return false when the value is -100', () => {
            expect(isPositiveNumber(-100)).toBe(false);
        });

        it('should return true when the value is the string "100"', () => {
            expect(isPositiveNumber('100')).toBe(true);
        });

        it('should return false when the value is the string "-100"', () => {
            expect(isPositiveNumber('-100')).toBe(false);
        });

        it('should return true when the value is 1.9', () => {
            expect(isPositiveNumber(1.9)).toBe(true);
        });

        it('should return false when the value is -1.9', () => {
            expect(isPositiveNumber(-1.9)).toBe(false);
        });

        it('should return true when the value is the string "1.9"', () => {
            expect(isPositiveNumber('1.9')).toBe(true);
        });

        it('should return false when the value is the string "-1.9"', () => {
            expect(isPositiveNumber('-1.9')).toBe(false);
        });

        it('should return false when the value is an arbitrary string that starts with a number', () => {
            expect(isPositiveNumber('13 bananas')).toBe(false);
        });

        it('should return true when the value is a string containing a number in scientific notation', () => {
            expect(isPositiveNumber('314159e-5')).toBe(true);
        });

        it('should return false when the value is a string containing a negative number in scientific notation', () => {
            expect(isPositiveNumber('-314159e-5')).toBe(false);
        });

        it('should return true when the value is a number in scientific notation', () => {
            expect(isPositiveNumber(1.234e-45)).toBe(true);
        });

        it('should return false when the value is a negative number in scientific notation', () => {
            expect(isPositiveNumber(-1.234e-45)).toBe(false);
        });

        it('should return false when the value is 0', () => {
            expect(isPositiveNumber(0)).toBe(false);
        });

        it('should return false when the value is the string "0"', () => {
            expect(isPositiveNumber('0')).toBe(false);
        });

        it('should return true when the value is the empty string ""', () => {
            expect(isPositiveNumber('')).toBe(true);
        });

        it('should return false when the value is Infinity', () => {
            expect(isPositiveNumber(Infinity)).toBe(false);
        });

        it('should return false if the value is an object', () => {
            expect(isPositiveNumber({})).toBe(false);
        });

        it('should return true when the value is a number type', () => {
            expect(isPositiveNumber(new Number(2.1))).toBe(true); // eslint-disable-line no-new-wrappers
        });

        it('should return true when object.toString() returns the empty string', () => {
            expect(isPositiveNumber({ toString() { return ''; } })).toBe(true);
        });

        it('should return false when object.toString() returns an arbitrary string', () => {
            expect(isPositiveNumber({ toString() { return 'bla'; } })).toBe(false);
        });

        it('should return false when object.toString() returns a numeric string which is negative', () => {
            expect(isPositiveNumber({ toString() { return '-1'; } })).toBe(false);
        });

        it('should return true when object.toString() returns a numeric string which is positive', () => {
            expect(isPositiveNumber({ toString() { return '1'; } })).toBe(true);
        });

        it('should return true if the value is undefined', () => {
            expect(isPositiveNumber()).toBe(true);
        });

        it('should return false if the number is null', () => {
            expect(isPositiveNumber(null)).toBe(false);
        });

        it('should have a message', () => {
            expect(isPositiveNumber.message).toBe('value_should_be_a_positive_number');
        });
    });

    describe('isUrlArray', () => {
        it('should return true when the array is empty', () => {
            expect(isUrlArray([])).toBe(true);
        });

        it('should return true when the array has a url', () => {
            expect(isUrlArray(['http://dhis2.org'])).toBe(true);
        });

        it('should return false when the array has something else then an url', () => {
            expect(isUrlArray('http://dhis2.org/ \na1')).toBe(false);
        });

        it('should return true where there is no value', () => {
            expect(isUrlArray()).toBe(true);
        });

        it('should return true when the value is an empty string', () => {
            expect(isUrlArray()).toBe(true);
        });

        it('should return false when the value is an object', () => {
            expect(isUrlArray({})).toBe(false);
        });

        it('should have a message', () => {
            expect(isUrlArray.message).toBe('value_should_be_list_of_urls');
        });
    });

    describe('isValidPassword', () => {
        it('should return false when value contains no digit', () => {
            expect(isValidPassword('ab@defGHIJ')).toBe(false);
        });

        it('should return false when value contains no uper-case character', () => {
            expect(isValidPassword('123abcdef')).toBe(false);
        });

        it('should return false when value is less than 8 characters', () => {
            expect(isValidPassword('1@@abcD')).toBe(false);
        });

        it('should return false when value is greater than 35 characters', () => {
            expect(isValidPassword('12@abcDndlwosjDlwjslapqiwejdnfmdskak')).toBe(false);
        });

        it('should return true for valid password', () => {
            expect(isValidPassword('1!!@abcD')).toBe(true);
        });
    });
});
