import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import i18n from '@dhis2/d2-i18n';

const getAppUrl = (fileType, fileId, context) => {
    const baseUrl = context.d2.Api.getApi().baseUrl.split('/api', 1)[0];

    let appName;

    switch (fileType) {
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

    // DHIS2-4253: force URL to be absolute
    const url = new URL(`${baseUrl}/${appName}/index.html?id=${fileId}`, window.location.origin);

    return url.href;
};

const GetLinkDialog = (props, context) => {
    const { open, fileType, fileModel, onRequestClose } = props;

    return (
        <Dialog open={open} onClose={onRequestClose}>
            <DialogContent>
                <DialogContentText>
                    {i18n.t('Open in this app')}
                    <br />
                    <a href={getAppUrl(fileType, fileModel.id, context)}>
                        {getAppUrl(fileType, fileModel.id, context)}
                    </a>
                </DialogContentText>
                {fileType !== 'map' && (
                    <DialogContentText>
                        {i18n.t('Open in web API')}
                        <br />
                        <a href={`${fileModel.href}/data.html+css`}>
                            {fileModel.href}/data.html+css
                        </a>
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onRequestClose} color="primary">
                    {i18n.t('Close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

GetLinkDialog.contextTypes = {
    d2: PropTypes.object,
};

GetLinkDialog.defaultProps = {
    open: false,
    fileModel: null,
    fileType: null,
    onRequestClose: null,
};

GetLinkDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
};

export default GetLinkDialog;
