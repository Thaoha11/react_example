import React, { Component } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import App from './App'
import {withRouter} from 'react-router-dom'

import Update from './Member/Update'
import AddNew from './Product/AddNew';
import List from './Product/List'
import Edit from './Product/Edit'
class Index extends Component {
  render () {
    return (
      <App>
        <Route>
          <Switch>
            <Route path='/account/member' component={Update} />
            <Route path='/account/addproduct' component={AddNew} />
            <Route path="/account/my-product" component={List} />
            <Route path="/account/edit-product/:id" component={Edit} />
          </Switch>
        </Route>  
      </App>
    )
  }
}
export default withRouter(Index)