import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class LocaleSelector extends Component {
    constructor(props, context) {
        super(props, context);

        const i18n = this.context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    onLocaleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    render() {
        const localeMenuItems = [{ dummy: '', item: '' }]
            .concat(this.props.locales)
            .map((locale, i) => {
                const k = `${locale.name}-${i}`;
                return <MenuItem key={k} value={locale.locale}>{locale.name}</MenuItem>;
            });

        return (
            <FormControl fullWidth style={{ marginBottom: '10px' }}>
                <InputLabel htmlFor="locale-selector">{this.getTranslation('select_locale')}</InputLabel>
                <Select
                    value={this.props.currentLocale}
                    onChange={this.onLocaleChange}
                    inputProps={{
                        name: 'locale',
                        id: 'locale-selector',
                    }}
                >
                    {localeMenuItems}
                </Select>
            </FormControl>
        );
    }
}

LocaleSelector.propTypes = {
    value: PropTypes.string,
    locales: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            locale: PropTypes.string.isRequired,
        })
    ).isRequired,
    currentLocale: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

LocaleSelector.contextTypes = {
    d2: PropTypes.object,
};

export default LocaleSelector;
