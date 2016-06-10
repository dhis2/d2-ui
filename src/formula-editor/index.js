import log from 'loglevel';
import FormulaEditor from './FormulaEditor.component';

if (process.env.NODE_ENV !== 'production') {
    const msg = [
        'Deprecated: Importing FormulaEditor components implicitly is deprecated.',
        'Please explicitly import the component in stead:',
        '  d2-ui/lib/formula-editor/FormulaEditor.component.js',
    ].join('\n');
    log.warn(msg);
}

export default FormulaEditor;
