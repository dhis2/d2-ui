import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


const getAppUrl = (favoriteType, favoriteId, context) => {
    const baseUrl = context.d2.Api.getApi().baseUrl.split('/api', 1)[0];

    let appName;

    switch (favoriteType) {
        case 'chart':
            appName = 'dhis-web-visualizer';
            break;
        case 'reportTable':
            appName = 'dhis-web-pivot';
            break;
        case 'eventReport':
            appName = 'dhis-web-event-reports';
            break;
        case 'eventChart':
            appName = 'dhis-web-event-visualizer';
            break;
        case 'map':
            appName = 'dhis-web-maps';
            break;
        default:
            appName = '';
    }

    return `${baseUrl}/${appName}/index.html?id=${favoriteId}`;
};

const GetLinkDialog = (props, context) => {
    const { open, favoriteType, favoriteModel, onRequestClose } = props;

    return (
        <Dialog open={open} onClose={onRequestClose}>
            <DialogContent>
                <p>
                    Open in this app
                    <br />
                    <a href={getAppUrl(favoriteType, favoriteModel.id, context)}>
                        {getAppUrl(favoriteType, favoriteModel.id, context)}
                    </a>
                </p>

                <p>
                    Open in web API
                    <br />
                    <a href={`${favoriteModel.href}/data.html+css`}>
                        {favoriteModel.href}/data.html+css
                    </a>
                </p>
            </DialogContent>
        </Dialog>
    );
};

GetLinkDialog.contextTypes = {
    d2: PropTypes.object,
};

GetLinkDialog.defaultProps = {
    open: false,
    favoriteModel: null,
    favoriteType: null,
    onRequestClose: null,
};

GetLinkDialog.propTypes = {
    open: PropTypes.bool,
    favoriteModel: PropTypes.object,
    favoriteType: PropTypes.string,
    onRequestClose: PropTypes.func,
};

export default GetLinkDialog;
