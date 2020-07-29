import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store,{history} from 'Redux/store/store';
import App from './router';
import 'antd/dist/antd.less';
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <App history={history} store={store} />
  </Provider>,
  document.getElementById('root'));
