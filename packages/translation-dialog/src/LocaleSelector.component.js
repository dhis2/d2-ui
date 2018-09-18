import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from './AutoComplete.component';

class LocaleSelector extends Component {
    constructor(props, context) {
        super(props, context);

        const i18n = this.context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    onLocaleChange = (locale) => {
        this.props.onChange(locale.value);
    }

    render() {
        return (
            <AutoComplete
                suggestions={this.props.locales}
                onItemSelected={this.onLocaleChange}
                value={this.props.currentLocale}
            />
        )
    }
}

LocaleSelector.propTypes = {
    locales: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            locale: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    currentLocale: PropTypes.string,
};

LocaleSelector.contextTypes = {
    d2: PropTypes.object,
};

export default LocaleSelector;
