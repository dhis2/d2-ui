import React from 'react';
import PropTypes from 'prop-types';

const Auth = {
    contextTypes: {
        d2: PropTypes.object.isRequired,
    },

    getCurrentUser() {
        return this.context.d2.currentUser;
    },

    getModelDefinitionByName(modelType) {
        return this.context.d2.models[modelType];
    },
};

export default Auth;
