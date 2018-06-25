import { Observable } from 'rxjs';
import { isFunction } from 'lodash';

import { ListSelectWithLocalSearch } from '@dhis2/d2-ui-core';
import { withPropsFromObservable } from '@dhis2/d2-ui-core';
import { getAllObjectsWithFields } from './data-helpers';

const constantSelectorProps$ = Observable.fromPromise(getAllObjectsWithFields('constant'))
    .map(constants => ({
        source: constants.map(model => ({ value: model.id, label: model.displayName })),
        onItemDoubleClick(value) {
            const constFormula = ['C{', value, '}'].join('');

            // `this` is the react component props object
            if (isFunction(this.onSelect)) {
                this.onSelect(constFormula);
            }
        },
    }));

export default withPropsFromObservable(constantSelectorProps$, ListSelectWithLocalSearch);
