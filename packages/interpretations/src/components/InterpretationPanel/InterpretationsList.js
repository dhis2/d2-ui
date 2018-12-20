import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import OldInterpretation from '../Interpretation/OldInterpretation';
import Link from '../Link/Link';
import styles from './styles/InterpretationsList.style';

export const interpretationsToShowOnInit = 5;

export const InterpretationsList = ({         
    classes,
    model,
    interpretations,
    setCurrentInterpretation,
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
                <div className={classes.showAllInterpretationsContainer}>
                    <Link 
                        label={`${isExpanded ? i18n.t('Show') : i18n.t('Hide')}${' old interpretations'}`}
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
                <OldInterpretation
                    key={item.id}
                    model={model}
                    interpretation={item}
                    onChange={onChange}
                    extended={false}
                    onSelect={setCurrentInterpretation}
                />
            )}
        </Fragment>
    );
};

InterpretationsList.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    interpretations: PropTypes.array.isRequired,
    setCurrentInterpretation: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    toggleShowAllInterpretations: PropTypes.func.isRequired,
};

export default withStyles(styles)(InterpretationsList);
