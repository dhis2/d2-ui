import React from 'react';
import Interpretations from '@dhis2/d2-ui-interpretations';

export default class InterpretationsExample extends React.Component {
    render() {
        return (
            <div style={{ padding: 32, width: 400 }}>
                <Interpretations
                    d2={this.props.d2}
                    id={"LW0O27b7TdD"}
                    type={"visualization"}
                />
            </div>
        )
    }
}
