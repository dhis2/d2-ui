import React, { Component } from 'react';
import { InputField } from '@dhis2/d2-ui-core';
import {
    Parser as RichTextParser,
    Editor as RichTextEditor,
    ClassMdParser,
    convertCtrlKey,
} from '@dhis2/d2-ui-rich-text';


export default class RichText extends Component {
    constructor(props) {
        super(props);
        this.nativeInputRef = React.createRef();
        this.nativeOutputRef = React.createRef();
        this.NativeMdParser = new ClassMdParser();
    }
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

    setNativeInputVal = val => {
        const node = this.nativeInputRef.current;
        node.value = val;
    }

    nativeKeyDown = e => {
        convertCtrlKey(e, this.setNativeInputVal);
    }

    setNativeParsedVal = () => {
        const inputNode = this.nativeInputRef.current;
        const renderedVal = this.NativeMdParser.render(inputNode.value);
        this.nativeOutputRef.current.innerHTML = renderedVal;
    }

    render() {
        return (
            <div>
                <div>
                    <p>Using RichText react component wrapper:</p>
                    <RichTextEditor onEdit={this.updateNewText}>
                        <InputField
                            value={this.state.newText}
                            onChange={this.updateNewText}
                        />
                    </RichTextEditor>
                    <button type="button" onClick={this.setParagraphVal}>Parse</button>
                    <span>Result:</span>
                    <RichTextParser>{this.state.paraVal}</RichTextParser>
                </div>
                <div>
                    <p>Using RichText function and class</p>
                    <input ref={this.nativeInputRef} type="text" onKeyDown={this.nativeKeyDown} />
                    <button type="button" onClick={this.setNativeParsedVal}>Parse native</button>
                    <span>Result:</span>
                    <p ref={this.nativeOutputRef} />
                </div>
            </div>
        );
    }
}
