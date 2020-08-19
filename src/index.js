import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import {Provider} from 'react-redux';
import store,{history} from 'Redux/store/store';
import App from './router';
import 'antd/dist/antd.less';
import './index.css';

//Sentry.init({dsn: "http://b509351384124a2c942c101e69a4bc87@121.40.178.235:9000/3"});
Sentry.init({
  dsn: "http://73779960f3a74f4b893f54b81b386020@121.40.178.235:9000/2",
  release: "production@1.0.2"
});
// AUTH TOKEN
// 9418aaddb1a242428fb67e965c5bfea7c7136b12156f4d42be262fe21c43ae90

ReactDOM.render(
  <Provider store={store}>
    <App history={history} store={store} />
  </Provider>,
  document.getElementById('root'));
