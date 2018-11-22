import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import EnhancedToolbar from './EnhancedToolbar';
import EnhancedTable from './EnhancedTable';

import { fetchData } from './actions';

class Favorites extends Component {
    componentWillReceiveProps(nextProps) {
        // fetch data only the first time the dialog is open
        if (nextProps.open && (!nextProps.dataIsLoaded || nextProps.refreshData)) {
            this.props.fetchData();
        }
    }

    render() {
        const { open, onRequestClose, onFavoriteSelect, dialogMaxWidth } = this.props;

        const handleOnFavoriteSelect = (id) => {
            onFavoriteSelect(id);
            // XXX should this be in the favoriteSelect callback?
            onRequestClose();
        };

        return (
            <Dialog open={open} onClose={onRequestClose} disableEnforceFocus maxWidth={dialogMaxWidth}>
                <DialogContent>
                    <EnhancedToolbar />
                    <EnhancedTable onFavoriteSelect={handleOnFavoriteSelect} />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onRequestClose}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Favorites.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onFavoriteSelect: PropTypes.func.isRequired,
    dialogMaxWidth: PropTypes.string.isRequired,
    dataIsLoaded: PropTypes.bool.isRequired,
    refreshData: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    dataIsLoaded: state.data.totalRecords > 0,
});

const mapDispatchToProps = {
    fetchData,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Favorites);
