import React from 'react';
import SelectField from 'material-ui/lib/select-field';

import Translate from '../i18n/Translate.mixin';

export default React.createClass({
    propTypes: {
        value: React.PropTypes.string.isRequired,
        locales: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        onChange: React.PropTypes.func.isRequired,
    },

    mixins: [Translate],

    render() {
        const locales = this.props.locales
            .map(locale => {
                return {
                    payload: locale.locale,
                    text: locale.name,
                };
            });

        return (
            <SelectField
                fullWidth
                {...this.props}
                value={this.state && this.state.locale}
                menuItems={[{ payload: '', text: '' }].concat(locales)}
                hintText={this.getTranslation('select_locale')}
                onChange={this._localeChange}
            />
        );
    },

    _localeChange(event) {
        this.setState({
            locale: event.target.value,
        });

        this.props.onChange(event.target.value, event);
    },
});
