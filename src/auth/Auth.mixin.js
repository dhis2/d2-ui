import React from 'react';

const Auth = {
    contextTypes: {
        d2: React.PropTypes.object.isRequired,
    },

    get currentUser() {
        return this.context.d2.currentUser;
    },
};

export default Auth;
