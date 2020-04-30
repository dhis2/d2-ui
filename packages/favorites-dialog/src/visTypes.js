import i18n from '@dhis2/d2-i18n';
import BarIcon from './icons/BarIcon';
import StackedBarIcon from './icons/StackedBarIcon';
import ColumnIcon from './icons/ColumnIcon';
import StackedColumnIcon from './icons/StackedColumnIcon';
import LineIcon from './icons/LineIcon';
import AreaIcon from './icons/AreaIcon';
import PieIcon from './icons/PieIcon';
import RadarIcon from './icons/RadarIcon';
import GaugeIcon from './icons/GaugeIcon';
import YearOverYearLineIcon from './icons/YearOverYearLineIcon';
import YearOverYearColumnIcon from './icons/YearOverYearColumnIcon';
import SingleValueIcon from './icons/SingleValueIcon';
import PivotTableIcon from './icons/PivotTableIcon';

export const CHART = 'CHART';
export const PIVOT_TABLE = 'PIVOT_TABLE';

export const visTypeIcons = {
    COLUMN: ColumnIcon,
    STACKED_COLUMN: StackedColumnIcon,
    BAR: BarIcon,
    STACKED_BAR: StackedBarIcon,
    LINE: LineIcon,
    AREA: AreaIcon,
    PIE: PieIcon,
    RADAR: RadarIcon,
    GAUGE: GaugeIcon,
    YEAR_OVER_YEAR_LINE: YearOverYearLineIcon,
    YEAR_OVER_YEAR_COLUMN: YearOverYearColumnIcon,
    SINGLE_VALUE: SingleValueIcon,
    [PIVOT_TABLE]: PivotTableIcon
};

export const getVisTypeLabel = type => {
    const visTypeLabels = {
        COLUMN: i18n.t("Column"),
        STACKED_COLUMN: i18n.t("Stacked column"),
        BAR: i18n.t("Bar"),
        STACKED_BAR: i18n.t("Stacked bar"),
        LINE: i18n.t("Line"),
        AREA: i18n.t("Area"),
        PIE: i18n.t("Pie"),
        RADAR: i18n.t("Radar"),
        GAUGE: i18n.t("Gauge"),
        YEAR_OVER_YEAR_LINE: i18n.t("Year over year (line)"),
        YEAR_OVER_YEAR_COLUMN: i18n.t("Year over year (column)"),
        SINGLE_VALUE: i18n.t("Single value"),
        [PIVOT_TABLE]: i18n.t("Pivot table")
    };

    return visTypeLabels[type];
}
