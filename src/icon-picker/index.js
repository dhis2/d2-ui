import log from 'loglevel';
import IconPicker from './IconPicker.component';

if (process.env.NODE_ENV !== 'production') {
    const msg = [
        'Deprecated: Importing IconPicker components implicitly is deprecated.',
        'Please explicitly import the component in stead:',
        '  d2-ui/lib/icon-picker/IconPicker.component.js',
    ].join('\n');
    log.warn(msg);
}

export default IconPicker;
