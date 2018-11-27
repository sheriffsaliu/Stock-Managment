import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Whoops404 from './component/Whoops/Whoops404'

ReactDOM.render(
    // <Router history={HashRouter}>
    //     <Route path="/" component={App} />
    //     <Route path="*" component={Whoops404} />
    // </Router>, 
    <App />,
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
