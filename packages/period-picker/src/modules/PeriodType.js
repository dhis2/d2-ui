import parsePeriod from 'd2/period/parser';
import { is53WeekISOYear } from 'd2/period/helpers';
import { BI_MONTH, DAY, MONTH, YEAR } from './distinctTypes';
import {
    getYears,
    getMonths,
    createSequence,
    zeroPad,
    asInts,
    getYearFromId,
    getMonthFromId,
} from './helpers';

export class PeriodType {
    constructor({
        locale = 'en',
        type,
        typeLabel,
        fieldLabel,
        requiredSiblingFields = [YEAR],
        infix = '',
        suffix = '',
    }) {
        this.locale = locale;
        this.type = type;
        this.typeLabel = typeLabel;
        this.fieldLabel = fieldLabel;
        this.infix = infix;
        this.suffix = suffix;
        this.requiredSiblingFields = requiredSiblingFields;
    }

    getFields(state) {
        const fields = this.getFieldsWithEmptyOptions(state);

        if (!this.hasRequiredFields(state)) {
            return fields;
        }

        return this.getPeriodTypeFields(state, fields);
    }

    getTypeLabel() {
        return this.typeLabel;
    }

    getFieldsWithEmptyOptions(state) {
        return {
            years: getYears(state),
            [`${this.type}s`]: {
                name: this.type,
                label: this.fieldLabel,
                options: [],
            },
        };
    }

    hasRequiredFields(state) {
        return this.requiredSiblingFields.every(
            fieldName => !!state[fieldName]
        );
    }

    createPeriodOption(periodId, value) {
        const period = parsePeriod(periodId);
        return {
            value,
            label: period.name,
            id: period.id,
        };
    }

    getPeriodTypeFields(state, fields) {
        return fields;
    }

    getFieldUpdateObject(periodId) {
        return {
            [this.type]: periodId.split(this.infix)[1],
            [YEAR]: getYearFromId(periodId),
        };
    }
}

export class DailyPeriodType extends PeriodType {
    getFieldsWithEmptyOptions(state) {
        return {
            years: getYears(state),
            months: getMonths(this.locale),
            days: {
                name: this.type,
                label: this.fieldLabel,
                options: [],
            },
        };
    }

    getPeriodTypeFields(state, fields) {
        const [year, month] = asInts(state, [YEAR, MONTH]);
        const daysInMonth = new Date(year, month, 0).getDate();
        fields.days.options = createSequence(daysInMonth, true).map(dayNr => {
            const periodId = state[YEAR] + state[MONTH] + dayNr;
            return this.createPeriodOption(periodId, dayNr, true);
        });

        return fields;
    }

    getFieldUpdateObject(_periodId, startDate) {
        const date = new Date(startDate);
        return {
            [DAY]: zeroPad(date.getDate()),
            [MONTH]: zeroPad(date.getMonth() + 1),
            [YEAR]: date.getFullYear().toString(),
        };
    }
}

export class WeeklyPeriodType extends PeriodType {
    getPeriodTypeFields(state, fields) {
        const weeksInYear = is53WeekISOYear(parseInt(state[YEAR])) ? 53 : 52;
        fields.weeks.options = createSequence(weeksInYear).map(weekNr => {
            const periodId = state[YEAR] + this.infix + weekNr;
            return this.createPeriodOption(periodId, weekNr);
        });
        return fields;
    }
}

export class BiWeeklyPeriodType extends PeriodType {
    getPeriodTypeFields(state, fields) {
        const biWeeksInYear = is53WeekISOYear(parseInt(state[YEAR])) ? 27 : 26;
        fields.biWeeks.options = createSequence(biWeeksInYear).map(biWeekNr => {
            const periodId = state[YEAR] + this.infix + biWeekNr;
            return this.createPeriodOption(periodId, biWeekNr);
        });
        return fields;
    }
}

export class MonthlyPeriodType extends PeriodType {
    getPeriodTypeFields(state, fields) {
        fields.months.options = createSequence(12, true).map(monthNr => {
            const periodId = state[YEAR] + monthNr;
            return this.createPeriodOption(periodId, monthNr);
        });
        return fields;
    }

    getFieldUpdateObject(periodId) {
        return {
            [MONTH]: getMonthFromId(periodId),
            [YEAR]: getYearFromId(periodId),
        };
    }
}

export class BiMonthlyPeriodType extends PeriodType {
    getPeriodTypeFields(state, fields) {
        fields.biMonths.options = createSequence(6, true).map(biMonthNr => {
            const periodId = state[YEAR] + biMonthNr + this.suffix;
            return this.createPeriodOption(periodId, biMonthNr);
        });
        return fields;
    }

    getFieldUpdateObject(periodId) {
        return {
            [BI_MONTH]: periodId.substr(4, 2),
            [YEAR]: getYearFromId(periodId),
        };
    }
}

export class QuarterlyPeriodType extends PeriodType {
    getPeriodTypeFields(state, fields) {
        fields.quarters.options = createSequence(4).map(quarterNr => {
            const periodId = state[YEAR] + this.infix + quarterNr;
            return this.createPeriodOption(periodId, quarterNr);
        });
        return fields;
    }
}

export class SixMonthlyPeriodType extends PeriodType {
    getPeriodTypeFields(state, fields) {
        fields.sixMonths.options = createSequence(2).map(sixMonthNr => {
            const periodId = state[YEAR] + this.infix + sixMonthNr;
            return this.createPeriodOption(periodId, sixMonthNr);
        });
        return fields;
    }
}

export class YearlyPeriodType extends PeriodType {
    // Note that this class is overriding the getFields method because
    // no sibling fields are required
    getFields(state) {
        const fields = {
            years: getYears(state),
        };
        const options = fields.years.options.map(({ value }) => {
            const periodId = value + this.suffix;
            return this.createPeriodOption(periodId, value);
        });
        fields.years.options = options;
        return fields;
    }

    getFieldUpdateObject(periodId) {
        return {
            [YEAR]: getYearFromId(periodId),
        };
    }
}
