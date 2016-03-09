import React from 'react';
import ReactDOM from 'react-dom';

import { Card, CardText } from 'material-ui/lib/card';

import SimpleTreeExample from './simple-tree';
import MultiRootExample from './multi-root';
import MultiRootExpandedExample from './multi-root-expanded';
import HugeTreeExample from './huge-tree';


function TreeViewExample() {
    const styles = {
        card: {
            margin: 16,
            width: 250,
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
        },
    };

    styles.cardWide = Object.assign({}, styles.card, {
        width: (styles.card.width * 3) + (styles.card.margin * 4),
    });

    return (
        <div>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Simple Tree View</h3>
                    <div className="scroll">
                        <SimpleTreeExample />
                    </div>
                </CardText>
            </Card>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Multiple Roots</h3>
                    <div className="scroll">
                    <MultiRootExample />
                        </div>
                </CardText>
            </Card>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Initially Expanded</h3>
                    <div className="scroll">
                    <MultiRootExpandedExample />
                        </div>
                </CardText>
            </Card>
            <Card style={styles.cardWide}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Huge tree</h3>
                    <div className="scroll">
                    <HugeTreeExample />
                        </div>
                </CardText>
            </Card>
        </div>
    );
}

ReactDOM.render(<TreeViewExample />, document.getElementById('app'));
