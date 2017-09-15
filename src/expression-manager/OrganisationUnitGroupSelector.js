import { Observable } from 'rxjs';
import { isFunction } from 'lodash';
import ListSelectWithLocalSearch from '../list-select/ListSelectWithLocalSearch.component';
import withPropsFromObservable from '../component-helpers/withPropsFromObservable';
import { getAllObjectsWithFields } from '../data-helpers';

const organisationUnitGroupSelectorProps$ = Observable.fromPromise(getAllObjectsWithFields('organisationUnitGroup'))
    .map(organisationUnitGroups => ({
        source: organisationUnitGroups.map(model => ({ value: model.id, label: model.displayName })),
        onItemDoubleClick(value) {
            const ougFormula = ['OUG{', value, '}'].join('');

            // `this` is the react component props object
            if (isFunction(this.onSelect)) {
                this.onSelect(ougFormula);
            }
        },
    }));

export default withPropsFromObservable(organisationUnitGroupSelectorProps$, ListSelectWithLocalSearch);

