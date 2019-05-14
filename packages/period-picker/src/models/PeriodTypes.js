import i18n from '@dhis2/d2-i18n';
import {
    BI_MONTH,
    BI_WEEK,
    DAY,
    MONTH,
    QUARTER,
    SIX_MONTH,
    WEEK,
    YEAR,
} from '@dhis2/d2-ui-period-picker/src/models/distinctTypes';
import {
    DailyPeriodType,
    WeeklyPeriodType,
    BiWeeklyPeriodType,
    MonthlyPeriodType,
    BiMonthlyPeriodType,
    QuarterlyPeriodType,
    SixMonthlyPeriodType,
    YearlyPeriodType,
} from '@dhis2/d2-ui-period-picker/src/models/PeriodType';

const fieldLabels = {
    [WEEK]: i18n.t('Week'),
    [SIX_MONTH]: i18n.t('Six month period'),
    [YEAR]: i18n.t('Year'),
};

export class PeriodTypes {
    constructor(locale) {
        // const locale = d2.currentUser.userSettings.get('keyUiLocale');
        this.types = new Map([
            [
                'Daily',
                new DailyPeriodType({
                    type: DAY,
                    typeLabel: i18n.t('Daily'),
                    fieldLabel: i18n.t('Day'),
                    requiredSiblingFields: [YEAR, MONTH],
                    locale,
                }),
            ],
            [
                'Weekly',
                new WeeklyPeriodType({
                    type: WEEK,
                    typeLabel: i18n.t('Weekly'),
                    fieldLabel: fieldLabels[WEEK],
                    infix: 'W',
                }),
            ],
            [
                'WeeklyWednesday',
                new WeeklyPeriodType({
                    type: WEEK,
                    typeLabel: i18n.t('Weekly Wednesday'),
                    fieldLabel: fieldLabels[WEEK],
                    infix: 'WedW',
                }),
            ],
            [
                'WeeklyThursday',
                new WeeklyPeriodType({
                    type: WEEK,
                    typeLabel: i18n.t('Weekly Thursday'),
                    fieldLabel: fieldLabels[WEEK],
                    infix: 'ThuW',
                }),
            ],
            [
                'WeeklySaturday',
                new WeeklyPeriodType({
                    type: WEEK,
                    typeLabel: i18n.t('Weekly Saturday'),
                    fieldLabel: fieldLabels[WEEK],
                    infix: 'SatW',
                }),
            ],
            [
                'WeeklySunday',
                new WeeklyPeriodType({
                    type: WEEK,
                    typeLabel: i18n.t('Weekly Sunday'),
                    fieldLabel: fieldLabels[WEEK],
                    infix: 'SunW',
                }),
            ],
            [
                'BiWeekly',
                new BiWeeklyPeriodType({
                    type: BI_WEEK,
                    typeLabel: i18n.t('Bi weekly'),
                    fieldLabel: i18n.t('Bi Week'),
                    infix: 'BiW',
                }),
            ],
            [
                'Monthly',
                new MonthlyPeriodType({
                    type: MONTH,
                    typeLabel: i18n.t('Monthly'),
                    fieldLabel: i18n.t('Month'),
                }),
            ],
            [
                'BiMonthly',
                new BiMonthlyPeriodType({
                    type: BI_MONTH,
                    typeLabel: i18n.t('Bi-monthly'),
                    fieldLabel: i18n.t('Bi-month'),
                    suffix: 'B',
                }),
            ],
            [
                'Quarterly',
                new QuarterlyPeriodType({
                    type: QUARTER,
                    typeLabel: i18n.t('Quarterly'),
                    fieldLabel: i18n.t('Quarter'),
                    infix: 'Q',
                }),
            ],
            [
                'SixMonthly',
                new SixMonthlyPeriodType({
                    type: SIX_MONTH,
                    typeLabel: i18n.t('Six monthly'),
                    fieldLabel: fieldLabels[SIX_MONTH],
                    infix: 'S',
                }),
            ],
            [
                'SixMonthlyApril',
                new SixMonthlyPeriodType({
                    type: SIX_MONTH,
                    typeLabel: i18n.t('Six monthly starting in April'),
                    fieldLabel: fieldLabels[SIX_MONTH],
                    infix: 'AprilS',
                }),
            ],
            [
                'SixMonthlyNov',
                new SixMonthlyPeriodType({
                    type: SIX_MONTH,
                    typeLabel: i18n.t('Six monthly starting in November'),
                    fieldLabel: fieldLabels[SIX_MONTH],
                    infix: 'NovS',
                }),
            ],
            [
                'Yearly',
                new YearlyPeriodType({
                    type: YEAR,
                    typeLabel: i18n.t('Yearly'),
                    fieldLabel: fieldLabels[YEAR],
                }),
            ],
            [
                'FinancialApril',
                new YearlyPeriodType({
                    type: YEAR,
                    typeLabel: i18n.t('Financial year starting in April'),
                    fieldLabel: fieldLabels[YEAR],
                    suffix: 'April',
                }),
            ],
            [
                'FinancialJuly',
                new YearlyPeriodType({
                    type: YEAR,
                    typeLabel: i18n.t('Financial year starting in July'),
                    fieldLabel: fieldLabels[YEAR],
                    suffix: 'July',
                }),
            ],
            [
                'FinancialOct',
                new YearlyPeriodType({
                    type: YEAR,
                    typeLabel: i18n.t('Financial year starting in October'),
                    fieldLabel: fieldLabels[YEAR],
                    suffix: 'Oct',
                }),
            ],
            [
                'FinancialNov',
                new YearlyPeriodType({
                    type: YEAR,
                    typeLabel: i18n.t('Financial year starting in November'),
                    fieldLabel: fieldLabels[YEAR],
                    suffix: 'Nov',
                }),
            ],
        ]);
    }

    getPeriodTypes() {
        const periodTypes = [];
        this.types.forEach((type, key) => {
            periodTypes.push({ label: type.getTypeLabel(), value: key });
        });
        return periodTypes;
    }

    getPeriodType(name) {
        return this.types.get(name);
    }

    getFields(state) {
        if (!state.periodType) {
            return {};
        }
        return this.types.get(state.periodType).getFields(state);
    }

    getFieldUpdateObject({ type, id, startDate }) {
        return this.types.get(type).getFieldUpdateObject(id, startDate);
    }

    findActivePeriodId(state, fieldKeyToSkip) {
        const fields = this.getFields(state);
        let option;

        for (let fieldKey in fields) {
            if (fieldKey !== fieldKeyToSkip) {
                const field = fields[fieldKey];
                const fieldValue = state[field.name];
                option = field.options.find(
                    option => option.id && option.value === fieldValue
                );
                // Stop looping once found
                if (option) {
                    break;
                }
            }
        }
        return option ? option.id : null;
    }
}

export default PeriodTypes;
