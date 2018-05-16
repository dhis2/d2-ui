import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Menu from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

import i18n from '@dhis2/d2-i18n';

import { getFileTypeLabel } from './util';
import NewMenuItem from './NewMenuItem';
import OpenMenuItem from './OpenMenuItem';
import SaveMenuItem from './SaveMenuItem';
import SaveAsMenuItem from './SaveAsMenuItem';
import RenameMenuItem from './RenameMenuItem';
import TranslateMenuItem from './TranslateMenuItem';
import ShareMenuItem from './ShareMenuItem';
import WriteInterpretationMenuItem from './WriteInterpretationMenuItem';
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

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.fileId) {
            this.setFileModel(nextProps.fileId);
        }
    };

    setFileModel = async (id) => {
        const model = await this.props.d2.models[this.props.fileType].get(id);

        this.setState({ fileModel: model });
    };

    toggleMenu = (event) => {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
            anchorEl: this.state.menuIsOpen ? null : event.currentTarget,
        });
    };

    closeMenu = (event) => {
        this.toggleMenu(event);
    };

    selectFile = (id) => {
        this.setFileModel(id);

        if (this.props.onOpen) {
            this.props.onOpen(id);
        }
    };

    render() {
        const {
            fileType,
            onNew,
            onSave,
            onSaveAs,
            onRename,
            onTranslate,
            onShare,
            onWriteInterpretation,
            onDelete,
            onError,
        } = this.props;

        return (
            <div>
                <Button onClick={this.toggleMenu}>{i18n.t(getFileTypeLabel(fileType))}</Button>
                <Menu
                    disableEnforceFocus
                    open={this.state.menuIsOpen}
                    onClose={this.closeMenu}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    getContentAnchorEl={null}
                >
                    <NewMenuItem enabled={Boolean(this.state.fileModel)} onNew={onNew} />
                    <Divider light />

                    <OpenMenuItem
                        enabled
                        fileType={fileType}
                        onOpen={this.selectFile}
                    />

                    <Divider />
                    <SaveMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.update,
                        )}
                        onSave={onSave}
                    />
                    <SaveAsMenuItem
                        enabled={Boolean(this.state.fileModel)}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onSaveAs={onSaveAs}
                    />
                    <Divider />
                    <RenameMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.update,
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onRename={onRename}
                        onRenameError={onError}
                    />
                    <TranslateMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.update,
                        )}
                        fileModel={this.state.fileModel}
                        onTranslate={onTranslate}
                        onTranslateError={onError}
                    />
                    <Divider />
                    <ShareMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.manage,
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onShare={onShare}
                    />
                    <WriteInterpretationMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.read,
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onWriteInterpretation={onWriteInterpretation}
                    />
                    <GetLinkMenuItem
                        enabled={Boolean(this.state.fileModel)}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                    />
                    <Divider />
                    <DeleteMenuItem
                        enabled={Boolean(
                            this.state.fileModel && this.state.fileModel.access.delete,
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onDelete={onDelete}
                        onDeleteError={onError}
                    />
                </Menu>
            </div>
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
    onWriteInterpretation: null,
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
    onWriteInterpretation: PropTypes.func,
    onDelete: PropTypes.func,
    onError: PropTypes.func,
};

const styles = theme => ({
    menuItem: {
        '&:focus': {
            background: theme.palette.primary[500],
            '& $text, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
});

export default withStyles(styles)(FileMenu);
