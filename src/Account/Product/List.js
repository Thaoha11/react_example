import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProduct : {},
        formError : {}
    }
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage["info"]);
    const url = "http://localhost/laravel/public/api/user/my-product";
    let accessToken = userData.success.token;

    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios.get(url, config).then((res) => {
        // console.log(res)
        this.setState({
          dataProduct: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  }
  handleRemove(e) {
    let getId = e.target.id;

    const userData = JSON.parse(localStorage["info"]);
    const url ="http://localhost/laravel/public/api/user/delete-product/" + getId;
    console.log(userData);
    let accessToken = userData.success.token;
    //console.log(accessToken);
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    axios .get(url, config).then((res) => {
        console.log(res.data.data);
        this.setState({
          dataProduct: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  }

  renderData() {
    let dataProduct = this.state.dataProduct;

    
    
    if (Object.keys(dataProduct).length > 0) {
        return Object.keys(dataProduct).map((key, index) => {
          const convertImg = JSON.parse(dataProduct[key]["image"]);
        
          return (
           
              <tr>
                {/* id */}
                <td className="cart_product">
                  <a href>
                    <p style={{ marginTop: "60px" }}>{dataProduct[key]["id"]}</p>
                  </a>
                </td>
                {/* name */}
                <td className="cart_description">
                  <h4>
                    <a href>{dataProduct[key]["name"]}</a>
                  </h4>
                </td>
                {/* image */}
                <td className="cart-product">
                  <a href>
                    <img
                      src={"http://localhost/laravel/public/upload/user/product/" +dataProduct[key]["id_user"] +"/" +convertImg[0]}
                      style={{ width: "90px" }}
                    />
                  </a>
                </td>
                {/* price */}
                <td className="cart_price">
                  <p>${dataProduct[key]["price"]}</p>
                </td>
                {/* action */}
                <td className="cart_price">
                  <Link to={"/account/edit-product/" + dataProduct[key]["id"]}>
                    edit
                  </Link>
                  <br />
                  <a id={dataProduct[key]["id"]} onClick={this.handleRemove}>
                    delete
                  </a>
                </td>
              </tr>
            
          );
        });
      }
      
  }
  // constructor -> render-> componentDidMount

  // chay lai khi nao khi co 1 state hoac props thay doi 
  render() {
    return (
      <div className="col-sm-9">
        <section id="cart_items">
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="id">ID</td>
                  <td className="description">Name</td>
                  <td className="image">Image</td>
                  <td className="price">Price</td>
                  <td className="action">Action</td>
                  <td />
                </tr>
              </thead>
              <tbody>
              {this.renderData()}
              </tbody>
             
            </table>
            <button className="btn">
              <Link to="/account/addProduct">Add New</Link>
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default List;
