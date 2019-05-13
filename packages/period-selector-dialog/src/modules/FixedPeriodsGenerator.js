// generatePeriods config object: { boolean offset, boolean filterFuturePeriods, boolean reversePeriods }

function DailyPeriodType(formatYyyyMmDd, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`01 Jan ${year}`);

        while (date.getFullYear() === year) {
            const period = {};
            period.startDate = formatYyyyMmDd(date);
            period.endDate = period.startDate;
            period.name = period.startDate;
            // period['id'] = 'Daily_' + period['startDate'];
            period.iso = period.startDate.replace(/-/g, '');
            period.id = period.iso;
            periods.push(period);
            date.setDate(date.getDate() + 1);
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods.reverse() : periods;

        return periods;
    };
}

function WeeklyPeriodType(formatYyyyMmDd, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`01 Jan ${year}`);
        const day = date.getDay();
        let week = 1;

        if (day <= 4) {
            date.setDate(date.getDate() - (day - 1));
        } else {
            date.setDate(date.getDate() + (8 - day));
        }

        while (date.getFullYear() <= year) {
            const period = {};
            period.startDate = formatYyyyMmDd(date);
            // period['id'] = 'Weekly_' + period['startDate'];
            period.iso = `${year}W${week}`;
            period.id = period.iso;
            date.setDate(date.getDate() + 6);
            period.endDate = formatYyyyMmDd(date);
            period.name = `W${week} - ${period.startDate} - ${period.endDate}`;
            periods.push(period);
            date.setDate(date.getDate() + 1);

            week += 1;
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods.reverse() : periods;

        return periods;
    };
}

function BiWeeklyPeriodType(formatYyyyMmDd, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`01 Jan ${year}`);
        const day = date.getDay();
        let biWeek = 1;

        if (day <= 4) {
            date.setDate(date.getDate() - (day - 1));
        } else {
            date.setDate(date.getDate() + (8 - day));
        }

        while (date.getFullYear() <= year) {
            const period = {};

            period.iso = `${year}BiW${biWeek}`;
            period.id = period.iso;
            period.name = `Bi-Week ${biWeek} - ${period.startDate} - ${period.endDate}`;
            period.startDate = formatYyyyMmDd(date);
            date.setDate(date.getDate() + 13);
            period.endDate = formatYyyyMmDd(date);
            periods.push(period);

            date.setDate(date.getDate() + 1);

            biWeek += 1;
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods.reverse() : periods;

        // Bi-weekly are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.

        return periods;
    };
}

function MonthlyPeriodType(formatYyyyMmDd, monthNames, fnFilter) {
    const formatIso = (date) => {
        const y = date.getFullYear();
        let m = String(date.getMonth() + 1);

        m = m.length < 2 ? `0${m}` : m;

        return y + m;
    };

    this.generatePeriods = (config) => {
        let periods = [];

        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`31 Dec ${year}`);

        while (date.getFullYear() === year) {
            const period = {};

            period.endDate = formatYyyyMmDd(date);
            date.setDate(1);
            period.startDate = formatYyyyMmDd(date);
            period.name = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
            // period['id'] = 'Monthly_' + period['startDate'];
            period.iso = formatIso(date);
            period.id = period.iso;
            periods.push(period);
            date.setDate(0);
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods : periods.reverse();
        // Months are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.

        return periods;
    };
}

function BiMonthlyPeriodType(formatYyyyMmDd, monthNames, fnFilter) {
    const formatIso = (date) => {
        const y = date.getFullYear();
        let m = String(date.getMonth() + 1);

        m = m.length < 2 ? `0${m}` : m;

        return `${y + m}B`;
    };

    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`31 Dec ${year}`);

        while (date.getFullYear() === year) {
            const period = {};

            period.endDate = formatYyyyMmDd(date);
            date.setDate(0);
            date.setDate(1);
            period.startDate = formatYyyyMmDd(date);
            period.name = `${monthNames[date.getMonth()]} - ${monthNames[date.getMonth() + 1]} ${date.getFullYear()}`;
            // period['id'] = 'BiMonthly_' + period['startDate'];
            period.iso = formatIso(date);
            period.id = period.iso;
            periods.push(period);
            date.setDate(0);
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods : periods.reverse();
        // Bi-months are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.

        return periods;
    };
}

function QuarterlyPeriodType(formatYyyyMmDd, monthNames, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`31 Dec ${year}`);
        let quarter = 4;

        while (date.getFullYear() === year) {
            const period = {};
            period.endDate = formatYyyyMmDd(date);
            date.setDate(0);
            date.setDate(0);
            date.setDate(1);
            period.startDate = formatYyyyMmDd(date);
            period.name = `${monthNames[date.getMonth()]} - ${monthNames[date.getMonth() + 2]} ${date.getFullYear()}`;
            // period['id'] = 'Quarterly_' + period['startDate'];
            period.iso = `${year}Q${quarter}`;
            period.id = period.iso;
            periods.push(period);
            date.setDate(0);
            quarter -= 1;
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods : periods.reverse();
        // Quarters are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.

        return periods;
    };
}

function SixMonthlyPeriodType(monthNames, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;

        let period = {};
        period.startDate = `${year}-01-01`;
        period.endDate = `${year}-06-30`;
        period.name = `${monthNames[0]} - ${monthNames[5]} ${year}`;
        // period['id'] = 'SixMonthly_' + period['startDate'];
        period.iso = `${year}S1`;
        period.id = period.iso;
        periods.push(period);

        period = {};
        period.startDate = `${year}-07-01`;
        period.endDate = `${year}-12-31`;
        period.name = `${monthNames[6]} - ${monthNames[11]} ${year}`;
        // period['id'] = 'SixMonthly_' + period['startDate'];
        period.iso = `${year}S2`;
        period.id = period.iso;
        periods.push(period);

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods.reverse() : periods;

        return periods;
    };
}

function SixMonthlyAprilPeriodType(monthNames, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;

        let period = {};
        period.startDate = `${year}-04-01`;
        period.endDate = `${year}-09-30`;
        period.name = `${monthNames[3]} - ${monthNames[8]} ${year}`;
        // period['id'] = 'SixMonthlyApril_' + period['startDate'];
        period.iso = `${year}AprilS1`;
        period.id = period.iso;
        periods.push(period);

        period = {};
        period.startDate = `${year}-10-01`;
        period.endDate = `${year + 1}-03-31`;
        period.name = `${monthNames[9]} ${year} - ${monthNames[2]} ${year + 1}`;
        // period['id'] = 'SixMonthlyApril_' + period['startDate'];
        period.iso = `${year}AprilS2`;
        period.id = period.iso;
        periods.push(period);

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods.reverse() : periods;

        return periods;
    };
}

function YearlyPeriodType(formatYyyyMmDd, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`31 Dec ${year}`);

        while ((year - date.getFullYear()) < 10) {
            const period = {};
            period.endDate = formatYyyyMmDd(date);
            date.setMonth(0, 1);
            period.startDate = formatYyyyMmDd(date);
            period.name = date.getFullYear().toString();
            // period['id'] = 'Yearly_' + period['startDate'];
            period.iso = date.getFullYear().toString();
            period.id = period.iso.toString();
            periods.push(period);
            date.setDate(0);
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods : periods.reverse();
        // Years are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.

        return periods;
    };
}

function FinancialOctoberPeriodType(formatYyyyMmDd, monthNames, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`30 Sep ${year + 1}`);

        for (let i = 0; i < 10; i++) {
            const period = {};
            period.endDate = formatYyyyMmDd(date);
            date.setYear(date.getFullYear() - 1);
            date.setDate(date.getDate() + 1);
            period.startDate = formatYyyyMmDd(date);
            period.name = `${monthNames[9]} ${date.getFullYear()} - ${monthNames[8]} ${date.getFullYear() + 1}`;
            period.id = `${date.getFullYear()}Oct`;
            periods.push(period);
            date.setDate(date.getDate() - 1);
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods : periods.reverse();
        // FinancialOctober periods are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.

        return periods;
    };
}

function FinancialJulyPeriodType(formatYyyyMmDd, monthNames, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`30 Jun ${year + 1}`);

        for (let i = 0; i < 10; i++) {
            const period = {};
            period.endDate = formatYyyyMmDd(date);
            date.setYear(date.getFullYear() - 1);
            date.setDate(date.getDate() + 1);
            period.startDate = formatYyyyMmDd(date);
            period.name = `${monthNames[6]} ${date.getFullYear()} - ${monthNames[5]} ${date.getFullYear() + 1}`;
            period.id = `${date.getFullYear()}July`;
            periods.push(period);
            date.setDate(date.getDate() - 1);
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods : periods.reverse();
        // FinancialJuly periods are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.

        return periods;
    };
}

function FinancialAprilPeriodType(formatYyyyMmDd, monthNames, fnFilter) {
    this.generatePeriods = (config) => {
        let periods = [];
        const offset = parseInt(config.offset, 10);
        const isFilter = config.filterFuturePeriods;
        const isReverse = config.reversePeriods;
        const year = new Date().getFullYear() + offset;
        const date = new Date(`31 Mar ${year + 1}`);

        for (let i = 0; i < 10; i++) {
            const period = {};
            period.endDate = formatYyyyMmDd(date);
            date.setYear(date.getFullYear() - 1);
            date.setDate(date.getDate() + 1);
            period.startDate = formatYyyyMmDd(date);
            period.name = `${monthNames[3]} ${date.getFullYear()} - ${monthNames[2]} ${date.getFullYear() + 1}`;
            period.id = `${date.getFullYear()}April`;
            periods.push(period);
            date.setDate(date.getDate() - 1);
        }

        periods = isFilter ? fnFilter(periods) : periods;
        periods = isReverse ? periods : periods.reverse();
        // FinancialApril periods are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.

        return periods;
    };
}

function PeriodType() {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const formatYyyyMmDd = (date) => {
        const y = date.getFullYear();
        let m = String(date.getMonth() + 1);
        let d = String(date.getDate());

        m = m.length < 2 ? `0${m}` : m;
        d = d.length < 2 ? `0${d}` : d;

        return `${y}-${m}-${d}`;
    };

    const filterFuturePeriods = (periods) => {
        const array = [];
        const now = new Date();

        for (let i = 0; i < periods.length; i++) {
            if (new Date(periods[i].startDate) <= now) {
                array.push(periods[i]);
            }
        }

        return array;
    };

    const periodTypes = [];

    periodTypes.Daily = new DailyPeriodType(formatYyyyMmDd, filterFuturePeriods);
    periodTypes.Weekly = new WeeklyPeriodType(formatYyyyMmDd, filterFuturePeriods);
    periodTypes['Bi-weekly'] = new BiWeeklyPeriodType(formatYyyyMmDd, filterFuturePeriods);
    periodTypes.Monthly = new MonthlyPeriodType(formatYyyyMmDd, monthNames, filterFuturePeriods);
    periodTypes['Bi-monthly'] = new BiMonthlyPeriodType(formatYyyyMmDd, monthNames, filterFuturePeriods);
    periodTypes.Quarterly = new QuarterlyPeriodType(formatYyyyMmDd, monthNames, filterFuturePeriods);
    periodTypes['Six-monthly'] = new SixMonthlyPeriodType(monthNames, filterFuturePeriods);
    periodTypes['Six-monthly April'] = new SixMonthlyAprilPeriodType(monthNames, filterFuturePeriods);
    periodTypes.Yearly = new YearlyPeriodType(formatYyyyMmDd, filterFuturePeriods);
    periodTypes['Financial year (Start October)'] = new FinancialOctoberPeriodType(
        formatYyyyMmDd,
        monthNames,
        filterFuturePeriods,
    );
    periodTypes['Financial year (Start July)'] = new FinancialJulyPeriodType(
        formatYyyyMmDd,
        monthNames,
        filterFuturePeriods,
    );
    periodTypes['Financial year (Start April)'] = new FinancialAprilPeriodType(
        formatYyyyMmDd,
        monthNames,
        filterFuturePeriods,
    );

    this.get = key => periodTypes[key];
    this.getOptions = () => Object.keys(periodTypes);
}

export default PeriodType;
