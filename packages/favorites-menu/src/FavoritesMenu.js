import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

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

export class FavoritesMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuIsOpen: false,
            anchorEl: null,
            favoriteModel: null,
        };
    }

    getChildContext = () => ({
        d2: this.props.d2,
    });

    componentWillReceiveProps = nextProps => {
        if (nextProps.favoriteId) {
            this.setFavoriteModel(nextProps.favoriteId);
        }
    };

    setFavoriteModel = async id => {
        const model = await this.props.d2.models[this.props.favoriteType].get(id);

        this.setState({ favoriteModel: model });
    };

    toggleMenu = event => {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
            anchorEl: this.state.menuIsOpen ? null : event.currentTarget,
        });
    };

    closeMenu = event => {
        this.toggleMenu(event);
    };

    selectFavorite = id => {
        this.setFavoriteModel(id);

        if (this.props.onOpen) {
            this.props.onOpen(id);
        }
    };

    render() {
        const {
            favoriteType,
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
                <Button onClick={this.toggleMenu}>Favorites</Button>
                <Menu
                    disableEnforceFocus
                    open={this.state.menuIsOpen}
                    onClose={this.closeMenu}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    getContentAnchorEl={null}
                >
                    <NewMenuItem enabled={Boolean(this.state.favoriteModel)} onNew={onNew} />
                    <Divider light />

                    <OpenMenuItem
                        enabled
                        favoriteType={favoriteType}
                        onOpen={this.selectFavorite}
                    />

                    <Divider />
                    <SaveMenuItem
                        enabled={Boolean(
                            this.state.favoriteModel && this.state.favoriteModel.access.update
                        )}
                        onSave={onSave}
                    />
                    <SaveAsMenuItem
                        enabled={Boolean(this.state.favoriteModel)}
                        favoriteModel={this.state.favoriteModel}
                        onSaveAs={onSaveAs}
                    />
                    <Divider />
                    <RenameMenuItem
                        enabled={Boolean(
                            this.state.favoriteModel && this.state.favoriteModel.access.update
                        )}
                        favoriteType={favoriteType}
                        favoriteModel={this.state.favoriteModel}
                        onRename={onRename}
                        onRenameError={onError}
                    />
                    <TranslateMenuItem
                        enabled={Boolean(
                            this.state.favoriteModel && this.state.favoriteModel.access.update
                        )}
                        favoriteModel={this.state.favoriteModel}
                        onTranslate={onTranslate}
                        onTranslateError={onError}
                    />
                    <Divider />
                    <ShareMenuItem
                        enabled={Boolean(
                            this.state.favoriteModel && this.state.favoriteModel.access.manage
                        )}
                        favoriteType={favoriteType}
                        favoriteModel={this.state.favoriteModel}
                        onShare={onShare}
                    />
                    <WriteInterpretationMenuItem
                        enabled={Boolean(
                            this.state.favoriteModel && this.state.favoriteModel.access.read
                        )}
                        favoriteType={favoriteType}
                        favoriteModel={this.state.favoriteModel}
                        onWriteInterpretation={onWriteInterpretation}
                    />
                    <GetLinkMenuItem
                        enabled={Boolean(this.state.favoriteModel)}
                        favoriteType={favoriteType}
                        favoriteModel={this.state.favoriteModel}
                    />
                    <Divider />
                    <DeleteMenuItem
                        enabled={Boolean(
                            this.state.favoriteModel && this.state.favoriteModel.access.delete
                        )}
                        favoriteType={favoriteType}
                        favoriteModel={this.state.favoriteModel}
                        onDelete={onDelete}
                        onDeleteError={onError}
                    />
                </Menu>
            </div>
        );
    }
}

FavoritesMenu.childContextTypes = {
    d2: PropTypes.object,
};

FavoritesMenu.defaultProps = {
    d2: null,
    favoriteType: 'chart',
    favoriteId: null,
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

FavoritesMenu.propTypes = {
    d2: PropTypes.object,
    favoriteType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    favoriteId: PropTypes.object,
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

export default withStyles(styles)(FavoritesMenu);
