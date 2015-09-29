import React from 'react';

const Translate = {
    contextTypes: {
        d2: React.PropTypes.object.isRequired,
    },

    getTranslation(key) {
        return this.context.d2.i18n.getTranslation(key);
    },
};

export default Translate;
