import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileMenu from '@dhis2/d2-ui-file-menu';

import UpdateButton from './UpdateButton';
import VisualizationOptionsManager from '../VisualizationOptions/VisualizationOptionsManager';
import * as fromActions from '../../actions';
import { sGetCurrent } from '../../reducers/current';
import './MenuBar.css';
import history from '../../history';

const onOpen = id => history.push(`/${id}`);
const onNew = () => history.push('/');
const getOnRename = props => details =>
    props.onRenameVisualization(details, false);
const getOnSave = props => details => props.onSaveVisualization(details, false);
const getOnSaveAs = props => details =>
    props.onSaveVisualization(details, true);
const getOnDelete = props => () => props.onDeleteVisualization();

export const MenuBar = (props, context) => (
    <div className="menubar">
        <UpdateButton />
        <FileMenu
            d2={context.d2}
            fileId={props.id || null}
            fileType={props.apiObjectName}
            onOpen={onOpen}
            onNew={onNew}
            onRename={getOnRename(props)}
            onSave={getOnSave(props)}
            onSaveAs={getOnSaveAs(props)}
            onDelete={getOnDelete(props)}
            onTranslate={() => console.log('translate callback')}
            onError={() => console.log('error!')}
        />
        <VisualizationOptionsManager />
        <div>Download</div>
        <div>Embed</div>
        <div className="spacefiller" />
        <div>Show interpretations</div>
    </div>
);

MenuBar.contextTypes = {
    d2: PropTypes.object,
};

const mapStateToProps = state => ({
    id: sGetCurrent(state).id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRenameVisualization: details =>
        dispatch(
            fromActions.tDoRenameVisualization(ownProps.apiObjectName, details)
        ),
    onSaveVisualization: (details, copy) =>
        dispatch(
            fromActions.tDoSaveVisualization(
                ownProps.apiObjectName,
                details,
                copy
            )
        ),
    onDeleteVisualization: () => dispatch(fromActions.tDoDeleteVisualization()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);