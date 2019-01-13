import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import Link from '../Link/Link';
import { interpretationsToShowOnInit } from '../Lists/InterpretationsList';
import styles from './styles/ToggleList.style';

export const ToggleList = ({ 
    classes, 
    totalItemsLength, 
    listItemsLength, 
    isExpanded, 
    toggleList 
}) => (
    totalItemsLength > interpretationsToShowOnInit && (
        <div className={classes.showAllLink}>
            <Link 
                label={`${isExpanded ? i18n.t('Show') : i18n.t('Hide')}${' previous interpretations'}`}
                onClick={toggleList} 
            />
            {!isExpanded && (
                <span className={classes.interpretationsCountLabel}>
                {`${i18n.t('Showing')} ${listItemsLength} ${i18n.t('of')} ${totalItemsLength}`}
                </span>
            )}
        </div>
    )
);

export default withStyles(styles)(ToggleList);

ToggleList.propTypes = {
    classes: PropTypes.object.isRequired,
    totalItemsLength: PropTypes.number.isRequired,
    listItemsLength: PropTypes.number.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    toggleList: PropTypes.func.isRequired,
};