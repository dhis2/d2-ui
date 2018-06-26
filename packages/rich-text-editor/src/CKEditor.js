import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, some } from 'lodash/fp';
import log from 'loglevel';

/* Additions from standard CKEditor:

    - Tweak internal editor CSS (CKEDITOR.addCss)
    - Tweak external (toolbar, dialogs) CSS
    - Add cke_smiley class to dialog to allow custom styling.
    - Dock position of smiley dialog to button
    - Hide dialogs on click outside dialog.
*/

class WrappedEditor {
    constructor(editor) {
        this.editor = editor;
    }

    getValue() {
        return this.editor.getData();
    }

    setCursorAtEnd() {
        setTimeout(() => {
            this.editor.focus();
            const range = this.editor.createRange();
            const selection = this.editor.getSelection();
            if (range && selection) {
                range.moveToElementEditEnd(range.root);
                this.editor.getSelection().selectRanges([range]);
            }
        }, 300);
    }

    getPosition(offset = null) {
        const range = this.editor.getSelection().getRanges()[0];
        const bbox = range
            ? range.startContainer.$.parentNode.getBoundingClientRect()
            : { top: 0, left: 0 };
        const iframe = this.editor.container.$.getElementsByTagName('iframe')[0];
        const iframeBbox = getAbsoluteElementOffset(iframe);
        const pos = { top: bbox.top + iframeBbox.top, left: bbox.left + iframeBbox.left };
        return offset ? { top: pos.top + offset.top, left: pos.left + offset.left } : pos;
    }

    getCurrentWord() {
        const range = this.editor.getSelection().getRanges()[0];
        if (range) {
            const text =
                range.startContainer.type === CKEDITOR.NODE_TEXT
                    ? range.startContainer.getText()
                    : '';
            const startOffset = range.startOffset;
            return text
                .slice(0, startOffset)
                .split(/\s+/)
                .slice(-1)[0]
                .replace(/[^\x00-\x7F]/g, '');
        } else {
            return '';
        }
    }

    replaceCurrentWord(newText) {
        const range = this.editor.getSelection().getRanges()[0];
        if (range) {
            // Replace current word
            const container = range.startContainer.$;
            const text = container.textContent;
            const startOffset = range.startOffset;
            const index = text.slice(0, startOffset).lastIndexOf(' ');
            const before = text.slice(0, index + 1);
            const after = text.slice(startOffset, -1);
            const containerText = before + newText + '\xA0' + after.replace(/^\s+/, '');
            container.textContent = containerText;

            // Move to the end of word
            const newRange = this.editor.createRange();
            const newOffset = (before + newText).length + 1;
            newRange.setStart(range.startContainer, newOffset);
            newRange.setEnd(range.startContainer, newOffset);
            this.editor.getSelection().selectRanges([newRange]);

            return containerText;
        } else {
            return null;
        }
    }
}

const getAbsoluteElementOffset = el => {
    const box = el.getBoundingClientRect();
    return { left: box.left + window.scrollX, top: box.top + window.scrollY };
};

export default class CKEditor extends Component {
    static defaultOptions = {
        plugins: ['link', 'smiley', 'toolbar', 'undo', 'wysiwygarea'].join(','),
        removePlugins: 'scayt,wsc,about,elementspath',
        toolbar: [{ name: 'actions', items: ['Link', 'Smiley'] }],
        smiley_images: [
            'regular_smile.png',
            'sad_smile.png',
            'wink_smile.png',
            'thumbs_down.png',
            'thumbs_up.png',
        ],
        resize_enabled: false,
        allowedContent: true,
        extraPlugins: 'div',
        height: 80,
    };

    static editorCss = `
        body { margin: 0; margin-left: 5px; font-family: Helvetica !important; font-size: 14px !important; }
        p { margin: 0px; line-height: auto; }
        img { width: 1.3em; height: 1.3em; }
    `;

    static externalCss = `
        .cke_top {
            padding: 0 !important;
        }

        .cke_toolgroup {
            margin: 0;
        }

        .cke_dialog {
            z-index: 20000 !important;
        }

        .cke_smiley .cke_dialog_footer {
            display: none;
        }

        .cke_smiley .cke_dialog_title,
        .cke_smiley .cke_dialog_close_button {
            display: none;
        }

        .cke_dialog_background_cover {
            opacity: 0 !important;
            z-index: 19500 !important;
        }

        a.cke_button_off.active {
            background: #e5e5e5;
            border: 1px #bcbcbc solid;
            padding: 3px 5px;
        }

        .cke_dialog_contents_body {
            padding: 9px 10px 9px 10px !important;
            height: auto !important;
        }

        .cke_smiley .cke_dialog_contents_body {
            width: 150px !important;
        }
    `;

    constructor(props) {
        super(props);
        this._onDocumentClick = this._onDocumentClick.bind(this);
        this.setContainerRef = this.setContainerRef.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.editor && newProps.refresh !== this.props.refresh) {
            this.editor.setData(newProps.initialContent);
            const wrappedEditor = new WrappedEditor(this.editor);
            wrappedEditor.setCursorAtEnd();
        }
    }

    componentDidMount() {
        const {
            onEditorChange = noop,
            onEditorInitialized = noop,
            options = {},
            onEditorKey,
        } = this.props;
        const { editorCss } = this.constructor;

        if (!window.CKEDITOR) {
            log.error(
                'CKEDITOR namespace can not be found on the window. You probably forgot to load the CKEditor script'
            );
        }

        if (!CKEDITOR.getCss().includes(editorCss)) {
            CKEDITOR.addCss(editorCss);
        }

        const fullOptions = { ...this.constructor.defaultOptions, ...options };
        this.editor = window.CKEDITOR.replace(this.editorContainer, fullOptions);

        this.editor.setData(this.props.initialContent);
        this.editor.on('dialogShow', this._onDialogShow.bind(this));
        this.editor.on('dialogHide', this._onDialogHide.bind(this));
        this.editor.on('change', () => onEditorChange(this.editor.getData()));
        if (onEditorKey) this.editor.on('key', this._onEditorKey.bind(this, onEditorKey));

        // Callback to the parent to pass the editor instance so the parent can call functions on it like insertHTML.
        onEditorInitialized(new WrappedEditor(this.editor));
    }

    _onEditorKey(onEditorKey, ev) {
        onEditorKey(ev);
    }

    _onDialogShow(ev) {
        const { data: dialog, editor } = ev;
        const { name, element } = dialog._;
        this.dialog = dialog;

        const button = document.getElementsByClassName('cke_button__' + name)[0];
        if (button) {
            button.classList.add('active');
        }

        if (name === 'smiley') {
            element.addClass('cke_smiley');
        }

        document.body.addEventListener('click', this._onDocumentClick);
        this._setDialogPosition(editor, dialog);
    }

    _onDialogHide(ev) {
        Array.from(document.getElementsByClassName('cke_button')).forEach(el =>
            el.classList.remove('active')
        );
        document.body.removeEventListener('click', this._onDocumentClick);
        this.dialog = null;
    }

    _onDocumentClick(ev) {
        if (!this.dialog) return;
        let parents = [];
        let el = ev.target;
        while (el) {
            parents.push(el);
            el = el.parentElement;
        }
        const clickInsideDialog = some(node => node.classList.contains('cke_dialog'), parents);
        if (!clickInsideDialog) {
            this.dialog.hide();
        }
    }

    _setDialogPosition(editor, dialog) {
        const buttonObj = editor.toolbar[0].items.find(item => item.name == 'smiley');
        if (dialog._.name != 'smiley' || !buttonObj) return;
        const button = document.getElementById(buttonObj._.id);
        if (!button) return;
        const {
            top: buttonTop,
            left: buttonLeft,
            width: buttonWidth,
            height: buttonHeight,
        } = button.getBoundingClientRect();
        const { width: dialogWidth, height: dialogHeight } = dialog.getSize();
        const newDialogPosition = {
            top:
                buttonTop < window.innerHeight / 2
                    ? buttonTop + buttonHeight
                    : buttonTop - dialogHeight,
            left:
                buttonLeft < window.innerWidth / 2
                    ? buttonLeft
                    : buttonLeft + buttonWidth - dialogWidth,
        };

        dialog.move(newDialogPosition.left, newDialogPosition.top);
    }

    componentWillUnmount() {
        if (this.editor) {
            this.editor.destroy();
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    setContainerRef(textarea) {
        this.editorContainer = textarea;
    }

    render() {
        return (
            <div>
                <style>{this.constructor.externalCss}</style>
                <textarea ref={this.setContainerRef} />
            </div>
        );
    }
}

CKEditor.propTypes = {
    /**
     * Object for CKEditor.replace.
     */
    options: PropTypes.object,
    /**
     * Change handler that will be called when the content of the editor changed.
     */
    onEditorChange: PropTypes.func,
    /**
     * This callback will be called when the editor is mounted to the DOM. It will receive the instance of the CKEditor
     * that was mounted.
     */
    onEditorInitialized: PropTypes.func,
    /**
     * This is the initial content that the editor should render with. This content will only be added on the
     * `componentDidMount` lifecycle, updating the content will need to be done though setting it on the editor instance
     * directly by calling CKEditor functions like `editor.insertHtml()`.
     */
    initialContent: PropTypes.string,
    /**
     * Value of any type used to refresh key. Simply send a new value whenever you want to
     * set the editor contents (from props.initialContent).
     */
    refresh: PropTypes.any,
    /**
     * This callback will be called when a key is pressed in the editor
     */
    onEditorKey: PropTypes.func,
};
