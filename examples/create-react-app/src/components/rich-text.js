import React, { Component } from 'react';
import { InputField } from '@dhis2/d2-ui-core';
import {
    Parser as RichTextParser,
    Editor as RichTextEditor
} from '@dhis2/d2-ui-editors';

export default class RichText extends Component {
    state = {
        newText: '',
        paraVal: '',
    };

    setParagraphVal = () => {
        this.setState({ paraVal: this.state.newText });
    };

    updateNewText = (newText) => {
        this.setState({ newText });
    };

    render() {
        return (
            <div>
                <span>Input text to be converted:</span>
                <RichTextEditor onEdit={this.updateNewText}>
                    <InputField
                        value={this.state.newText}
                        onChange={this.updateNewText}
                    />
                </RichTextEditor>
                <button type="button" onClick={this.setParagraphVal}>Parse</button>
                <span>Result:</span><RichTextParser>{this.state.paraVal}</RichTextParser>
            </div>
        );
    }
}
