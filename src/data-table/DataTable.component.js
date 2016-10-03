import isArrayOfStrings from 'd2-utilizr/lib/isArrayOfStrings';
import isIterable from 'd2-utilizr/lib/isIterable';
import React from 'react';
import update from 'react-addons-update';
import DataTableRow from './DataTableRow.component';
import DataTableHeader from './DataTableHeader.component';
import DataTableContextMenu from './DataTableContextMenu.component';

const DataTable = React.createClass({
    propTypes: {
        contextMenuActions: React.PropTypes.object,
        contextMenuIcons: React.PropTypes.object,
        primaryAction: React.PropTypes.func,
        isContextActionAllowed: React.PropTypes.func,
        isMultipleSelectionAllowed: React.PropTypes.bool
    },

    getInitialState() {
        return this.getStateFromProps(this.props);
    },

    componentWillReceiveProps(newProps) {
        this.setState(this.getStateFromProps(newProps));
    },

    getStateFromProps(props) {
        let dataRows = [];

        if (isIterable(props.rows)) {
            dataRows = props.rows instanceof Map ? Array.from(props.rows.values()) : props.rows;
        }

        return {
            columns: isArrayOfStrings(props.columns) ? props.columns : ['name', 'lastUpdated'],
            dataRows,
        };
    },

    renderContextMenu() {
        const actionAccessChecker = (this.props.isContextActionAllowed && this.props.isContextActionAllowed.bind(null, this.state.activeRows)) || (() => true);

        const actionsToShow = Object.keys(this.props.contextMenuActions || {})
            .filter(actionAccessChecker)
            .reduce((availableActions, actionKey) => {
                availableActions[actionKey] = this.props.contextMenuActions[actionKey];
                return availableActions;
            }, {});

        return (
                <DataTableContextMenu
                    target={this.state.contextMenuTarget}
                    onRequestClose={this._hideContextMenu}
                    actions={actionsToShow}
                    activeItems={this.state.activeRows}
                    showContextMenu={this.state.showContextMenu}
                    icons={this.props.contextMenuIcons}
                />
        );
    },

    renderHeaders() {
        return this.state.columns.map((headerName, index) => {
            return (
                <DataTableHeader key={index} isOdd={Boolean(index % 2)} name={headerName} />
            );
        });
    },

    renderRows() {
        return this.state.dataRows
            .map((dataRowsSource, dataRowsId) => {
                return (
                    <DataTableRow
                        key={dataRowsId}
                        dataSource={dataRowsSource}
                        columns={this.state.columns}
                        isActive={this.isRowActive(dataRowsSource)}                        
                        itemClicked={this.handleRowClick}
                        primaryClick={this.handlePrimaryClick}                                                                     
                    />
                );
            });
    },

    render() {
        return (
           <div className="data-table">
               <div className="data-table__headers">
                    {this.renderHeaders()}
                    <DataTableHeader />
               </div>
               <div className="data-table__rows">
                   {this.renderRows()}
               </div>
               {this.renderContextMenu()}
           </div>
        );
    },    
    
    isRowActive(rowSource){                
        if(!this.state.activeRows){
            return false;
        }
        return this.state.activeRows.filter((row) => row===rowSource).length>0;
    },
    
    isEventCtrlClick(event){
        return this.props.isMultipleSelectionAllowed && event && event.ctrlKey;       
    },

    handleRowClick(event, rowSource) {
        //Update activeRows according to click|ctlr+click
        var newActiveRows;
        //A click on itemMenu clears selection        
        if(event.isIconMenuClick){
            newActiveRows = [];
        }else if (this.isEventCtrlClick(event) || this.isRowActive(rowSource)){
            //Remain selection + rowSource if not already selected
            newActiveRows = this.updateContextSelection(rowSource);                            
        }else{
            //Context click just selects current row
            newActiveRows =[rowSource];
        }
          
        //Update state        
        this.setState({
            contextMenuTarget: event.currentTarget,
            showContextMenu: true,
            activeRows: newActiveRows
        });       
    },
    
    handlePrimaryClick(event, rowSource) {        
        //Click -> Clears selection, Invoke external action (passing event)
        if(!this.isEventCtrlClick(event)){     
            this.setState({
                activeRows: []
            });            
            this.props.primaryAction(rowSource);
            return;
        }
        
        //Ctrl + Click -> Update selection
        const newActiveRows = this.updatePrimarySelection(rowSource);
        this.setState({
            activeRows:newActiveRows,
            showContextMenu: false,
        });
    },      
       
    _hideContextMenu() {
        this.setState({
            activeRows: [],         
            showContextMenu: false,
        });
    },    
    
    updateContextSelection(rowSource){
        return this.updateSelection(rowSource,true);        
    },
    
    updatePrimarySelection(rowSource){
        return this.updateSelection(rowSource, false);        
    },    
    
    updateSelection(rowSource, isContextClick){   
        const alreadySelected = this.isRowActive(rowSource);      
        
        //ctx click + Already selected -> Same selection
        if(isContextClick && alreadySelected){
            return this.state.activeRows
        }
                 
        //click + Already selected -> Remove from selection
        if(alreadySelected){
            return this.state.activeRows.filter((nRow) => nRow!==rowSource);                      
        }
        
        //!already selected -> Add to selection
        return update(this.state.activeRows?this.state.activeRows:[], {$push: [rowSource]});            
    }
});

export default DataTable;
