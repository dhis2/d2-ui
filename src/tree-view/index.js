import log from 'loglevel';
import TreeView from './TreeView.component';

if (process.env.NODE_ENV !== 'production') {
    const msg = [
        'Deprecated: Importing TreeView components implicitly is deprecated.',
        'Please explicitly import the component in stead:',
        '  d2-ui/lib/tree-view/TreeViewComponent.js',
    ].join('\n');
    log.warn(msg);
}

export default TreeView;
