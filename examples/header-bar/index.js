import injectTapEventPlugin from 'react-tap-event-plugin';
import initHeaderBar from '../../src/app-header';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

initHeaderBar(document.getElementById('header-bar'));
