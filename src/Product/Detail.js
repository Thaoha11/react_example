import React,{ Component} from 'react'
import axios from "axios"
import { withRouter } from "react-router-dom";

class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            product : {},
        }
    this.rederProduct = this.rederProduct.bind(this)
    }
    
    componentDidMount(){
      const getId = this.props.match.params.id;
        
        console.log(getId)
        axios.get("http://localhost/laravel/public/api/product/detail/ "+getId)
             .then((res) => {
                console.log(res)
                this.setState ({
                    product : res.data.data
                })
             })
             .catch((error) => console.log(error));
    }
    rederProduct(){
        let {product} = this.state;
        
        if(product.length > 0){
            return product.map((value,key) => {
                return(
                    <div className="view-product">
                         {/* <img src={ "http://localhost/laravel/public/upload/user/product/" + value["id_user"] +"/" + image }
                                    alt={value["name"]}
                                /> */}
                        {/* <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a> */}
                      </div>
                )
            })
        }
    }
   
    render(){
        
              return (
          
                <div className="col-sm-9 padding-right">
                  <div className="product-details">{/*product-details*/}
                    <div className="col-sm-5">
                        {this.rederProduct()}
                      {/* <div className="view-product">
                        <img src="images/product-details/1.jpg" alt="" />
                        <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                      </div> */}
                      <div id="similar-product" className="carousel slide" data-ride="carousel">
                        {/* Wrapper for slides */}
                        <div className="carousel-inner">
                          <div className="item active">
                            <a href><img src="images/product-details/similar1.jpg" alt="" /></a>
                            <a href><img src="images/product-details/similar2.jpg" alt="" /></a>
                            <a href><img src="images/product-details/similar3.jpg" alt="" /></a>
                          </div>
                          <div className="item">
                            <a href><img src="images/product-details/similar1.jpg" alt="" /></a>
                            <a href><img src="images/product-details/similar2.jpg" alt="" /></a>
                            <a href><img src="images/product-details/similar3.jpg" alt="" /></a>
                          </div>
                          <div className="item">
                            <a href><img src="images/product-details/similar1.jpg" alt="" /></a>
                            <a href><img src="images/product-details/similar2.jpg" alt="" /></a>
                            <a href><img src="images/product-details/similar3.jpg" alt="" /></a>
                          </div>
                        </div>
                        {/* Controls */}
                        <a className="left item-control" href="#similar-product" data-slide="prev">
                          <i className="fa fa-angle-left" />
                        </a>
                        <a className="right item-control" href="#similar-product" data-slide="next">
                          <i className="fa fa-angle-right" />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <div className="product-information">{/*/product-information*/}
                        <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                        <h2>Anne Klein Sleeveless Colorblock Scuba</h2>
                        <p>Web ID: 1089772</p>
                        <img src="images/product-details/rating.png" alt="" />
                        <span>
                          <span>US $59</span>
                          <label>Quantity:</label>
                          <input type="text" defaultValue={3} />
                          <button type="button" className="btn btn-fefault cart">
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </button>
                        </span>
                        <p><b>Availability:</b> In Stock</p>
                        <p><b>Condition:</b> New</p>
                        <p><b>Brand:</b> E-SHOPPER</p>
                        <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                      </div>{/*/product-information*/}
                    </div>
                  </div>{/*/product-details*/}

                  <div className="category-tab shop-details-tab">{/*category-tab*/}
                    <div className="col-sm-12">
                      <ul className="nav nav-tabs">
                        <li><a href="#details" data-toggle="tab">Details</a></li>
                        <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                        <li><a href="#tag" data-toggle="tab">Tag</a></li>
                        <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                      </ul>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade" id="details">
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery1.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery2.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery3.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery4.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="companyprofile">
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery1.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery3.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery2.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery4.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="tag">
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery1.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery2.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery3.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/gallery4.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade active in" id="reviews">
                        <div className="col-sm-12">
                          <ul>
                            <li><a href><i className="fa fa-user" />EUGEN</a></li>
                            <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                            <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                          </ul>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                          <p><b>Write Your Review</b></p>
                          <form action="#">
                            <span>
                              <input type="text" placeholder="Your Name" />
                              <input type="email" placeholder="Email Address" />
                            </span>
                            <textarea name defaultValue={""} />
                            <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                            <button type="button" className="btn btn-default pull-right">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>{/*/category-tab*/}
                  <div className="recommended_items">{/*recommended_items*/}
                    <h2 className="title text-center">recommended items</h2>
                    <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner">
                        <div className="item active">	
                          <div className="col-sm-4">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/recommend1.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/recommend2.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/recommend3.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="item">	
                          <div className="col-sm-4">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/recommend1.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/recommend2.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/recommend3.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                        <i className="fa fa-angle-left" />
                      </a>
                      <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                        <i className="fa fa-angle-right" />
                      </a>			
                    </div>
                  </div>{/*/recommended_items*/}
                </div>
            );
        
    }
}
export default withRouter(Detail);