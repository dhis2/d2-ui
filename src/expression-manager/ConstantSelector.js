import ListSelectWithLocalSearch from '../list-select/ListSelectWithLocalSearch.component';
import withPropsFromObservable from '../component-helpers/withPropsFromObservable';
import { getAllObjectsWithFields } from '../data-helpers';
import { Observable } from 'rx';
import { isFunction } from 'lodash';

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
