import React from 'react';

const Translation = {
    contextTypes: {
        d2: React.PropTypes.object.isRequired,
    },

    getTranslation(key) {
        return this.context.d2.i18n.getTranslation(key);
    },
};

export default Translation;
