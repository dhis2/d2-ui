import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogContent } from 'material-ui/Dialog';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';

import Link from 'material-ui-icons/Link';

class GetLinkMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    toggleGetLinkDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    getAppUrl = (favoriteType, favoriteId) => {
        const baseUrl = this.context.d2.Api.getApi().baseUrl.split('/api', 1)[0];

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

    render() {
        const { enabled, favoriteType, favoriteModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleGetLinkDialog}>
                    <ListItemIcon>
                        <Link />
                    </ListItemIcon>
                    <ListItemText primary="Get link" />
                </MenuItem>
                {favoriteModel ? (
                    <Dialog open={this.state.dialogIsOpen} onClose={this.toggleGetLinkDialog}>
                        <DialogContent>
                            <p>
                                Open in this app
                                <br />
                                <a href={this.getAppUrl(favoriteType, favoriteModel.id)}>
                                    {this.getAppUrl(favoriteType, favoriteModel.id)}
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
                ) : null}
            </Fragment>
        );
    }
}

GetLinkMenuItem.contextTypes = {
    d2: PropTypes.object,
};

GetLinkMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    favoriteType: PropTypes.string,
};

export default GetLinkMenuItem;
