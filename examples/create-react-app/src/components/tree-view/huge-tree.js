import React from 'react';
import { TreeView } from 'd2-ui-core';

class ExampleComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
        };

        this.generateData = this.generateData.bind(this);
    }

    generateChildren(label, childrenPerLevel, level, maxLevels) {
        if (level > maxLevels) {
            const out = [];
            for (let c = 0; c < childrenPerLevel; c++) {
                out.push({
                    label: `${label} ${level}.${c + 1}`,
                });
            }
            return out;
        }

        const out = [];
        for (let c = 0; c < childrenPerLevel; c++) {
            out.push({
                label: `${label} ${level}.${c + 1}`,
                children: this.generateChildren(
                    label,
                    Math.round(Math.random() * childrenPerLevel) + 1,
                    level + 1, Math.round(maxLevels * (0.1 + Math.random()))
                ),
            });
        }
        return out;
    }

    generateData() {
        this.setState({
            data: {
                label: 'Root',
                children: this.generateChildren('Level', 20, 1, 15),
            },
        });
    }

    getNodeCount(startNode) {
        function countChilds(node) {
            return Array.isArray(node.children) ?
                node.children.reduce((p, c) => p + countChilds(c), 1) :
                1;
        }

        return countChilds(startNode);
    }

    getMaxLevels(startNode) {
        return Array.isArray(startNode.children) ?
            startNode.children.reduce((p, c) => Math.max(p, 1 + this.getMaxLevels(c)), 0) :
            0;
    }

    renderLevel(level, isLastChild) {
        const styles = {
            leafNode: {},
            leafLabel: {
                fontSize: 11,
            },
            line: {
                fontSize: 21,
                position: 'relative',
                display: 'inline-block',
                top: 3,
                left: -3,
                lineHeight: 1,
                color: '#aaaaaa',
            },
        };

        if (level.children && Array.isArray(level.children)) {
            const label = (
                <span>{level.label} ({this.getMaxLevels(level)} / {this.getNodeCount(level)})</span>
            );
            return (
                <TreeView key={level.label} label={label} initiallyExpanded={false} persistent>
                    {level.children.map((child, i) => this.renderLevel(child, i === level.children.length - 1))}
                </TreeView>
            );
        }

        return (
            <div key={level.label} style={styles.leafNode}>
                <div style={styles.line}>{isLastChild ? '└' : '├'}</div>
                {level.label} <span style={styles.leafLabel}>🍂</span>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>{
                    this.state.data.children ?
                        this.renderLevel(this.state.data) :
                        <button onClick={this.generateData}>Generate data</button>
                }</div>
            </div>
        );
    }
}

export default ExampleComponent;
