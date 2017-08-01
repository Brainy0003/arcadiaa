import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(<App />, document.getElementById('root'));
registerServiceWorker();
