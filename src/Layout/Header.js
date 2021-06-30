import React,{Component} from 'react';
import { Link } from "react-router-dom";

class Header extends Component{

  // renderLogin(){
  //   - goi local ra de lay bien ma khi login xong tao ra 
  //   - kiem tra bien do co k?
  //     + co: 
  //       return (
  //         <li><a onClick={this.logout}><i className="fa fa-lock" />logout</a></li>
  //       )
  //     + k co :
  //       return (
  //         <li><a href="login.html"><i className="fa fa-lock" />Login</a></li>
  //       )
  // }
  // logout(){
  //   set bien login da co trong localStorage thanh false
  //   va chuyen ve lai login
  // }
  constructor(props){
    super(props)
  }
  renderLogin(){
    const isLogin = localStorage.getItem('isLogin')
    
    // console.log(isLogin)
    if(JSON.parse(isLogin)){
      return(
            <li><a onClick={this.logout}><i className="fa fa-lock" />logout</a></li>
      )
    }
    else{
      return(
        <li> <Link to="/login"><i className="fa fa-lock" /> Login</Link> </li>
      )
    }
    
  }
  logout(){
    localStorage.setItem("isLogin",JSON.stringify(false))
    this.props.history.push('/login');
  }
  renderAccount(){
    const isLogin = localStorage.getItem('isLogin')
    if(JSON.parse(isLogin)){
      return(
        <li><Link to="/account/member"><i className="fa fa-user" /> Account</Link></li>
      )
    }
  }
   render(){
       return (
        <header id="header">{/*header*/}
          <div className="header_top">{/*header_top*/}
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="contactinfo">
                    <ul className="nav nav-pills">
                      <li><a href><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                      <li><a href><i className="fa fa-envelope" /> info@domain.com</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="social-icons pull-right">
                    <ul className="nav navbar-nav">
                      <li><a href><i className="fa fa-facebook" /></a></li>
                      <li><a href><i className="fa fa-twitter" /></a></li>
                      <li><a href><i className="fa fa-linkedin" /></a></li>
                      <li><a href><i className="fa fa-dribbble" /></a></li>
                      <li><a href><i className="fa fa-google-plus" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>{/*/header_top*/}
          <div className="header-middle">{/*header-middle*/}
            <div className="container">
              <div className="row">
                <div className="col-md-4 clearfix">
                  <div className="logo pull-left">
                    <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
                  </div>
                  <div className="btn-group pull-right clearfix">
                    <div className="btn-group">
                      <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                        USA
                        <span className="caret" />
                      </button>
                      <ul className="dropdown-menu">
                        <li><a href>Canada</a></li>
                        <li><a href>UK</a></li>
                      </ul>
                    </div>
                    <div className="btn-group">
                      <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                        DOLLAR
                        <span className="caret" />
                      </button>
                      <ul className="dropdown-menu">
                        <li><a href>Canadian Dollar</a></li>
                        <li><a href>Pound</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 clearfix">
                  <div className="shop-menu clearfix pull-right">
                    <ul className="nav navbar-nav">
                      {this.renderAccount()}
                      <li><a href><i className="fa fa-star" /> Wishlist</a></li>
                      <li><a href="checkout.html"><i className="fa fa-crosshairs" /> Checkout</a></li>
                      <li><a href="cart.html"><i className="fa fa-shopping-cart" /> Cart</a></li>
                      {this.renderLogin()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>{/*/header-middle*/}
          <div className="header-bottom">{/*header-bottom*/}
            <div className="container">
              <div className="row">
                <div className="col-sm-9">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                    </button>
                  </div>
                  <div className="mainmenu pull-left">
                    <ul className="nav navbar-nav collapse navbar-collapse">
                      <li><a href="index.html">Home</a></li>
                      <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down" /></a>
                        <ul role="menu" className="sub-menu">
                          <li><a href="shop.html">Products</a></li>
                          <li><a href="product-details.html">Product Details</a></li> 
                          <li><a href="checkout.html">Checkout</a></li> 
                          <li><a href="cart.html">Cart</a></li> 
                          <li><a href="login.html">Login</a></li> 
                        </ul>
                      </li> 
                      <li className="dropdown"><a href="#" className="active">Blog<i className="fa fa-angle-down" /></a>
                        <ul role="menu" className="sub-menu">
                          <li><a href="blog.html" className="active">Blog List</a></li>
                          <li><a href="blog-single.html">Blog Single</a></li>
                        </ul>
                      </li> 
                      <li><a href="404.html">404</a></li>
                      <li><a href="contact-us.html">Contact</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="search_box pull-right">
                    <input type="text" placeholder="Search" />
                  </div>
                </div>
              </div>
            </div>
          </div>{/*/header-bottom*/}
        </header>
    )
   }
}
export default Header;