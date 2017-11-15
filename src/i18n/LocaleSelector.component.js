import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem/MenuItem';

import Translate from '../i18n/Translate.mixin';

export default React.createClass({
    propTypes: {
        value: PropTypes.string,
        locales: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            locale: PropTypes.string.isRequired,
        })).isRequired,
        onChange: PropTypes.func.isRequired,
    },

    mixins: [Translate],

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
    },

    _localeChange(event, index, locale) {
        this.setState({
            locale,
        });

        this.props.onChange(locale, event);
    },
});
