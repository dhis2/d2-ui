import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem/MenuItem';

import Translate from '../i18n/Translate.mixin';

class LocaleSelector extends Component {
    mixins = [Translate];

    render() {
        const localeMenuItems = [{ payload: '', text: '' }]
            .concat(this.props.locales)
            .map((locale, index) => (
                <MenuItem
                    key={index}
                    primaryText={locale.name}
                    value={locale.locale}
                />
            ));


        return (
            <SelectField
                fullWidth
                {...this.props}
                value={this.state && this.state.locale}
                hintText={this.getTranslation('select_locale')}
                onChange={this._localeChange}
            >
                {localeMenuItems}
            </SelectField>
        );
    }

    _localeChange(event, index, locale) {
        this.setState({
            locale,
        });

        this.props.onChange(locale, event);
    }
}

LocaleSelector.propTypes = {
    value: PropTypes.string,
    locales: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        locale: PropTypes.string.isRequired,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default LocaleSelector;
