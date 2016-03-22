import React from 'react'
import ReactDOM from 'react-dom'
import { Card, CardText } from 'material-ui/lib/card';

import SimpleSidebar from './simple-sidebar.js';


function SideBarExample(){
  const styles = {
      card: {
          margin: 16,
          width: 320,
          height: 600,
          float: 'left',
          transition: 'all 175ms ease-out',
      },
      cardText: {
          paddingTop: 0,
      },
      cardHeader: {
          padding: '0 16px 16px',
          margin: '16px -16px',
          borderBottom: '1px solid #eeeeee',
          textAlign:'center'
      },
  };
  styles.cardWide = Object.assign({}, styles.card, {
      width: (styles.card.width * 3) + (styles.card.margin * 4),
  });

  return (
      <div>
          <Card style={styles.card}>
              <CardText style={styles.cardText}>
                  <h3 style={styles.cardHeader}>Simple SideBar</h3>
                  <div className="scroll">
                      <SimpleSidebar />
                  </div>
              </CardText>
          </Card>
      </div>
        );
}

ReactDOM.render(<SideBarExample />, document.getElementById('app'));
