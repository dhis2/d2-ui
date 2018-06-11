import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Menu from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

import i18n from '@dhis2/d2-i18n';

import NewMenuItem from './NewMenuItem';
import OpenMenuItem from './OpenMenuItem';
import SaveMenuItem from './SaveMenuItem';
import SaveAsMenuItem from './SaveAsMenuItem';
import RenameMenuItem from './RenameMenuItem';
import TranslateMenuItem from './TranslateMenuItem';
import ShareMenuItem from './ShareMenuItem';
import GetLinkMenuItem from './GetLinkMenuItem';
import DeleteMenuItem from './DeleteMenuItem';

export class FileMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuIsOpen: false,
            anchorEl: null,
            fileModel: null,
        };
    }

    getChildContext = () => ({
        d2: this.props.d2,
    });

    componentWillReceiveProps = nextProps => {
        if (nextProps.fileId) {
            this.setFileModel(nextProps.fileId);
        }
    };

    setFileModel = async id => {
        const model = await this.props.d2.models[this.props.fileType].get(id);

        this.setState({ fileModel: model });
    };

    clearFileModel = () => {
        this.setState({ fileModel: null });
    };

    toggleMenu = event => {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
            anchorEl: this.state.menuIsOpen ? null : event.currentTarget,
        });
    };

    closeMenu = () => {
        this.setState({
            menuIsOpen: false,
            anchorEl: null,
        });
    };

    onOpen = id => {
        this.setFileModel(id);

        this.closeMenu();

        if (this.props.onOpen) {
            this.props.onOpen(id);
        }
    };

    onNew = () => {
        this.clearFileModel();

        this.closeMenu();

        if (this.props.onNew) {
            this.props.onNew();
        }
    };

    onDelete = () => {
        this.clearFileModel();

        this.closeMenu();

        if (this.props.onDelete) {
            this.props.onDelete();
        }
    };

    onAction = callback => args => {
        this.closeMenu();

        if (callback) {
            callback(args);
        }
    };

    render() {
        const {
            classes,
            fileType,
            onSave,
            onSaveAs,
            onRename,
            onTranslate,
            onShare,
            onError,
        } = this.props;

        return (
            <Fragment>
                <Button className={classes.menuButton} onClick={this.toggleMenu}>
                    {i18n.t('File')}
                </Button>
                <Menu
                    disableEnforceFocus
                    open={this.state.menuIsOpen}
                    onClose={this.closeMenu}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    getContentAnchorEl={null}
                >
                    <NewMenuItem enabled={Boolean(this.state.fileModel)} onNew={this.onNew} />
                    <Divider light />

                    <OpenMenuItem
                        enabled
                        fileType={fileType}
                        onOpen={this.onOpen}
                        onClose={this.onAction()}
                    />

                    <Divider />
                    <SaveMenuItem
                        enabled={Boolean(
                            !this.state.fileModel ||
                                (this.state.fileModel && this.state.fileModel.access.update)
                        )}
                        onSave={this.onAction(onSave)}
                        onClose={this.onAction()}
                    />
                    <SaveAsMenuItem
                        enabled={Boolean(this.state.fileModel)}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onSaveAs={this.onAction(onSaveAs)}
                        onClose={this.onAction()}
                    />
                    <Divider />
                    <RenameMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.update
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onRename={this.onAction(onRename)}
                        onRenameError={this.onAction(onError)}
                        onClose={this.onAction()}
                    />
                    <TranslateMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.update
                        )}
                        fileModel={this.state.fileModel}
                        onTranslate={this.onAction(onTranslate)}
                        onTranslateError={this.onAction(onError)}
                        onClose={this.onAction()}
                    />
                    <Divider />
                    <ShareMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.manage
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onShare={this.onAction(onShare)}
                        onClose={this.onAction()}
                    />
                    <GetLinkMenuItem
                        enabled={Boolean(this.state.fileModel)}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onClose={this.onAction()}
                    />
                    <Divider />
                    <DeleteMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.delete
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onDelete={this.onDelete}
                        onDeleteError={this.onAction(onError)}
                        onClose={this.onAction()}
                    />
                </Menu>
            </Fragment>
        );
    }
}

FileMenu.childContextTypes = {
    d2: PropTypes.object,
};

FileMenu.defaultProps = {
    d2: null,
    fileType: 'chart',
    fileId: null,
    onNew: null,
    onOpen: null,
    onSave: null,
    onSaveAs: null,
    onRename: null,
    onTranslate: null,
    onShare: null,
    onDelete: null,
    onError: null,
};

FileMenu.propTypes = {
    d2: PropTypes.object,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileId: PropTypes.object,
    onNew: PropTypes.func,
    onOpen: PropTypes.func,
    onSave: PropTypes.func,
    onSaveAs: PropTypes.func,
    onRename: PropTypes.func,
    onTranslate: PropTypes.func,
    onShare: PropTypes.func,
    onDelete: PropTypes.func,
    onError: PropTypes.func,
};

const styles = theme => ({
    menuButton: {
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 400,
    },
});

export default withStyles(styles)(FileMenu);
