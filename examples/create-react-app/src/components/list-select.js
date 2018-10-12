import React from 'react';

import {
    ListSelect,
    ListSelectAsync,
    ListSelectWithLocalSearch,
} from '@dhis2/d2-ui-core';

const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
};

export default function Buttons() {
    return (
        <div style={style}>
            <div>
                <h3>List Select</h3>
                <ListSelect
                    source={[
                        {label: 'foo', value: 'bar0'},
                        {label: 'foo', value: 'bar1'},
                        {label: 'foo', value: 'bar2'},
                        {label: 'foo', value: 'bar3'},
                        {label: 'foo', value: 'bar4'},
                        {label: 'foo', value: 'bar5'},
                        {label: 'foo', value: 'bar6'},
                        {label: 'foo', value: 'bar7'},
                    ]}
                    onItemDoubleClick={() => {}}
                />
            </div>

            <div>
                <h3>List Select Async</h3>
                <ListSelectAsync
                    onItemDoubleClick={() => {}}
                />
            </div>

            <div>
                <h3>List Select With Local Search</h3>
                <ListSelectWithLocalSearch
                    source={[
                        {label: 'foo', value: 'bar0'},
                        {label: 'fuz', value: 'bar1'},
                        {label: 'faz', value: 'bar2'},
                        {label: 'foo', value: 'bar3'},
                        {label: 'foo', value: 'bar4'},
                        {label: 'foo', value: 'bar5'},
                        {label: 'foo', value: 'bar6'},
                        {label: 'foo', value: 'bar7'},
                    ]}
                    onItemDoubleClick={() => {}}
                />
            </div>
        </div>
    );
}
