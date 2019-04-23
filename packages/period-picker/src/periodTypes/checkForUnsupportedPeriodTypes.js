import periodTypeLookup from './lookup';

export default function checkForUnsupportedPeriodTypes(periodTypes) {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const unsupportedPeriodTypes = periodTypes
        .filter(({ name }) => !periodTypeLookup.get(name))
        .map(({ name }) => name)
        .join(', ');

    if (unsupportedPeriodTypes) {
        console.warn(
            [
                'WARNING: Unsupported period type(s) detected',
                'The PeriodPicker component needs to be updated to support the following period type(s):',
                unsupportedPeriodTypes,
            ].join('\n')
        );
    }
}
