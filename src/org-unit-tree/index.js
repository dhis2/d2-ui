import log from 'loglevel';
import OrgUnitTreeMultipleRoots from './OrgUnitTreeMultipleRoots.component';

if (process.env.NODE_ENV !== 'production') {
    const msg = [
        'Deprecated: Importing d2-ui/lib/org-unit-tree/index.js is deprecated.',
        'Please import either:',
        '    d2-ui/lib/org-unit-tree/OrgUnitTree.component.js',
        'Or:',
        '    d2-ui/lib/org-unit-tree/OrgUnitTreeMultipleRoots.component.js',
    ];
    log.warn(msg.join('\n'));
}

export default OrgUnitTreeMultipleRoots;
