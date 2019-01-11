import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import Interpretation from '../Interpretation/Interpretation';
import Link from '../Link/Link';
import styles from './styles/InterpretationsList.style';

export const interpretationsToShowOnInit = 5;

export const InterpretationsList = ({         
    classes,
    model,
    interpretations,
    onSelect,
    onChange,
    isExpanded,
    toggleShowAllInterpretations,
}) =>  {
    if (!interpretations.length) {
        return (
            <div className={classes.emptyList}>{i18n.t("No interpretations")}</div>
        );
    }

    const listItems = isExpanded
        ? interpretations.slice(-interpretationsToShowOnInit) 
        : interpretations;

    return (
        <Fragment>
            {interpretations.length > interpretationsToShowOnInit && (
                <div className={classes.showAllLink}>
                    <Link 
                        label={`${isExpanded ? i18n.t('Show') : i18n.t('Hide')}${' previous interpretations'}`}
                        onClick={toggleShowAllInterpretations} 
                    />
                    {isExpanded && (
                        <span className={classes.interpretationsCountLabel}>
                            {`${i18n.t('Showing')} ${listItems.length} ${i18n.t('of')} ${interpretations.length}`}
                        </span>
                    )}
                </div>
            )}
            {listItems.map(item => 
                <Interpretation
                    model={model}
                    key={item.id}
                    interpretation={item}
                    onChange={onChange}
                    onSelect={onSelect}
                    extended={false}
                />
            )}
        </Fragment>
    );
};

InterpretationsList.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    interpretations: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    toggleShowAllInterpretations: PropTypes.func.isRequired,
};

export default withStyles(styles)(InterpretationsList);
