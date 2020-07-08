import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store,{history} from 'Redux/store/store';
import RouterApp from './router';
import './index.css'



ReactDOM.render(
  <Provider store={store}>
    <RouterApp history={history} />
  </Provider>,
  document.getElementById('root'));
