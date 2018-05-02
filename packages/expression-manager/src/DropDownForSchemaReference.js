import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from '@dhis2/d2-ui-core';
import { DropDown } from '@dhis2/d2-ui-core';

class DropDownForSchemaReference extends Component {
    state = {
        isLoading: true,
        options: [],
    };

    componentDidMount() {
        const schema = this.getSchema(); // getSchema returns a d2.schema (modelDefinition object)

        schema.list({ paging: false, fields: 'displayName,id' })
            .then(collection => collection.toArray())
            .then(options => this.setState({ options, isLoading: false }))
            .catch(() => this.setState({ isLoading: false }));
    }

    /**
     * Gets a d2 modelDefinition for the `schema` prop.
     *
     * @returns {ModelDefinition}
     * @throws When the `schema` is not a valid schema on the `d2.models` object.
     */
    getSchema() {
        const d2 = this.context.d2;
        const isSchemaAvailable = () => this.props.schema && d2.models[this.props.schema];

        if (isSchemaAvailable()) {
            return d2.models[this.props.schema];
        }

        throw new Error(`${this.props.schema} is not a valid schema name on the d2.models object. Perhaps you forgot to load the schema or the schema does not exist.`);
    }

    render() {
        const { schema, ...selectProps } = this.props;
        return this.isLoading
            ? <CircularProgress />
            : <DropDown
                menuItems={this.state.options}
                {...selectProps}
            />;
    }
}

DropDownForSchemaReference.propTypes = {
    schema: PropTypes.string.isRequired,
};

DropDownForSchemaReference.contextTypes = {
    d2: PropTypes.object,
};

export default DropDownForSchemaReference;
