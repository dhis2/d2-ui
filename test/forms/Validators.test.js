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
} from '../../src/forms/Validators';

describe('Validators', () => {
    describe('isEmptyString', () => {
        it('should return false on boolean value', () => {
            expect(isEmptyString(true)).to.be.false;
            expect(isEmptyString(false)).to.be.false;
        });

        it('should return true on an empty string', () => {
            expect(isEmptyString('')).to.be.true;
        });

        it('should return false on a string with whitespace', () => {
            expect(isEmptyString('   ')).to.be.false;
        });

        it('should return false on undefined', () => {
            expect(isEmptyString(undefined)).to.be.false;
        });

        it('should return false on null', () => {
            expect(isEmptyString(null)).to.be.false;
        });
    });

    describe('isEmptyStringOrUndefined', () => {
        it('should return true when the value is an empty string', () => {
            expect(isEmptyStringOrUndefined('')).to.be.true;
        });

        it('should return true when the value is undefined', () => {
            expect(isEmptyStringOrUndefined(undefined)).to.be.true;
        });

        it('should return false when the value is 0', () => {
            expect(isEmptyStringOrUndefined(0)).to.be.false;
        });

        it('should return false when the value is an object', () => {
            expect(isEmptyStringOrUndefined({})).to.be.false;
        });

        it('should have a message', () => {
            expect(isEmptyStringOrUndefined.message).to.equal('value_should_be_empty_string_or_undefined');
        });
    });

    describe('isEmail', () => {
        it('should return true for a valid email', () => {
            expect(isEmail('superman@gmail.com')).to.be.true;
        });

        it('should return false for an invalid email', () => {
            expect(isEmail('@gmail.com')).to.be.false;
        });

        it('should return true when the value is undefined', () => {
            expect(isEmail(undefined)).to.be.true;
        });

        it('should return true when the value is null', () => {
            expect(isEmail(null)).to.be.false;
        });

        it('should return true when the value is an empty string', () => {
            expect(isEmail('')).to.be.true;
        });

        it('should return false when the value is whitespace string', () => {
            expect(isEmail(' ')).to.be.false;
        });

        it('should have a message property', () => {
            expect(isEmail.message).to.equal('value_should_be_an_email');
        });
    });

    describe('isNull', () => {
        it('should return true when value is null', () => {
            expect(isNull(null)).to.be.true;
        });

        it('should return false when the value is a string', () => {
            expect(isNull('string')).to.be.false;
        });
    });

    describe('isRequired', () => {
        it('should return true when the value is available', () => {
            expect(isRequired('mark')).to.be.true;
        });

        it('should return false when the value is undefined', () => {
            expect(isRequired(undefined)).to.be.false;
        });

        it('should return false when the value is null', () => {
            expect(isRequired(null)).to.be.false;
        });

        it('should return true when the value is 0', () => {
            expect(isRequired(0)).to.be.true;
        });

        it('should return false when the value is an empty string', () => {
            expect(isRequired('')).to.be.false;
        });

        it('should return true for whitespace string', () => {
            expect(isRequired('  ')).to.be.true;
        });

        it('should have a message property', () => {
            expect(isRequired.message).to.equal('value_required');
        });
    });

    describe('isUrl', () => {
        it('should return true when the url is valid', () => {
            expect(isUrl('http://dhis2.org')).to.be.true;
        });

        it('should return true when the url is https', () => {
            expect(isUrl('http://dhis2.org')).to.be.true;
        });

        it('should return true when the url is localhost:8080', () => {
            expect(isUrl('http://localhost:8080')).to.be.true;
        });

        it('should pass if the value is empty', () => {
            expect(isUrl('')).to.be.true;
        });

        it('should pass if the value is undefined', () => {
            expect(isUrl()).to.be.true;
        });

        it('should have a message', () => {
            expect(isUrl.message).to.equal('value_should_be_a_url');
        });
    });

    describe('isRelativeUrl', () => {
        it('should return true when there is no value', () => {
            expect(isRelativeUrl()).to.be.true;
        });

        it('should return true when the value is an empty string', () => {
            expect(isRelativeUrl('')).to.be.true;
        });

        it('should return true if there is a space in the name', () => {
            expect(isRelativeUrl('   a ')).to.be.true;
        });

        it('should have a message', () => {
            expect(isRelativeUrl.message).to.equal('value_should_be_a_relative_url');
        });
    });

    describe('isNumber', () => {
        it('should return true when the value is 100', () => {
            expect(isNumber(100)).to.be.true;
        });

        it('should return true when the value is the string "100"', () => {
            expect(isNumber('100')).to.be.true;
        });

        it('should return true when the value is 1.9', () => {
            expect(isNumber(1.9)).to.be.true;
        });

        it('should return true when the value is the string "1.9"', () => {
            expect(isNumber('1.9')).to.be.true;
        });

        it('should return false when the value is an arbitrary string that starts with a number', () => {
            expect(isNumber('13 bananas')).to.be.false;
        });

        it('should return true when the value is a string containing a number in scientific notation', () => {
            expect(isNumber('314159e-5')).to.be.true;
        });

        it('should return true when the value is a number in scientific notation', () => {
            expect(isNumber(1.234e-45)).to.be.true;
        });

        it('should return true when the value is 0', () => {
            expect(isNumber(0)).to.be.true;
        });

        it('should return true when the value is the string "0"', () => {
            expect(isNumber('0')).to.be.true;
        });

        it('should return false when the value is Infinity', () => {
            expect(isNumber(Infinity)).to.be.false;
        });

        it('should return false if the value is an object', () => {
            expect(isNumber({})).to.be.false;
        });

        it('should return true when the value is a number type', () => {
            expect(isNumber(new Number(2.1))).to.be.true; // eslint-disable-line no-new-wrappers
        });

        it('should return true when object.toString() returns the empty string', () => {
            expect(isNumber({toString() { return ''; }})).to.be.true;
        });

        it('should return false when object.toString() returns an arbitrary string', () => {
            expect(isNumber({toString() { return 'bla'; }})).to.be.false;
        });

        it('should return true when object.toString() returns a numeric string', () => {
            expect(isNumber({toString() { return '1'; }})).to.be.true;
        });

        it('should return true if the value is undefined', () => {
            expect(isNumber()).to.be.true;
        });

        it('should return false if the number is null', () => {
            expect(isNumber(null)).to.be.false;
        });

        it('should have a message', () => {
            expect(isNumber.message).to.equal('value_should_be_a_number');
        });
    });

    describe('isPositiveNumber', () => {
        it('should return true when the value is 100', () => {
            expect(isPositiveNumber(100)).to.be.true;
        });

        it('should return true when the value is the string "100"', () => {
            expect(isPositiveNumber('100')).to.be.true;
        });

        it('should return true when the value is 1.9', () => {
            expect(isPositiveNumber(1.9)).to.be.true;
        });

        it('should return true when the value is the string "1.9"', () => {
            expect(isPositiveNumber('1.9')).to.be.true;
        });

        it('should return false when the value is -1.9', () => {
            expect(isPositiveNumber(-1.9)).to.be.false;
        });

        it('should return false when the value is the string "-1.9"', () => {
            expect(isPositiveNumber('-1.9')).to.be.false;
        });

        it('should return false when the value is an arbitrary string that starts with a number', () => {
            expect(isPositiveNumber('-13 bananas')).to.be.false;
        });

        it('should return true when the value is a string containing a number in scientific notation', () => {
            expect(isPositiveNumber('314159e-5')).to.be.true;
        });

        it('should return true when the value is a number in scientific notation', () => {
            expect(isPositiveNumber(1.234e-45)).to.be.true;
        });

        it('should return false when the value is 0', () => {
            expect(isPositiveNumber(0)).to.be.false;
        });

        it('should return false when the value is the string "0"', () => {
            expect(isPositiveNumber('0')).to.be.false;
        });

        it('should return false when the value is -100', () => {
            expect(isPositiveNumber(-100)).to.be.false;
        });

        it('should return false when the value is the string "-100"', () => {
            expect(isPositiveNumber('-100')).to.be.false;
        });

        it('should return false when the value is Infinity', () => {
            expect(isPositiveNumber(Infinity)).to.be.false;
        });

        it('should return false if the value is an object', () => {
            expect(isPositiveNumber({})).to.be.false;
        });

        it('should return true when the value is a number type', () => {
            expect(isPositiveNumber(new Number(2.1))).to.be.true; // eslint-disable-line no-new-wrappers
        });

        it('should return false when object.toString() returns the empty string', () => {
            expect(isPositiveNumber({toString() { return ''; }})).to.be.false;
        });

        it('should return false when object.toString() returns an arbitrary string', () => {
            expect(isPositiveNumber({toString() { return 'bla'; }})).to.be.false;
        });

        it('should return false when object.toString() returns a numeric string which is negative', () => {
            expect(isPositiveNumber({toString() { return '-1'; }})).to.be.false;
        });

        it('should return true when object.toString() returns a numeric string which is positive', () => {
            expect(isPositiveNumber({toString() { return '1'; }})).to.be.true;
        });

        it('should return true if the value is undefined', () => {
            expect(isPositiveNumber()).to.be.true;
        });

        it('should return false if the number is null', () => {
            expect(isPositiveNumber(null)).to.be.false;
        });

        it('should have a message', () => {
            expect(isPositiveNumber.message).to.equal('value_should_be_a_positive_number');
        });
    });

    describe('isUrlArray', () => {
        it('should return true when the array is empty', () => {
            expect(isUrlArray([])).to.be.true;
        });

        it('should return true when the array has a url', () => {
            expect(isUrlArray(['http://dhis2.org'])).to.be.true;
        });

        it('should return false when the array has something else then an url', () => {
            expect(isUrlArray('http://dhis2.org/ \na1')).to.be.false;
        });

        it('should return true where there is no value', () => {
            expect(isUrlArray()).to.be.true;
        });

        it('should return true when the value is an empty string', () => {
            expect(isUrlArray()).to.be.true;
        });

        it('should return false when the value is an object', () => {
            expect(isUrlArray({})).to.be.false;
        });

        it('should have a message', () => {
            expect(isUrlArray.message).to.equal('value_should_be_list_of_urls');
        });
    });
});
