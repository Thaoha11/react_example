import React,{ Component} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

class ProductIndex extends Component{
    constructor(props){
        super(props)
        this.state = {
            qty : 1,
            product : [],
            obj : {}
        }
        this.rederProduct = this.rederProduct.bind(this)
        // this.handleBuy = this.handleBuy.bind(this);
    }
    
    componentDidMount(){
        axios.get("http://localhost/laravel/public/api/product")
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
        if (product.length > 0){
            return product.map ((value,key) => {
                
                let convert = JSON.parse(value["image"]);
                let images = convert[0];
               
                return(
                    <div class="col-sm-4" key ={key}>
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <img
                                    src={
                                    "http://localhost/laravel/public/upload/user/product/" +
                                    value["id_user"] +
                                        "/" +
                                    images
                                    }
                                    alt={value["name"]}
                                />
                                <h2>${value["price"]}</h2>
                                <p>{value["name"]}</p>
                                <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                            </div>
                            <div class="product-overlay">
                                <div class="overlay-content">
                                    <h2>${value["price"]}</h2>
                                    <p>{value["name"]}</p>
                                    <a id={value["id"]} class="btn btn-default add-to-cart" onClick ={this.handleBuy} >
                                        <i class="fa fa-shopping-cart"></i>Add to cart
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="choose">
                            <ul class="nav nav-pills nav-justified">
                                <li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                                <li><Link to={"/product/detail/" + value["id"]}><i class="fa fa-plus-square"></i>Detail</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                )
            })
        }
    }
    handleBuy(e){
        
    }
    render(){
        return(
            <div className="features_items">
                {/*features_items*/}
                <h2 className="title text-center">Features Items</h2>
                {this.rederProduct()}
            </div>
        )
    }
}
export default ProductIndex;