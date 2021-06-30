import React from 'react';
import ReactDOM from 'react-dom';

import{
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import './index.css';
import App from './App';

import Blog from './Blog/BlogContent';
import BlogDetail from './Blog/BlogDetail'

import Register from './Member/Register'
import Login from './Member/Login'
import ProductIndex from './Product/ProductIndex'
import Account from './Account/Index'
import Detail  from './Product/Detail';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <div>
    <Router>
      <App>
        <Switch>
          <Route exact path='/blog/list' component ={Blog}/>
          <Route  path='/blog/detail/:id' component ={BlogDetail}/>
          
          <Route  path='/member/register' component ={Register}/>
          <Route  path='/member/login' component ={Login}/>
          <Route  path='/product/home' component ={ProductIndex}/>
          <Route  path='/product/detail' component ={Detail}/>
          
          <Route component={Account} />
        </Switch>
      </App>
    </Router>
  
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
