// Temporary files for Strings/placeholders

const strings = {
    general: {
        hideLegend: 'Hide chart legend',
        hideChartTitle: 'Hide chart title',
        hideSubtitle: 'Hide chart subtitle',
    },
    tabs: {
        dataLabel: 'Data',
        axesLabel: 'Axes',
        stylesLabel: 'Styles',
    },
    data: {
        values: 'Show Values',
        stacked: 'Use 100% Stacked values',
        cumulative: 'Use cumulative values',
        targetLineValue: 'Target line value',
        targetLineTitle: 'Target line title',
        baseLineValue: 'Base line value',
        baseLineTitle: 'Base line title',

        hideEmptyCategories: {
            defaultValue: 'Hide empty categories',
            alternatives: [
                'None', 'Before first',
                'After last', 'Before first and after last', 'All'],
        },
        trendLine: {
            defaultValue: 'Trend line',
            alternatives: ['None', 'Linear', 'Polynomial', 'Loess'],
        },
        sortOrder: {
            defaultValue: 'Sort order',
            alternatives: ['None', 'Low to high', 'High to low'],
        },
        aggregation: {
            defaultValue: 'Aggregation type',
            alternatives: [
                'By data element',
                'Count', 'Average',
                'Average (sum in org unit hierarchy)',
                'Sum', 'Standard deviation', 'Variance',
                'Min', 'Max', 'Last Value', 'Last value (average in org unit hierarchy)'],
        },
    },
    axes: {
        min: 'Range axis min',
        max: 'Range axis max',
        tickSteps: 'Range axis tick step',
        decimals: 'Range axis decimals',
        rangeTitle: 'Range axis title',
        domainTitle: 'Domain axis title',
    },
    chart: {
        noSpace: 'No space between columns/bars',
        chartTitle: 'Chart Options',
    },

};
export default strings;
