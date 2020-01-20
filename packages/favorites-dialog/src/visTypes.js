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

const visTypeMap = {
    BAR: { label: i18n.t('Bar'), icon: BarIcon },
    STACKED_BAR: { label: i18n.t('Stacked bar'), icon: StackedBarIcon },
    COLUMN: { label: i18n.t('Column'), icon: ColumnIcon },
    STACKED_COLUMN: { label: i18n.t('Stacked column'), icon: StackedColumnIcon },
    LINE: { label: i18n.t('Line'), icon: LineIcon },
    AREA: { label: i18n.t('Area'), icon: AreaIcon },
    PIE: { label: i18n.t('Pie'), icon: PieIcon },
    RADAR: { label: i18n.t('Radar'), icon: RadarIcon },
    GAUGE: { label: i18n.t('Gauge'), icon: GaugeIcon },
    YEAR_OVER_YEAR_LINE: { label: i18n.t('Year over year (line)'), icon: YearOverYearLineIcon },
    YEAR_OVER_YEAR_COLUMN: { label: i18n.t('Year over year (column)'), icon: YearOverYearColumnIcon },
    SINGLE_VALUE: { label: i18n.t('Single value'), icon: SingleValueIcon },
    PIVOT_TABLE: { label: i18n.t('Pivot table'), icon: PivotTableIcon },
};

export default visTypeMap;
