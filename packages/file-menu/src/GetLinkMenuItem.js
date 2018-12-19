import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/icons/Link';

import i18n from '@dhis2/d2-i18n';
import { isEqual } from 'lodash-es';

import GetLinkDialog from './GetLinkDialog';

class GetLinkMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        //check state first, then props. If state has changed we don't need to deepcompare props too as it 
        //would be a performance hit doing both if we already know that state was changed.

        let shouldUpdate = !isEqual(nextState, this.state);
        if ( !shouldUpdate ) {
            //if state wasnt changed, check if props changed
            shouldUpdate = !isEqual(nextProps, this.props);
        } 
        
        return shouldUpdate;
    }

    onClose = () => {
        this.toggleGetLinkDialog();

        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    toggleGetLinkDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, fileType, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleGetLinkDialog}>
                    <ListItemIcon>
                        <Link />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Get link')} />
                </MenuItem>
                {fileModel ? (
                    <GetLinkDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.onClose}
                        fileType={fileType}
                        fileModel={fileModel}
                    />
                ) : null}
            </Fragment>
        );
    }
}

GetLinkMenuItem.contextTypes = {
    d2: PropTypes.object,
};

GetLinkMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onClose: null,
};

GetLinkMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onClose: PropTypes.func,
};

export default GetLinkMenuItem;
