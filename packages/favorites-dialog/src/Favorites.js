import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import EnhancedToolbar from './EnhancedToolbar';
import EnhancedTable from './EnhancedTable';

import { fetchData } from './actions';

class Favorites extends Component {
    componentDidMount() {
        // fetch data only the first time the dialog is open
        if (
            this.props.open &&
            (!this.props.dataIsLoaded || this.props.refreshData)
        ) {
            this.props.fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.open !== prevProps.open &&
            this.props.open &&
            (!this.props.dataIsLoaded ||
                this.props.refreshData ||
                this.props.type !== prevProps.type)
        ) {
            this.props.fetchData();
        }
    }

    render() {
        const { open, onRequestClose, onFavoriteSelect, type } = this.props;

        const handleOnFavoriteSelect = (id) => {
            onFavoriteSelect(id);
            // XXX should this be in the favoriteSelect callback?
            onRequestClose();
        };

        const showTypeColumn = /visualization|chart/.test(type);

        return (
            <Dialog
                open={open}
                onClose={onRequestClose}
                disableEnforceFocus
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <EnhancedToolbar showTypeFilter={showTypeColumn} />
                    <EnhancedTable
                        showTypeColumn={showTypeColumn}
                        onFavoriteSelect={handleOnFavoriteSelect}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onRequestClose}>
                        {i18n.t('Close')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Favorites.propTypes = {
    open: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onFavoriteSelect: PropTypes.func.isRequired,
    dataIsLoaded: PropTypes.bool.isRequired,
    refreshData: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    dataIsLoaded: state.data.totalRecords > 0,
});

const mapDispatchToProps = {
    fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
