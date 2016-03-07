import React from 'react';
import ReactDOM from 'react-dom';

import {Card, CardText} from 'material-ui/lib/card';

import SimpleTreeExample from './tree-view/simple-tree';
import MultiRootExample from './tree-view/multi-root';
import MultiRootExpandedExample from './tree-view/multi-root-expanded';
import HugeTreeExample from './tree-view/huge-tree';

class TreeViewExample extends React.Component {
    render() {
        const styles = {
            card: {
                margin: 16,
                width: 250,
                float: 'left',
                transition: 'all 350ms ease-out',
                overflowX: 'auto',
            },
            cardText: {
                paddingTop: 0,
            },
            cardHeader: {
                padding: '0 16px 16px',
                margin: '16px -16px',
                borderBottom: '1px solid #eeeeee',
            },
        };

        return (
            <div>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Simple Tree View</h3>
                        <SimpleTreeExample/>
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Multiple Roots</h3>
                        <MultiRootExample/>
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Initially Expanded</h3>
                        <MultiRootExpandedExample/>
                    </CardText>
                </Card>
                <Card style={Object.assign({}, styles.card, {width: 814})}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Huge tree</h3>
                        <HugeTreeExample/>
                    </CardText>
                </Card>
                <Card style={Object.assign({}, styles.card, {width: 814})}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Huge tree</h3>
                        <HugeTreeExample/>
                    </CardText>
                </Card>
            </div>
        );
    }
}

ReactDOM.render(<TreeViewExample />, document.getElementById('app'));
