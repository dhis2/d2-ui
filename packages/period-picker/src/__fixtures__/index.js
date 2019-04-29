export const periodTypes = [
    {
        label: 'Daily',
        value: 'Daily',
    },
    {
        label: 'Weekly',
        value: 'Weekly',
    },
    {
        label: 'Weekly Wednesday',
        value: 'WeeklyWednesday',
    },
    {
        label: 'Weekly Thursday',
        value: 'WeeklyThursday',
    },
    {
        label: 'Weekly Saturday',
        value: 'WeeklySaturday',
    },
    {
        label: 'Weekly Sunday',
        value: 'WeeklySunday',
    },
    {
        label: 'Bi weekly',
        value: 'BiWeekly',
    },
    {
        label: 'Monthly',
        value: 'Monthly',
    },
    {
        label: 'Bi-monthly',
        value: 'BiMonthly',
    },
    {
        label: 'Quarterly',
        value: 'Quarterly',
    },
    {
        label: 'Six monthly',
        value: 'SixMonthly',
    },
    {
        label: 'Six monthly starting in April',
        value: 'SixMonthlyApril',
    },
    {
        label: 'Six monthly starting in November',
        value: 'SixMonthlyNov',
    },
    {
        label: 'Yearly',
        value: 'Yearly',
    },
    {
        label: 'Financial year starting in April',
        value: 'FinancialApril',
    },
    {
        label: 'Financial year starting in July',
        value: 'FinancialJuly',
    },
    {
        label: 'Financial year starting in October',
        value: 'FinancialOct',
    },
    {
        label: 'Financial year starting in November',
        value: 'FinancialNov',
    },
];

export const getPeriodTypesResponse = {
    periodTypes: [
        {
            frequencyOrder: 1,
            name: 'Daily',
            isoDuration: 'P1D',
            isoFormat: 'yyyyMMdd',
        },
        {
            frequencyOrder: 7,
            name: 'Weekly',
            isoDuration: 'P7D',
            isoFormat: 'yyyyWn',
        },
        {
            frequencyOrder: 7,
            name: 'WeeklyWednesday',
            isoDuration: 'P7D',
            isoFormat: 'yyyyWedWn',
        },
        {
            frequencyOrder: 7,
            name: 'WeeklyThursday',
            isoDuration: 'P7D',
            isoFormat: 'yyyyThuWn',
        },
        {
            frequencyOrder: 7,
            name: 'WeeklySaturday',
            isoDuration: 'P7D',
            isoFormat: 'yyyySatWn',
        },
        {
            frequencyOrder: 7,
            name: 'WeeklySunday',
            isoDuration: 'P7D',
            isoFormat: 'yyyySunWn',
        },
        {
            frequencyOrder: 14,
            name: 'BiWeekly',
            isoDuration: 'P14D',
            isoFormat: 'yyyyBiWn',
        },
        {
            frequencyOrder: 30,
            name: 'Monthly',
            isoDuration: 'P1M',
            isoFormat: 'yyyyMM',
        },
        {
            frequencyOrder: 61,
            name: 'BiMonthly',
            isoDuration: 'P2M',
            isoFormat: 'yyyyMMB',
        },
        {
            frequencyOrder: 91,
            name: 'Quarterly',
            isoDuration: 'P3M',
            isoFormat: 'yyyyQn',
        },
        {
            frequencyOrder: 182,
            name: 'SixMonthly',
            isoDuration: 'P6M',
            isoFormat: 'yyyySn',
        },
        {
            frequencyOrder: 182,
            name: 'SixMonthlyApril',
            isoDuration: 'P6M',
            isoFormat: 'yyyyAprilSn',
        },
        {
            frequencyOrder: 182,
            name: 'SixMonthlyNov',
            isoDuration: 'P6M',
            isoFormat: 'yyyyNovSn',
        },
        {
            frequencyOrder: 365,
            name: 'Yearly',
            isoDuration: 'P1Y',
            isoFormat: 'yyyy',
        },
        {
            frequencyOrder: 365,
            name: 'FinancialApril',
            isoDuration: 'P1Y',
            isoFormat: 'yyyyApril',
        },
        {
            frequencyOrder: 365,
            name: 'FinancialJuly',
            isoDuration: 'P1Y',
            isoFormat: 'yyyyJuly',
        },
        {
            frequencyOrder: 365,
            name: 'FinancialOct',
            isoDuration: 'P1Y',
            isoFormat: 'yyyyOct',
        },
        {
            frequencyOrder: 365,
            name: 'FinancialNov',
            isoDuration: 'P1Y',
            isoFormat: 'yyyyNov',
        },
    ],
};
