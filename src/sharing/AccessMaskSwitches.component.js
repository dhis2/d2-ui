import {PropTypes, createClass, default as React} from 'react';
import Translate from '../i18n/Translate.mixin';
import Toggle from 'material-ui/lib/toggle';
import ClearFix from 'material-ui/lib/clearfix';
import {config} from 'd2/lib/d2';

config.i18n.strings.add('can_view');
config.i18n.strings.add('can_edit');

export default createClass({
    propTypes: {
        accessMask: PropTypes.oneOf([
            '--------',
            'r-------',
            'rw------',
        ]).isRequired,
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        style: PropTypes.object,
        disabled: PropTypes.bool,
    },

    mixins: [Translate],

    getDefaultProps() {
        return {
            name: `${Date.now()}`, // TODO: Not strictly unique, but perhaps good enough.
            accessMask: '--------',
        };
    },

    getInitialState() {
        return {
            view: this.hasView(),
            edit: this.hasEdit(),
        };
    },

    onChange() {
        const viewChar = (this.state.view || this.state.edit) ? 'r' : '-';
        const editChar = this.state.edit ? 'w' : '-';
        const accessMask = `${viewChar}${editChar}------`;

        if (this.props.onChange) {
            this.props.onChange(accessMask);
        }
    },

    render() {
        const style = Object.assign({
            marginTop: '.5rem',
            paddingTop: '.5rem',
            borderTop: '1px solid #CCC',
        }, this.props.style);

        return (
            <div style={style} classnName="sharing--access-mask-switches">
                <div>{this.props.label}</div>
                <ClearFix>
                <Toggle
                    style={{
                        width: '40%',
                        float: 'left',
                    }}
                    ref="toggleView"
                    name={`${this.props.name}View`}
                    label={this.getTranslation('can_view')}
                    checked={this.hasView()}
                    onToggle={this.setView}
                    disabled={this.props.disabled || this.hasEdit()}
                    />
                <Toggle
                    style={{
                        width: '40%',
                        float: 'right',
                    }}
                    ref="toggleEdit"
                    name={`${this.props.name}Edit`}
                    label={this.getTranslation('can_edit')}
                    checked={this.hasEdit()}
                    onToggle={this.setEdit}
                    disabled={this.props.disabled}
                />
                </ClearFix>
            </div>
        );
    },

    hasView() {
        return /^r/.test(this.props.accessMask);
    },

    setView() {
        this.setState({
            view: !this.state.view,
        }, () => this.onChange());
    },

    hasEdit() {
        return /^rw/.test(this.props.accessMask);
    },

    setEdit() {
        this.setState({
            view: true,
            edit: !this.state.edit,
        }, () => this.onChange());
    },
});
