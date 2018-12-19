import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';

import i18n from '@dhis2/d2-i18n';
import FavoritesDialog from '@dhis2/d2-ui-favorites-dialog';
import isEqual from 'lodash/fp/isEqual';

class OpenMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        //check state first, then props. If state has changed we don't need to deepcompare props too as it 
        //would be a performance hit doing both if we already know that state was changed.

        let shouldUpdate = this.state.dialogIsOpen !== nextState.dialogIsOpen;
        if ( !shouldUpdate ) {
            //if state wasnt changed, check if props changed
            shouldUpdate = !isEqual(nextProps, this.props);
        } 
        
        return shouldUpdate;
    }

    onClose = () => {
        this.toggleFavoritesDialog();

        this.props.onClose();
    };

    onOpen = (id) => {
        this.toggleFavoritesDialog();

        this.props.onOpen(id);
    };

    toggleFavoritesDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { refreshDialogData, fileType, onRename, onDelete } = this.props;

        return (
            <Fragment>
                <MenuItem button onClick={this.toggleFavoritesDialog}>
                    <ListItemIcon>
                        <OpenInBrowser />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Open')} />
                </MenuItem>
                <FavoritesDialog
                    open={this.state.dialogIsOpen}
                    refreshData={refreshDialogData}
                    type={fileType}
                    d2={this.context.d2}
                    onRequestClose={this.onClose}
                    onFavoriteSelect={this.onOpen}
                    onFavoriteRename={onRename}
                    onFavoriteDelete={onDelete}
                />
            </Fragment>
        );
    }
}

OpenMenuItem.contextTypes = {
    d2: PropTypes.object,
};

OpenMenuItem.defaultProps = {
    fileType: null,
    refreshDialogData: false,
    onOpen: Function.prototype,
    onClose: Function.prototype,
    onRename: Function.prototype,
    onDelete: Function.prototype,
};

OpenMenuItem.propTypes = {
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    refreshDialogData: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onRename: PropTypes.func,
    onDelete: PropTypes.func,
};

export default OpenMenuItem;
