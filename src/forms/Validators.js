// Taken from http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without
// const urlRegExp = /^(([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?$/i;
const urlRegExp = /^https?:\/\/[^ ]*/i;

// Don't allow spaces in url?
const relativeUrlRegExp = /[^ ]*/i;

// Taken from the HTML5 spec http://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Atleast one digit
const oneDigit = (/^(?=.*\d)/);

// Atleast one uppercase character
const oneUpperCase = (/^(?=.*[A-Z])/);

// Atleast one special character
const oneSpecialCharacter = (/[!@#$%^&*(),.?":{}|<>]/);

export function isNull(value) {
    return value === null;
}

export function isUndefined(value) {
    return value === undefined;
}

export function isEmptyString(value) {
    return value === '' || (value !== undefined && value !== null && value.toString() === '');
}
isEmptyString.message = 'value_should_be_empty_string';


export function isEmptyStringOrUndefined(value) {
    return isUndefined(value) || isEmptyString(value);
}
isEmptyStringOrUndefined.message = 'value_should_be_empty_string_or_undefined';

export function isRequired(value) {
    return (Boolean(value) || value === 0 || value === false);
}
isRequired.message = 'value_required';

export function isUrl(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }
    return urlRegExp.test(value);
}
isUrl.message = 'value_should_be_a_url';

// FIXME: Always returns true?
export function isRelativeUrl(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }
    return relativeUrlRegExp.test(value.trim());
}
isRelativeUrl.message = 'value_should_be_a_relative_url';

export function isUrlArray(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }
    return (`${value}`)
        .split('\n')
        .filter(v => v.trim().length > 0)
        .reduce((prev, curr) => (prev === true && isUrl(curr)) || isEmptyString(curr.trim()), true);
}
isUrlArray.message = 'value_should_be_list_of_urls';

export function isEmail(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }
    return emailRegExp.test(value);
}
isEmail.message = 'value_should_be_an_email';

export function isNumber(value) {
    if (isNull(value)) {
        return false;
    }

    if (isEmptyStringOrUndefined(value)) {
        return true;
    }

    return !!(!isNaN(value) && Number(value) !== Infinity);
}
isNumber.message = 'value_should_be_a_number';

export function isPositiveNumber(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }

    return isNumber(value) && Number(value) > 0;
}
isPositiveNumber.message = 'value_should_be_a_positive_number';

export function isValidPassword(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }
    return oneDigit.test(value) &&
        oneUpperCase.test(value) &&
        oneSpecialCharacter.test(value) &&
        value.length > 7 &&
        value.length < 36;
}
isValidPassword.message = 'invalid_password';

export function isStartDateBeforeEndDate(startDate, endDate) {
    if (isEmptyStringOrUndefined(startDate) || isEmptyStringOrUndefined(endDate)) {
        return true;
    }
    return new Date(startDate) < new Date(endDate);
}
isStartDateBeforeEndDate.message = 'closed_date_cannot_be_before_open_date';

export const wordToValidatorMap = new Map([
    ['required', isRequired],
    ['url', isUrl],
    ['relative_url', isRelativeUrl],
    ['url_array', isUrlArray],
    ['number', isNumber],
    ['positive_number', isPositiveNumber],
    ['email', isEmail],
    ['is_valid_password', isValidPassword],
    ['isStartDateBeforeEndDate', isStartDateBeforeEndDate],
]);

export default {
    isRequired,
    isUrl,
    isNumber,
    isPositiveNumber,
    isEmail,
    isEmptyString,
    isNull,
    isUndefined,
    isValidPassword,
    isStartDateBeforeEndDate,
};
