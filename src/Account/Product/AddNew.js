import axios from "axios";
import React, { Component } from "react";
import ErrorForm from "../../Member/ErrorForm";

class AddNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            category: "",
            brand: "",
            categoryArr: [],
            brandArr: [],
            sale: "",
            status: 1,
            des: "",
            company: "",
            file: "",
            formError: {},
            msg: "",
        };
        this.handleValue = this.handleValue.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.renderSale = this.renderSale.bind(this)
    }
    componentDidMount() {
        axios
          .get("http://localhost/laravel/public/api/category-brand")
          .then((res) => {
            // console.log(res);
            this.setState({
              categoryArr: res.data.category,
              brandArr: res.data.brand,
            });
            
          });

    }

    handleValue(e) {
        let nameInput = e.target.name;
        let value = e.target.value;
        this.setState({
          [nameInput]: value,
        });
    }
    handleInputFile=(e)=>{
      let file =  e.target.files;
      this.setState({file})
    }

    renderSale() {
        let { status } = this.state;
        if (status == 0) {
          return (
            <>
              <input  id="productSale" type="text" name="sale" placeholder="0" value={this.state.value}  onChange={this.handleValue}/>
              <span>%</span>
            </>
          );
        }
    }
    
    renderCategory=()=>{
      let {categoryArr} = this.state;
      // console.log(categoryArr)
      if(categoryArr.length >0) {
        return categoryArr.map((value, key)=>{
          return (
            <option value={value['id']}>{value['category']}</option>
          )
        })
      }
    }

    renderBrand=()=>{
      let {brandArr} = this.state;
      // console.log(brandArr)
      if(brandArr.length >0) {
        return brandArr.map((value, key)=>{
          return (
            <option value={value['id']}>{value['brand']}</option>
          )
        })
      }
    }

    addProduct(e){
        e.preventDefault();
        let flag = true;
        let {name , price , des , file, company }= this.state;
        let errSubmit = {};
        if(name == ''){
            flag = false;
            errSubmit.name = 'Name ko duoc de trong'
        }
        
        if(price == ''){
          flag = false;
          errSubmit.price = 'price ko duoc de trong'
        }
       
        if(des == ''){
          flag = false;
          errSubmit.des = 'Description ko duoc de trong'
        }
        
        
        if(company == ''){
          flag = false;
          errSubmit.company = 'company ko duoc de trong'
        }
       

        
        if(file == ''){
          flag = false;
          errSubmit.file = 'Avatar ko duoc de trong'
        }
        else{
            if(Object.keys(file).length > 3){
              flag = false;
              errSubmit.file = 'ko tai len qua 3 anh'
            }
            else{
              Object.keys(file).map((key,index)=>{
                // console.log(file[key])
                if(file[key]["size"] > 1024*1024){
                    flag = false;
                    errSubmit.file = 'anh qua 1 mb'
                }
                else{
                  const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"]
                  let res = file[key]["name"].split(".")
                  if (!typeImg.includes(res[1])) {
                    errSubmit.file = "vui long nhap dung dinh dang hinh anh";
                  }
                  else{
                    flag = true;
                    errSubmit.file = "";
                  }
                }
              })
            }
              
          
         
        }
        if(!flag){
            this.setState({
                formError: errSubmit
            })
        }
        else{
          const productData = JSON.parse(localStorage.getItem("info"));
          let urlProduct = "http://localhost/laravel/public/api/user/add-product";
          const accessToken = productData.success.token;
          let config = {
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            }
          }
          const formData = new FormData();
          formData.append("name", this.state.name);
          formData.append("price", this.state.price);
          formData.append("company", this.state.company);
          formData.append("status", this.state.status);
          formData.append("brand", this.state.brand);
          formData.append("detail", this.state.des);
          formData.append("category", this.state.category);
          formData.append("sale", this.state.sale);
          Object.keys(file).map((value, key) => {
            formData.append("file[]", file[value]);
          });
          axios.post(urlProduct, formData, config).then((res) => {
            console.log(res)
            if(res.data.errors){
                this.setState({
                    formError : res.data.errors
                })
            }
            else {
                this.setState({
                    name: "",
                    price: "",
                    category: "",
                    brand: "",
                    des: "",
                    sale: "",
                    company: "",
                    status: 1,
                    file: "",
                    msg: "them san pham thanh cong",
                });
            }

          })
        }

        
    }
  
    render() {
        return (
          <div className="col-sm-9">
            <div className="signup-form">
              {/*sign up form*/}
              <h2>Create Product</h2>
              {this.state.msg}
              <ErrorForm formError={this.state.formError} />
              <form
                action="#"
                enctype="multipart/form-data"
                onSubmit={this.addProduct}
              >
                <input
                  type="text"
                  placeholder="Name Product"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleValue}
                />
    
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleValue}
                />
    
                <select
                  type="text"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleValue}
                >
                  <option value="">Category</option>
                  {this.renderCategory()}
                </select>
    
                <select
                  type="text"
                  name="brand"
                  value={this.state.brand}
                  onChange={this.handleValue}
                >
                  <option value="">Brand</option>
                  {this.renderBrand()}
                </select>
    
                <select
                  type="text"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleValue}
                >
                  <option value="1">New</option>
                  <option value="0">Sale</option>
                </select>
    
                {this.renderSale()}
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleValue}
                />
                <input
                  type="file"
                  name="img"
                  multiple
                  onChange={this.handleInputFile}
                />
                <textarea
                  name="des"
                  placeholder="Product Description"
                  rows={11}
                  defaultValue={""}
                  value={this.state.des}
                  onChange={this.handleValue}
                />
    
                <button type="submit" className="btn btn-default">
                  Sign up
                </button>
              </form>
            </div>
            {/*/sign up form*/}
          </div>
        );
      }
}
export default AddNew;