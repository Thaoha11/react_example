import logo from './logo.svg';
import './App.css';
import React,{ Component} from 'react'
import {withRouter} from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Left from './Layout/Left';

class App  extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <>
        <Header/>
            <section>
                <div className="container">
                  <div className="row">
                      <Left/>
                      {this.props.children}
                  </div>
                </div>
            </section>
        <Footer/>
      </>
    )
  }
}
 
export default withRouter(App);
