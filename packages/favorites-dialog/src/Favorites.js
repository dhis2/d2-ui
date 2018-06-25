import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import EnhancedToolbar from './EnhancedToolbar';
import EnhancedTable from './EnhancedTable';

import { fetchData } from './actions';

class Favorites extends Component {
    componentWillReceiveProps(nextProps) {
        // fetch data only the first time the dialog is open
        if (nextProps.open && !nextProps.dataIsLoaded) {
            this.props.fetchData();
        }
    }

    render() {
        const { open, onRequestClose, onFavoriteSelect } = this.props;

        const handleOnFavoriteSelect = model => {
            onFavoriteSelect(model);
            // XXX should this be in the favoriteSelect callback?
            onRequestClose();
        };

        return (
            <Dialog open={open} onClose={onRequestClose} disableEnforceFocus={true} maxWidth="md">
                <DialogContent>
                    <EnhancedToolbar />
                    <EnhancedTable onFavoriteSelect={handleOnFavoriteSelect} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onRequestClose}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    dataIsLoaded: state.data.totalRecords > 0,
});

const mapDispatchToProps = {
    fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
