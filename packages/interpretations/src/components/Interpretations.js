import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import PropTypes from 'prop-types';
import { LoadingMask } from '@dhis2/d2-ui-core';
import { getFavoriteWithInterpretations } from '../models/helpers';
import DetailsCard from './details/DetailsCard';
import InterpretationsCard from './interpretations/InterpretationsCard';

class Interpretations extends React.Component {
    state = { model: null };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    getChildContext() {
        return { d2: this.props.d2 };
    }

    componentDidMount() {
        this.loadModel(this.props);
        this.initLocale(this.props.d2);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.type !== nextProps.type || this.props.id !== nextProps.id) {
            this.loadModel(nextProps);
        }
    }

    getLocale(d2) {
        return d2.currentUser.userSettings.settings.keyUiLocale || "en";
    }

    initLocale(d2) {
        addLocaleData(require(`react-intl/locale-data/${this.getLocale(d2)}`));
    }

    loadModel(props) {
        return getFavoriteWithInterpretations(props.d2, props.type, props.id).then(model => {
            this.setState({model});
            return model;
        });
    }

    onChange() {
        return this.loadModel(this.props)
            .then(newModel => this.props.onChange && this.props.onChange(newModel));
    }

    render() {
        const { d2, currentInterpretationId, onCurrentInterpretationChange } = this.props;
        const { model } = this.state;
        const locale = this.getLocale(d2);

        if (!model)
          return <LoadingMask style={{position: "relative"}} size={1} />;

        return (
            <IntlProvider locale={locale}>
                <div>
                    <DetailsCard
                        model={model}
                    />

                    <InterpretationsCard
                        model={model}
                        onChange={this.onChange}
                        currentInterpretationId={currentInterpretationId}
                        onCurrentInterpretationChange={onCurrentInterpretationChange}
                    />
                </div>
            </IntlProvider>
        );
    }
}

Interpretations.propTypes = {
    d2: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    currentInterpretationId: PropTypes.string,
    onChange: PropTypes.func,
    onCurrentInterpretationChange: PropTypes.func,
};

Interpretations.childContextTypes = {
    d2: PropTypes.object,
};

export default Interpretations;