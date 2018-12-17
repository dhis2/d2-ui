import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import isEqual from 'lodash/fp/isEqual';
import pick from 'lodash/fp/pick';

import { getFavoriteWithInterpretations } from '../../api/helpers';
import DetailsCard from '../DetailsPanel/DetailsCard';
import InterpretationsCard from '../InterpretationPanel/InterpretationsCard';
import i18n from '../../locales';
import styles from './styles/InterpretationsComponent.style';

function configI18n(d2) {
    const locale = d2.currentUser.userSettings.settings.keyUiLocale;
    i18n.changeLanguage(locale);
}

export class InterpretationsComponent extends React.Component {
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

    async loadModel(props) {
        return getFavoriteWithInterpretations(props.d2, props.type, props.id).then(model => {
            this.setState({ model });
            return model;
        });
    }

    async onChange() {
        return this.loadModel(this.props).then(
            newModel => this.props.onChange && this.props.onChange(newModel)
        );
    }

    render() {
        const { classes, currentInterpretationId, onCurrentInterpretationChange } = this.props;
        const { model } = this.state;

        if (!model) return <CircularProgress />;

        return (
            <div className={classes.interpretationsContainer}>
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

InterpretationsComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    d2: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string,
    currentInterpretationId: PropTypes.string,
    onChange: PropTypes.func,
    onCurrentInterpretationChange: PropTypes.func,
};

InterpretationsComponent.childContextTypes = {
    d2: PropTypes.object,
    locale: PropTypes.string,
};

export default withStyles(styles)(InterpretationsComponent);
