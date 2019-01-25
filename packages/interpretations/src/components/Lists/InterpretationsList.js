import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import Link from '../Link/Link';
import Interpretation from '../Interpretation/Interpretation';
import { haveReadAccess } from '../../authorization/auth';
import styles from './styles/InterpretationsList.style';

export const interpretationsToShowOnInit = 5;

export const InterpretationsList = ({         
    classes,
    d2,
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
    const filteredItems = interpretations.filter(item => haveReadAccess(d2, item) && item);

    const listItems = isExpanded
        ? filteredItems
        : filteredItems.slice(-interpretationsToShowOnInit);


    return (
        <Fragment>
            {filteredItems.length > interpretationsToShowOnInit && (
                <Link 
                    label={`${isExpanded ? i18n.t('Hide') : i18n.t('Show')}${' previous interpretations'}`}
                    onClick={toggleShowAllInterpretations} 
                />
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
    d2: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    interpretations: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    toggleShowAllInterpretations: PropTypes.func.isRequired,
};

export default withStyles(styles)(InterpretationsList);
