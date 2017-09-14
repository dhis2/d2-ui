import PropTypes from 'prop-types';
import React from 'react';

import Draft from 'draft-js';

const {
    convertFromRaw,
    convertToRaw,
    CompositeDecorator,
    ContentState,
    Editor,
    EditorState,
    Entity,
    Modifier,
    DraftEntity,
} = Draft;

const rawContent = {
    blocks: [
        {
            text: (
                'This is an "immutable" entity: Superman. Deleting any ' +
                'characters will delete the entire entity. Adding characters ' +
                'will remove the entity from the range.'
            ),
            type: 'unstyled',
            entityRanges: [],
        },
    ],

    entityMap: {
        dataElement: {
            type: 'TOKEN',
            mutability: 'IMMUTABLE',
        },
        // second: {
        //     type: 'TOKEN',
        //     mutability: 'MUTABLE',
        // },
        // third: {
        //     type: 'TOKEN',
        //     mutability: 'SEGMENTED',
        // },
    },
};

export default class EntityEditorExample extends React.Component {
    constructor(props) {
        super(props);

        const blocks = convertFromRaw(rawContent);

        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(blocks), decorator),
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = editorState => this.setState({ editorState });
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };

        this.addEntity = () => {
            const currentState = this.state.editorState.getCurrentContent();
            const newCurrentState = Modifier.insertText(
                currentState,
                this.state.editorState.getSelection(),
                this.state.dataElementName,
                undefined,
                Entity.create('dataElement', 'IMMUTABLE'),
            );

            this.setState({
                editorState: EditorState.createWithContent(newCurrentState, decorator),
            });
        };

        this.setName = (event) => {
            this.setState({
                dataElementName: event.currentTarget.value,
            });
        };
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.editor} onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        placeholder="Your formulae goes here..."
                        ref="editor"
                    />
                </div>
                <input
                    onClick={this.logState}
                    style={styles.button}
                    type="button"
                    value="Log State"
                />
                <input type="text" onChange={this.setName} />
                <button onClick={this.addEntity}>Add Tag with "Mark"</button>
            </div>
        );
    }
}

function getEntityStrategy(mutability) {
    return function (contentBlock, callback) {
        contentBlock.findEntityRanges(
            (character) => {
                const entityKey = character.getEntity();
                if (entityKey === null) {
                    return false;
                }
                return Entity.get(entityKey).getMutability() === mutability;
            },
            callback,
        );
    };
}

function getDecoratedStyle(mutability) {
    switch (mutability) {
    case 'IMMUTABLE': return styles.immutable;
    case 'MUTABLE': return styles.mutable;
    case 'SEGMENTED': return styles.segmented;
    default: return null;
    }
}

const TokenSpan = (props) => {
    console.log(Entity.get(props.entityKey));

    const style = getDecoratedStyle(
        Entity.get(props.entityKey).getMutability(),
    );
    return (
        <span {...props} style={style}>
            {props.children}
        </span>
    );
};

const decorator = new CompositeDecorator([
    {
        strategy: getEntityStrategy('IMMUTABLE'),
        component: TokenSpan,
    },
    {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
    },
    {
        strategy: getEntityStrategy('SEGMENTED'),
        component: TokenSpan,
    },
]);

const styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: 600,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    immutable: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '2px 0',
    },
    mutable: {
        backgroundColor: 'rgba(204, 204, 255, 1.0)',
        padding: '2px 0',
    },
    segmented: {
        backgroundColor: 'rgba(248, 222, 126, 1.0)',
        padding: '2px 0',
    },
};

function FormulaEditor(props, context) {
    return (
        <div>
            Formula Editor here
        </div>
    );
}

// export default FormulaEditor;
