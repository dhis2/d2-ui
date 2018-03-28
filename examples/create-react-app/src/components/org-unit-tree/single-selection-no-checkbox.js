import React from 'react';

import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';

class SingleSelectionExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, orgUnit) {
        this.setState(state => {
            if (state.selected[0] === orgUnit.path) {
                return { selected: [] };
            }

            return { selected: [orgUnit.path] };
        });
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
                    onSelectClick={this.handleClick}
                    selected={this.state.selected}
                    hideCheckboxes
                />
                <div style={selStyle}>Selected: {this.state.selected}</div>
            </div>
        );
    }
}

export default SingleSelectionExample;
