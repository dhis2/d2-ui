import React from 'react';

import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';

class RootSelectionExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChangeRoot = this.handleChangeRoot.bind(this);
    }

    handleChangeRoot(orgUnit) {
        this.setState({ currentRoot: orgUnit });
    }

    render() {
        const selStyle = {
            borderTop: '1px solid #eeeeee',
            margin: '16px -16px 0',
            padding: '16px 16px 0',
        };
        return (
            <div>
                <OrgUnitTree
                    root={this.props.root}
                    currentRoot={this.state.currentRoot}
                    onChangeCurrentRoot={this.handleChangeRoot}
                />
                <div style={selStyle}>Current root: {this.state.currentRoot ? this.state.currentRoot.displayName : 'N/A'}</div>
            </div>
        );
    }
}

export default RootSelectionExample;
