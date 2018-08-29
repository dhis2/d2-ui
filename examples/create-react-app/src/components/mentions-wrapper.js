import React, { Component } from 'react';
import { InputField } from '@dhis2/d2-ui-core';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';

class MentionsWrapperExample extends Component {
    state = {
        newText: '',
    };

    updateNewText = (newText) => {
        this.setState({ newText });
    };

    render() {
        return (<MentionsWrapper d2={this.props.d2} onUserSelect={this.updateNewText}>
            <InputField
                value={this.state.newText}
                placeholder="Type some text. @ triggers the mentions suggestions"
                onChange={this.updateNewText}
            />
        </MentionsWrapper>);
    }
}

export default MentionsWrapperExample;
