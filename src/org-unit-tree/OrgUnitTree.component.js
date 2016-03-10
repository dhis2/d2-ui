import React from 'react';
import log from 'loglevel';
import CircularProgress from 'material-ui/lib/circular-progress';
import LinearProgress from 'material-ui/lib/linear-progress';

import Model from 'd2/lib/model/Model';

import TreeView from '../tree-view';

// TODO: Don't require Model instances (only require {id,displayName})
// TODO: Support pre-fetching unlimited levels
// TODO: Get next level in order to display proper indicator
// TODO: Caching/offline support?
// TODO: Selection

const styles = {
    progress: {
        position: 'absolute',
        display: 'inline-block',
        width: '100%',
        left: -8,
    },
    progressBar: {
        height: 2,
        backgroundColor: 'transparent',
    },
    spacer: {
        position: 'relative',
        display: 'inline-block',
        width: '1.2rem',
        height: '1rem',
    },
};

class OrgUnitTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            children: undefined,
            loading: false,
        };

        this.loadChildren = this.loadChildren.bind(this);
    }

    loadChildren() {
        if (!this.state.children && !this.state.loading) {
            this.setState({ loading: true });

            const root = this.props.root;
            root.modelDefinition.list({
                paging: false,
                fields: 'id,displayName',
                filter: [
                    `parent.id:eq:${root.id}`,
                ],
            }).then(units => {
                this.setState({ children: units.toArray(), loading: true });
            });
        }
    }

    renderChildren() {
        if (Array.isArray(this.state.children) && this.state.children.length > 0) {
            return this.state.children.map(orgUnit => {
                return <OrgUnitTree key={orgUnit.id} root={orgUnit} />;
            });
        }

        if (this.state.loading || true) {
            return <div style={styles.progress}><LinearProgress style={styles.progressBar} /></div>;
        }

        return null;
    }

    render() {
        const root = this.props.root;

        if (this.state.children === undefined || Array.isArray(this.state.children) && this.state.children.length > 0) {
            return (
                <div>
                    <TreeView label={root.displayName} onExpand={this.loadChildren} persistent>
                        {this.renderChildren()}
                    </TreeView>
                </div>
            );
        }

        return <div><div style={styles.spacer}></div>{root.displayName}</div>;
    }
}

OrgUnitTree.propTypes = {
    root: React.PropTypes.instanceOf(Model).isRequired,
};

export default OrgUnitTree;
