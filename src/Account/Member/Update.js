import axios from "axios";
import React, { Component } from "react";
import ErrorForm from "./../../Member/ErrorForm";
class Update extends Component {
    constructor(props) {
      super(props);
      this.state = {
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
          avatar: "",
          formError: {},
          file: "",
          msg: "",
          level : 0
      };

      this.handleValue = this.handleValue.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputFile = this.handleInputFile.bind(this);
    }
    
  handleValue(e) {
      let nameInput = e.target.name;
      let value = e.target.value;
      this.setState({
        [nameInput]: value,
      });
      // console.log(value);
  }

  componentDidMount() {

      const getInfo = localStorage.getItem("info");
      
      if (getInfo) {
        const convInfo = JSON.parse(getInfo);
        // console.log(convInfo)
        this.setState({
          name: convInfo.Auth.name,
          email: convInfo.Auth.email,
          address: convInfo.Auth.address,
          phone: convInfo.Auth.phone,
        });
      } else {
        this.props.history.push("/login");
      }
  }
  handleSubmit(e){
      e.preventDefault();
      const convInfo = JSON.parse(localStorage.getItem("info"));
      let flag = true;
      let { name, file, password, phone, address } = this.state;
      let errSubmit = this.state.formError;
      if (name == "") {
        flag = false;
        errSubmit.name = "Name khong duoc de trong";
      } else {
        flag = true;
        errSubmit.name = "";
      }
      if (password == "") {
        flag = false;
        errSubmit.password = "Password khong duoc de trong";
      } else {
        flag = true;
        errSubmit.password = "";
      }
      if (phone == "") {
        flag = false;
        errSubmit.phone = "Phone khong duoc de trong";
      } else {
        flag = true;
        errSubmit.phone = "";
      }
      if (address == "") {
        flag = false;
        errSubmit.address = "Address khong duoc de trong";
      } else {
        flag = true;
        errSubmit.address = "";
      }
      if(file == ''){
        flag = false;
        errSubmit.file = "Avatar khong duoc de trong"
      }
      else{
          if(file.size > 1024*1024){
              flag = false;
              errSubmit.file = "anh tai len qua 1mb "
          }
          else {
             const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"] ;
             let res = file.name.split(".");
             if(!typeImg.includes(res[1])){
                errSubmit.file = "Vui long nhap dung dinh dang hinh anh"
             }
             else{
                flag = true;
                errSubmit.file = "";
             }
          }
      }

      if(!flag){
          this.setState({
              formError : errSubmit
          })
      }
      else{
          const data = {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
              phone: this.state.phone,
              address: this.state.address,
              avatar: this.state.avatar,
            
          }
          const getIdUser = convInfo.Auth.id;
          let url = "http://localhost/laravel/public/api/user/update/" + getIdUser;
          const accessToken = convInfo.success.token;
          let config = {
              headers: {
                  Authorization: "Bearer " + accessToken,
                  "Content-Type": "application/x-www-form-urlencoded",
                  Accept: "application/json",
              }
          }
          const formData = new FormData();
          formData.append("name", this.state.name);
          formData.append("email", convInfo.Auth.email);
          formData.append("password", this.state.password);
          formData.append("phone", this.state.phone);
          formData.append("address", this.state.address);
          formData.append("image_user", this.state.avatar);
          axios.post(url, formData, config).then((res) => {
              console.log(res);
              if (res.data.errors) {
                this.setState({
                  formError: res.data.errors,
                });
              } else {
                const convert = JSON.stringify(res.data);
                localStorage.setItem("info", convert);
                this.setState({
                  name: "",
                  email: "",
                  pass: "",
                  phone: "",
                  address: "",
                  avatar: "",
                  level: 0,
                  msg: "update thanh cong ",
                });
            }
          });
      }
      
  }

  handleInputFile(e) {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result, //gui qua api
        file: file[0], // de toan bo he thong file uploadvao file de xuong check validate
      });
    };
    reader.readAsDataURL(file[0]);
  }
  render() {
    return (
      <div className="col-sm-8 col-sm-offset-1">
        <div className="login-form">
          <h2>User UpDate!</h2>
          {this.state.msg}
          <ErrorForm formError={this.state.formError} />
          <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Name"
              onChange={this.handleValue}
            />
            <input
              type="text"
              name="email"
              disabled
              value={this.state.email}
              placeholder="Email Address"
              onChange={this.handleValue}
            />
            <input
              type="text"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleValue}
            />
            <input
              type="text"
              name="address"
              value={this.state.address}
              placeholder="Address"
              onChange={this.handleValue}
            />
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              placeholder="Phone Number"
              onChange={this.handleValue}
            />
            <input type="file" name="avatar" onChange={this.handleInputFile} />
            <button
              type="submit"
              className="btn btn-default"
              style={{ marginBottom: "20px" }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Update;