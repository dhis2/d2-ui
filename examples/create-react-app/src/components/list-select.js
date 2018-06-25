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
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
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
                        {label: 'foo', value: 'bar'},
                        {label: 'fuz', value: 'bar'},
                        {label: 'faz', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                        {label: 'foo', value: 'bar'},
                    ]}
                    onItemDoubleClick={() => {}}
                />
            </div>
        </div>
    );
}
