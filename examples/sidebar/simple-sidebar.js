import React from 'react';
import SideBar from '../../src/sidebar/Sidebar.component';

export default class extends React.Component{

//Menu click event handler
  onChangeSection(e){
    alert('Menu:'+e);
  }

// Generate a order list menu
  createSetions(){
    let arr = new Array();
    for(let i =0;i<6;i++){
      let obj = {}
      obj.key=i.toString();
      obj.label='menu'+i;
      arr.push(obj)
    }
      return arr;
  }

  render(){
    let arr = this.createSetions();
    return(
      <SideBar sections={arr} onChangeSection={this.onChangeSection}/>
          );
  }
}
