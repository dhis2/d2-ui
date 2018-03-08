import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SvgIcon from '../../src/svg-icon/SvgIcon';
import SvgIconTemp from '../../src/svg-icon/SvgIconTemp';

const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
};

const cardStyle = {
    backgroundColor: '#fff',
    padding: 16,
    display: 'inline-block',
    borderRadius: 2,
    margin: 16,
    width: 200,
};

const children = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;

const icons = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <h2> Material-UI v0 </h2>
            <div style={style}>
                <div style={cardStyle}>
                    <h3>Icon with no icon or children prop defined</h3>
                    <SvgIcon />
                </div>
                <div style={cardStyle}>
                    <h3>Icon with custom defined path</h3>
                    <SvgIcon>{children}</SvgIcon>
                </div>
                <div style={cardStyle}>
                    <h3>Icon with custom dimensions</h3>
                    <SvgIcon icon="Launch" style={{ width: '20px', height: '20px' }} />
                    <SvgIcon icon="Launch" style={{ width: '32px', height: '32px' }} />
                </div>
                <div style={cardStyle}>
                    <h3>Icon not found</h3>
                    <SvgIcon icon={'DoesntExist'} />
                </div>
                <div style={cardStyle}>
                    <h3>Add</h3>
                    <SvgIcon icon={'Add'} />
                </div>
                <div style={cardStyle}>
                    <h3>ArrowDownward</h3>
                    <SvgIcon icon={'ArrowDownward'} />
                </div>
                <div style={cardStyle}>
                    <h3>ArrowDropRight</h3>
                    <SvgIcon icon={'ArrowDropRight'} />
                </div>
                <div style={cardStyle}>
                    <h3>ArrowUpward</h3>
                    <SvgIcon icon={'ArrowUpward'} />
                </div>
                <div style={cardStyle}>
                    <h3>Business</h3>
                    <SvgIcon icon={'Business'} />
                </div>
                <div style={cardStyle}>
                    <h3>Cancel</h3>
                    <SvgIcon icon={'Cancel'} />
                </div>
                <div style={cardStyle}>
                    <h3>ChevronLeft</h3>
                    <SvgIcon icon={'ChevronLeft'} />
                </div>
                <div style={cardStyle}>
                    <h3>ChevronRight</h3>
                    <SvgIcon icon={'ChevronRight'} />
                </div>
                <div style={cardStyle}>
                    <h3>Close</h3>
                    <SvgIcon icon={'Close'} />
                </div>
                <div style={cardStyle}>
                    <h3>Create</h3>
                    <SvgIcon icon={'Create'} />
                </div>
                <div style={cardStyle}>
                    <h3>CropFree</h3>
                    <SvgIcon icon={'CropFree'} />
                </div>
                <div style={cardStyle}>
                    <h3>Delete</h3>
                    <SvgIcon icon={'Delete'} />
                </div>
                <div style={cardStyle}>
                    <h3>Description</h3>
                    <SvgIcon icon={'Description'} />
                </div>
                <div style={cardStyle}>
                    <h3>Done</h3>
                    <SvgIcon icon={'Done'} />
                </div>
                <div style={cardStyle}>
                    <h3>DragHandle</h3>
                    <SvgIcon icon={'DragHandle'} />
                </div>
                <div style={cardStyle}>
                    <h3>Email</h3>
                    <SvgIcon icon={'Email'} />
                </div>
                <div style={cardStyle}>
                    <h3>Extension</h3>
                    <SvgIcon icon={'Extension'} />
                </div>
                <div style={cardStyle}>
                    <h3>FontDownload</h3>
                    <SvgIcon icon={'FontDownload'} />
                </div>
                <div style={cardStyle}>
                    <h3>GridOn</h3>
                    <SvgIcon icon={'GridOn'} />
                </div>
                <div style={cardStyle}>
                    <h3>Group</h3>
                    <SvgIcon icon={'Group'} />
                </div>
                <div style={cardStyle}>
                    <h3>InfoOutline</h3>
                    <SvgIcon icon={'InfoOutline'} />
                </div>
                <div style={cardStyle}>
                    <h3>InsertChart</h3>
                    <SvgIcon icon={'InsertChart'} />
                </div>
                <div style={cardStyle}>
                    <h3>Launch</h3>
                    <SvgIcon icon={'Launch'} />
                </div>
                <div style={cardStyle}>
                    <h3>Message</h3>
                    <SvgIcon icon={'Message'} />
                </div>
                <div style={cardStyle}>
                    <h3>MoreVert</h3>
                    <SvgIcon icon={'MoreVert'} />
                </div>
                <div style={cardStyle}>
                    <h3>NotInterested</h3>
                    <SvgIcon icon={'NotInterested'} />
                </div>
                <div style={cardStyle}>
                    <h3>Person</h3>
                    <SvgIcon icon={'Person'} />
                </div>
                <div style={cardStyle}>
                    <h3>Public</h3>
                    <SvgIcon icon={'Public'} />
                </div>
                <div style={cardStyle}>
                    <h3>Reply</h3>
                    <SvgIcon icon={'Reply'} />
                </div>
                <div style={cardStyle}>
                    <h3>Room</h3>
                    <SvgIcon icon={'Room'} />
                </div>
                <div style={cardStyle}>
                    <h3>Search</h3>
                    <SvgIcon icon={'Search'} />
                </div>
                <div style={cardStyle}>
                    <h3>ShowChart</h3>
                    <SvgIcon icon={'ShowChart'} />
                </div>
                <div style={cardStyle}>
                    <h3>Disabled icon</h3>
                    <SvgIcon icon={'Star'} disabled />
                </div>
                <div style={cardStyle}>
                    <h3>Icon color</h3>
                    <SvgIcon icon={'Star'} style={{ fill: 'red' }} />
                </div>
                <div style={cardStyle}>
                    <h3>Star, also with className prop</h3>
                    <SvgIcon icon={'Star'} className="my-starry-icon" />
                </div>
                <div style={cardStyle}>
                    <h3>StarBorder</h3>
                    <SvgIcon icon={'StarBorder'} />
                </div>
                <div style={cardStyle}>
                    <h3>ThumbUp</h3>
                    <SvgIcon icon={'ThumbUp'} />
                </div>
                <div style={cardStyle}>
                    <h3>ViewList</h3>
                    <SvgIcon icon={'ViewList'} />
                </div>
                <div style={cardStyle}>
                    <h3>Visibility</h3>
                    <SvgIcon icon={'Visibility'} />
                </div>
                <div style={cardStyle}>
                    <h3>VisibilityOff</h3>
                    <SvgIcon icon={'VisibilityOff'} />
                </div>
                <div style={cardStyle}>
                    <h3>List</h3>
                    <SvgIcon icon={'List'} />
                </div>
            </div>

            <h2>Material-UI v1 </h2>
            <div style={style}>
                <div style={cardStyle}>
                    <h3> Icon with no "icon" or "children" properties defined </h3>
                    <SvgIconTemp />
                </div>
                <div style={cardStyle}>
                    <h3> Icon with custom defined path </h3>
                    <SvgIconTemp> {children} </SvgIconTemp>
                </div>

                <div style={cardStyle}>
                    <h3> Icon with custom dimensions </h3>
                    <SvgIconTemp icon="Launch" style={{ width: '20px', height: '20px' }} />
                    <SvgIconTemp icon="Launch" style={{ width: '32px', height: '32px' }} />
                </div>
                <div style={cardStyle}>
                    <h3> Icon not found </h3>
                    <SvgIconTemp icon={'DoesntExist'} />
                </div>
                <div style={cardStyle}>
                    <h3> Add </h3>
                    <SvgIconTemp icon={'Add'} />
                </div>
                <div style={cardStyle}>
                    <h3> Alarm </h3>
                    <SvgIconTemp icon={'Alarm'} />
                </div>
                <div style={cardStyle}>
                    <h3> ArrowDownward </h3>
                    <SvgIconTemp icon={'ArrowDownward'} />
                </div>
                <div style={cardStyle}>
                    <h3> ArrowDropRight </h3>
                    <SvgIconTemp icon={'NavigationArrowDropRight'} />
                </div>
                <div style={cardStyle}>
                    <h3> ArrowUpward </h3>
                    <SvgIconTemp icon={'ArrowUpward'} />
                </div>
                <div style={cardStyle}>
                    <h3> Business </h3>
                    <SvgIconTemp icon={'Business'} />
                </div>

                <div style={cardStyle}>
                    <h3> Cancel </h3>
                    <SvgIconTemp icon={'Cancel'} />
                </div>
                <div style={cardStyle}>
                    <h3> ChevronLeft </h3>
                    <SvgIconTemp icon={'ChevronLeft'} />
                </div>
                <div style={cardStyle}>
                    <h3> ChevronRight </h3>
                    <SvgIconTemp icon={'ChevronRight'} />
                </div>
                <div style={cardStyle}>
                    <h3> Close </h3>
                    <SvgIconTemp icon={'Close'} />
                </div>
                <div style={cardStyle}>
                    <h3> Create </h3>
                    <SvgIconTemp icon={'Create'} />
                </div>
                <div style={cardStyle}>
                    <h3> CropFree </h3>
                    <SvgIconTemp icon={'CropFree'} />
                </div>
                <div style={cardStyle}>
                    <h3> Delete </h3>
                    <SvgIconTemp icon={'Delete'} />
                </div>
                <div style={cardStyle}>
                    <h3> Description </h3>
                    <SvgIconTemp icon={'Description'} />
                </div>
                <div style={cardStyle}>
                    <h3> Done </h3>
                    <SvgIconTemp icon={'Done'} />
                </div>
                <div style={cardStyle}>
                    <h3> DragHandle </h3>
                    <SvgIconTemp icon={'DragHandle'} />
                </div>
                <div style={cardStyle}>
                    <h3> Email </h3>
                    <SvgIconTemp icon={'Email'} />
                </div>
                <div style={cardStyle}>
                    <h3> Extension </h3>
                    <SvgIconTemp icon={'Extension'} />
                </div>
                <div style={cardStyle}>
                    <h3> Face </h3>
                    <SvgIconTemp icon={'Face'} />
                </div>
                <div style={cardStyle}>
                    <h3> Fingerprint </h3>
                    <SvgIconTemp icon={'Fingerprint'} />
                </div>
                <div style={cardStyle}>
                    <h3> FontDownload </h3>
                    <SvgIconTemp icon={'FontDownload'} />
                </div>
                <div style={cardStyle}>
                    <h3> GridOn </h3>
                    <SvgIconTemp icon={'GridOn'} />
                </div>
                <div style={cardStyle}>
                    <h3> Group </h3>
                    <SvgIconTemp icon={'Group'} />
                </div>
                <div style={cardStyle}>
                    <h3> InfoOutline </h3>
                    <SvgIconTemp icon={'InfoOutline'} />
                </div>
                <div style={cardStyle}>
                    <h3> InsertChart </h3>
                    <SvgIconTemp icon={'InsertChart'} />
                </div>
                <div style={cardStyle}>
                    <h3> Launch </h3>
                    <SvgIconTemp icon={'Launch'} />
                </div>
                <div style={cardStyle}>
                    <h3> Message </h3>
                    <SvgIconTemp icon={'Message'} />
                </div>
                <div style={cardStyle}>
                    <h3> MoreVert </h3>
                    <SvgIconTemp icon={'MoreVert'} />
                </div>
                <div style={cardStyle}>
                    <h3> NotInterested </h3>
                    <SvgIconTemp icon={'NotInterested'} />
                </div>
                <div style={cardStyle}>
                    <h3> Person </h3>
                    <SvgIconTemp icon={'Person'} />
                </div>
                <div style={cardStyle}>
                    <h3> Public </h3>
                    <SvgIconTemp icon={'Public'} />
                </div>
                <div style={cardStyle}>
                    <h3> Reply </h3>
                    <SvgIconTemp icon={'Reply'} />
                </div>
                <div style={cardStyle}>
                    <h3> Room </h3>
                    <SvgIconTemp icon={'Room'} />
                </div>
                <div style={cardStyle}>
                    <h3> Search </h3>
                    <SvgIconTemp icon={'Search'} />
                </div>
                <div style={cardStyle}>
                    <h3> ShowChart </h3>
                    <SvgIconTemp icon={'ShowChart'} />
                </div>
                <div style={cardStyle}>
                    <h3> Star icon with "disabled" prop  </h3>
                    <SvgIconTemp icon={'Star'} disabled />
                </div>
                <div style={cardStyle}>
                    <h3>Star icon with color </h3>
                    <SvgIconTemp icon={'Star'} style={{ fill: 'red' }} />
                </div>
                <div style={cardStyle}>
                    <h3> Star icon with className prop </h3>
                    <SvgIconTemp icon={'Star'} className="my-starry-icon" />
                </div>
                <div style={cardStyle}>
                    <h3> StarBorder </h3>
                    <SvgIconTemp icon={'StarBorder'} />
                </div>
                <div style={cardStyle}>
                    <h3> ThumbUp </h3>
                    <SvgIconTemp icon={'ThumbUp'} />
                </div>
                <div style={cardStyle}>
                    <h3> ViewList </h3>
                    <SvgIconTemp icon={'ViewList'} />
                </div>
                <div style={cardStyle}>
                    <h3> Visibility </h3>
                    <SvgIconTemp icon={'Visibility'} />
                </div>
                <div style={cardStyle}>
                    <h3> VisibilityOff </h3>
                    <SvgIconTemp icon={'VisibilityOff'} />
                </div>
                <div style={cardStyle}>
                    <h3> List </h3>
                    <SvgIconTemp icon={'List'} />
                </div>

            </div>
        </div>
    </MuiThemeProvider>
);

render(icons, document.getElementById('svgicon'));
