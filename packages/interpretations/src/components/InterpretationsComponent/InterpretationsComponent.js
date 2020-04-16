import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import isEqual from 'lodash/fp/isEqual';
import pick from 'lodash/fp/pick';

import { getFavoriteWithInterpretations } from '../../api/helpers';
import Details from '../DetailsPanel/Details';
import InterpretationsCard from '../Cards/InterpretationsCard';
import styles from './styles/InterpretationsComponent.style';

export class InterpretationsComponent extends React.Component {
    state = { model: null, userGroups: []};

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };

    getChildContext() {
        return {
            d2: this.props.d2,
            locale: this.props.d2.currentUser.userSettings.settings.keyUiLocale || 'en',
            appName: this.props.appName || '',
            item: this.props.item || {},
        };
    };

    componentDidMount() {
        this.loadModel(this.props);
    };

    componentWillReceiveProps(nextProps) {
        const fields = ['type', 'id', 'lastUpdated'];
        const modelFieldsChanged = !isEqual(pick(fields, this.props), pick(fields, nextProps));
        
        if (modelFieldsChanged) {
            this.loadModel(nextProps);
        }
    };

    async loadModel(props) {
        const users = await props.d2.currentUser.getUserGroups();
        
        return getFavoriteWithInterpretations(props.d2, props.type, props.id).then(model => {
            this.setState({ model, userGroups: Array.from(users.keys()) });
            return model;
        });
    };

    async onChange() {
        return this.loadModel(this.props).then(
            newModel => this.props.onChange && this.props.onChange(newModel)
        );
    };

    render() {
        const { classes, currentInterpretationId, onCurrentInterpretationChange } = this.props;
        const { model, userGroups } = this.state;

        if (!model) {
            return <CircularProgress />;
        }

        return (
            <div>
                <div className={classes.interpretationsContainer}>
                    <Details 
                        model={model} 
                        onChange={this.onChange} 
                        type={this.props.type} 
                    />
                    <InterpretationsCard
                        model={model}
                        userGroups={userGroups}
                        onChange={this.onChange}
                        currentInterpretationId={currentInterpretationId}
                        onCurrentInterpretationChange={onCurrentInterpretationChange}
                        type={this.props.type}
                    />
                </div>
            </div>
        );
    };
};

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
    appName: PropTypes.string,
    item: PropTypes.object,
};

export default withStyles(styles)(InterpretationsComponent);
