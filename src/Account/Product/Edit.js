import axios from "axios";
import React, { Component } from "react";
import ErrorForm from "../../Member/ErrorForm";

class Edit extends Component{
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
            id: "",
            formError: {},
            msg: "",
            imageArr :{},
            hinhconlai: "",
            img :'',
            avatarCheckBox :[] //hinh anh muon xoa
        };
        this.handleValue = this.handleValue.bind(this);
        this.renderSale = this.renderSale.bind(this);
        this.renderCatelogy = this.renderCatelogy.bind(this);
        this.renderBrand = this.renderBrand.bind(this)
        this.editProduct = this.editProduct.bind(this)
        this.handleAvatar = this.handleAvatar.bind(this)
        this.renderImg = this.renderImg.bind(this)
    }
    renderImg(e){
        let {id} = this.state;
        const {imageArr} = this.state;
        console.log(imageArr)
        if(imageArr.length > 0){
            return imageArr.map((value,key)=>{
                // console.log(imageArr)
                return(
                    <li key={key} className = "edit_img">
                        <img  src={"http://localhost/laravel/public/upload/user/product/" +id +  "/" + value}/>
                        <input type= "checkbox"  value={value} className="check-img" onClick={this.handleAvatar} />
                    </li>
                )

            })
        }
    }

    // - hinh moi upload
    // - hinh cu: 1,2,3
    // - hinh muon xoa : 1,2 => hinh cu con lai 3
    // => sau do lay tong so hinh cuoi cung gui qua api

    handleAvatar(e){
        let stateCheck = e.target.checked;
        // console.log(stateCheck)
        let {avatarCheckBox} = this.state;
        let namImg = e.target.value;
        if(stateCheck){
            avatarCheckBox.push(namImg)
            this.setState({
                avatarCheckBox : avatarCheckBox
            })
        }
        else{
          
            avatarCheckBox.splice(avatarCheckBox.indexOf(namImg),1)
            
        }
      
        // A:(1,2,3)
        // 1
        // => (2,3)
        // // 
        // (1,2,3)
        // (1,2)

        // map chay lan dau Tien , kiem tra 1 co trong mang A 
        // =>A: (2,3)
        // map lan 2
        // =>A: 3 
        // console.log(avatarCheckBox)
    }

    componentDidMount() {
        axios.get("http://localhost/laravel/public/api/category-brand")
          .then((res) => {
            // console.log(res);
            this.setState({
              categoryArr: res.data.category,
              brandArr: res.data.brand,
            });
            
          });
        const getId = this.props.match.params.id;
        
        const editProduct = JSON.parse(localStorage.getItem('info'))
        let urlProduct ="http://localhost/laravel/public/api/user/product/" + getId;
        let accessToken =editProduct.success.token;
        let config = {
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
        }
        axios.get(urlProduct,config).then((res)=>{
            console.log(res)
            if(res.data.errors){
              this.setState({
                  formError : res.data.errors
              })
            }
            else{
                this.setState ({
                    name : res.data.data.name,
                    id :res.data.data.id_user,
                    brand : res.data.data.id_brand,
                    category : res.data.data.id_catelogy,
                    price : res.data.data.price,
                    imageArr : res.data.data.image,
                    status : res.data.data.status,
                    company : res.data.data.company_profile,
                    des : res.data.data.detail,
                    sale : res.data.data.sale,
                    hinhconlai : res.data.data.image
                })
                
            }
        })
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

    renderSale(e){
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
    renderCatelogy(e){
      let {categoryArr}= this.state;
      if(categoryArr.length > 0){
          return categoryArr.map((value,key)=>{
              return(
                  <option value= {value["id"]}> {value["category"]} </option>
              )
          })  
      }
  }
    renderBrand(e){
        let {brandArr}= this.state;
        if(brandArr.length > 0){
            return brandArr.map((value,key)=>{
                return(
                    <option value= {value["id"]}> {value["brand"]} </option>
                )
            })  
        }
    }

    editProduct(e){
        e.preventDefault();
        
        let flag = true;
        let {hinhconlai, name,price,des,category,brand,company,file,avatarCheckBox,imageArr}=this.state;
        let errSubmit = this.state.formError;
        if(name == ''){
          flag = false;
          errSubmit.name = 'Vui long nhap ten'
        }
        if(price == ''){
          flag = false;
          errSubmit.price = 'Vui long nhap gia'
        }
        if(company == ''){
          flag = false;
          errSubmit.company = 'Vui long nhap cong ty'
        }
        if(category == ''){
          flag = false;
          errSubmit.category = 'Vui long nhap ten'
        }
        if(brand == ''){
          flag = false;
          errSubmit.brand = 'Vui long nhap ten'
        }
      
        if(des == ''){
          flag = false;
          errSubmit.des = 'Vui long nhap mo ta'
        }
        if(file == ''){
          flag = false;
          errSubmit.file = 'Vui long nhap anh'
        }
        else{
           
            avatarCheckBox.map((value,key)=>{
              var index = hinhconlai.indexOf(value);
              if (index !== -1) {
                hinhconlai.splice(index, 1);
              }            
             // hinh cu - hinh muon xoa = hinh con lai 
               
            })
            //console.log(imageArr);
            // lay tung hinh cu ra (1,2,3)
            // sau do kiem tra tung cai hinh cu nay co trong hinh xoa k? 
            // (1,2)
            // co thi lay lai nhung cu con lai .

            // hinh con lai + hinh moi > 3 
            if(Object.keys(file).length + hinhconlai.length > 3){
                flag = false;
                errSubmit.file = "ko duoc tai qua 3 anh"
            }
            else{
                Object.keys(file).map((key,index)=>{
                    if(file[key]["size"] > 1024 * 1024){
                        flag = false;
                        errSubmit.file = "anh qua 1mb"
                    }
                    else{
                        const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"]
                        let res = file[key]["name"].split(".")
                        if(!typeImg.includes(res[1])){
                            flag = false;
                            errSubmit.file = "xem lai dinh dang anh"
                        }
                    }
                })
            }
        }  
        if(!flag){
            this.setState ({
                formError :errSubmit
            })
        }
            // else{
            //     const getId = this.props.match.params.id;
            //     const editPtData = JSON.parse(localStorage.getItem("info"))
            //     let url="http://localhost/laravel/public/api/user/edit-product/" +getId
            //     const accessToken = editPtData.success.token;
            //     // console.log(123)
            //     let config = {
            //       headers: {
            //         Authorization: "Bearer " + accessToken,
            //         "Content-Type": "application/x-www-form-urlencoded",
            //         Accept: "application/json",
            //       },
            //     };
            //     let formData = new FormData();
            //     formData.append("name", this.state.name);
            //     formData.append("category", this.state.category);
            //     formData.append("brand", this.state.brand);
            //     formData.append("price", this.state.price);
            //     formData.append("detail", this.state.des);
            //     formData.append("company", this.state.company);
            //     formData.append("status", this.state.status);
            //     formData.append("sale", 0);
            //     Object.keys(file).map((key,index)=>{
            //         formData.append("file[]",file[key])
            //     })
            //     avatarCheckBox.map((value,key)=>{
            //         formData.append('avatarCheckBox[]',value)
            //     })
            //     axios.post(url,formData,config).then((res)=>{
            //         if(res.data.errors){
            //             this.setState({
            //                 formError : res.data.errors
            //             })
            //         }
            //         else{
            //             this.setState({
            //                 msg :"edit thanh cong"
            //             })
            //         }
            //     })
            // }
        
    }
   
  
    render() {
      // console.log(this.state.imageArr)
        return (
          <div className="col-sm-9">
            <div className="signup-form">
              sign up form
              <h2>Create Product</h2>
              {this.state.msg}
              <ErrorForm formError={this.state.formError} />
              <form
                action="#"
                enctype="multipart/form-data"
                onSubmit={this.editProduct}
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
                  onChange={this.handleValue}>
                  <option value="">Category</option>
                  {this.renderCatelogy()}
                </select>
                
                <select
                  type="text"
                  name="brand"
                  value={this.state.brand}
                  onChange={this.handleValue}>
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
                <ul>
                    {this.renderImg()}
                </ul>
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
export default Edit;