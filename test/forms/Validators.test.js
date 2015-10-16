import {
    isEmptyString,
    isEmail,
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

    describe('isEmail', () => {
        it('should return true for a valid email', () => {
            expect(isEmail('superman@gmail.com')).to.be.true;
        });

        it('should return false for an invalid email', () => {
            expect(isEmail('@gmail.com')).to.equal('field_should_be_an_email');
        });

        it('should return true when the value is undefined', () => {
            expect(isEmail(undefined)).to.be.true;
        });

        it('should return true when the value is null', () => {
            expect(isEmail(null)).to.equal('field_should_be_an_email');
        });

        it('should return true when the value is an empty string', () => {
            expect(isEmail('')).to.be.true;
        });

        it('should return false when the value is whitespace string', () => {
            expect(isEmail(' ')).to.equal('field_should_be_an_email');
        });
    });
});
