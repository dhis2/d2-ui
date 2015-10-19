import {PropTypes, createClass, default as React} from 'react';
import Translate from '../i18n/Translate.mixin';
import Toggle from 'material-ui/lib/toggle';
import ClearFix from 'material-ui/lib/clearfix';

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

    render() {
        const style = Object.assign({
            marginTop: '.5rem',
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
                    label={this.getTranslation('view')}
                    checked={this.hasView()}
                    onToggle={this.setView}
                    disabled={this.hasEdit()}
                    />
                <Toggle
                    style={{
                        width: '40%',
                        float: 'right',
                    }}
                    ref="toggleEdit"
                    name={`${this.props.name}Edit`}
                    label={this.getTranslation('edit')}
                    checked={this.hasEdit()}
                    onToggle={this.setEdit}
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

    onChange() {
        const viewChar = (this.state.view || this.state.edit) ? 'r' : '-';
        const editChar = this.state.edit ? 'w' : '-';
        const accessMask = `${viewChar}${editChar}------`;

        if (this.props.onChange) {
            this.props.onChange(accessMask);
        }
    },
});
