import React from 'react';

const Auth = {
    contextTypes: {
        d2: React.PropTypes.object.isRequired,
    },

    getCurrentUser() {
        return this.context.d2.currentUser;
    },

    getModelDefinitionByName(modelType) {
        return this.context.d2.models[modelType];
    },
};

export default Auth;
