import axios from "axios";
import React, { Component } from "react";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.renderProducts = this.renderProducts.bind(this);
  }
  componentDidMount() {
    const getLocal = localStorage.getItem("products");
    const products = JSON.parse(getLocal);
    axios
      .post("http://localhost/laravel/public/api/product/cart", products)
      .then((res) => {
        if (res.data.errors) {
          this.setState({
            formErrors: res.data.errors,
          });
        } else {
          this.setState({
            data: res.data.data,
          });
        }
      });
  }
  renderProducts() {
    let { data } = this.state;
    data.map((value, key) => {
      return (
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="description" />
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="cart_product">
                  <a href>
                    <img src="images/cart/one.png" alt="" />
                  </a>
                </td>
                <td className="cart_description">
                  <h4>
                    <a href>Colorblock Scuba</a>
                  </h4>
                  <p>Web ID: 1089772</p>
                </td>
                <td className="cart_price">
                  <p>$58</p>
                </td>
                <td className="cart_quantity">
                  <div className="cart_quantity_button">
                    <a className="cart_quantity_up" href>
                      {" "}
                      +{" "}
                    </a>
                    <input
                      className="cart_quantity_input"
                      type="text"
                      name="quantity"
                      defaultValue={1}
                      autoComplete="off"
                      size={2}
                    />
                    <a className="cart_quantity_down" href>
                      {" "}
                      -{" "}
                    </a>
                  </div>
                </td>
                <td className="cart_total">
                  <p className="cart_total_price">$59</p>
                </td>
                <td className="cart_delete">
                  <a className="cart_quantity_delete" href>
                    <i className="fa fa-times" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  }
  render() {
    return (
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>

          {this.renderProducts()}
        </div>
      </section>
    );
  }
}

export default Cart;
