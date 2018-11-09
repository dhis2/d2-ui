import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import isEqual from 'lodash/fp/isEqual';
import pick from 'lodash/fp/pick';

import { getFavoriteWithInterpretations } from '../models/helpers';
import DetailsCard from './details/DetailsCard';
import InterpretationsCard from './interpretations/InterpretationsCard';
import i18n from '../locales';

function configI18n(d2) {
    const locale = d2.currentUser.userSettings.settings.keyUiLocale;
    i18n.changeLanguage(locale);
}

class Interpretations extends React.Component {
    state = { model: null };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    getChildContext() {
        return {
            d2: this.props.d2,
            locale: this.props.d2.currentUser.userSettings.settings.keyUiLocale || 'en',
        };
    }

    componentDidMount() {
        configI18n(this.props.d2);
        this.loadModel(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const fields = ['type', 'id', 'lastUpdated'];
        const modelFieldsChanged = !isEqual(pick(fields, this.props), pick(fields, nextProps));
        if (modelFieldsChanged) {
            this.loadModel(nextProps);
        }
    }

    loadModel(props) {
        return getFavoriteWithInterpretations(props.d2, props.type, props.id).then(model => {
            this.setState({ model });
            return model;
        });
    }

    onChange() {
        return this.loadModel(this.props).then(
            newModel => this.props.onChange && this.props.onChange(newModel)
        );
    }

    render() {
        const { d2, currentInterpretationId, onCurrentInterpretationChange } = this.props;
        const { model } = this.state;

        if (!model) return <CircularProgress />;

        return (
            <div>
                <DetailsCard model={model} onChange={this.onChange} />

                <InterpretationsCard
                    model={model}
                    onChange={this.onChange}
                    currentInterpretationId={currentInterpretationId}
                    onCurrentInterpretationChange={onCurrentInterpretationChange}
                />
            </div>
        );
    }
}

Interpretations.propTypes = {
    d2: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string,
    currentInterpretationId: PropTypes.string,
    onChange: PropTypes.func,
    onCurrentInterpretationChange: PropTypes.func,
};

Interpretations.childContextTypes = {
    d2: PropTypes.object,
    locale: PropTypes.object,
};

export default Interpretations;
