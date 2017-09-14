import React from 'react';
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem/MenuItem';

import Translate from '../i18n/Translate.mixin';

export default React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        locales: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            locale: React.PropTypes.string.isRequired,
        })).isRequired,
        onChange: React.PropTypes.func.isRequired,
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
