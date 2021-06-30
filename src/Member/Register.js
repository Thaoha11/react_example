import axios from 'axios';
import React,{ Component} from 'react';
import ErrorForm from './ErrorForm'

class Register  extends Component{
    constructor(props){
        super(props)
        this.state = {
            email :'',
            password : '',
            name : '',
            phone : '',
            address : '',
            avatar : '',
            formError: {},
            msg: "",
            file:''
        }
        this.handleValue = this.handleValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleInputFile=this.handleInputFile.bind(this);
    }
//    == so sanh bthuon 1=="1"
//    === so sanh kieu 1===1
    handleInputFile (e){ 
        const file = e.target.files;
        console.log(file)
        // send file to api server
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                avatar: e.target.result, //cai nay de gui qua api
                file: file[0] //cai nay de toan bo thong file upload vao file de xuong check validate
            })
        };
        reader.readAsDataURL(file[0]);
    }
    handleValue(e){ 
        let nameInput = e.target.name;
        let value = e.target.value;
        this.setState({
            [nameInput]: value,
        })
        // console.log(value)
    }
    
    submitForm(e){
        e.preventDefault();
        let flag = true;
        let { name, email, password, phone, address ,file} = this.state;
        let errorSubmit = this.state.formError;
       
        if(name == ''){
            flag = false;
            errorSubmit.name = 'Vui long nhap ten';
        }
        if(email == ''){
            flag = false;
            errorSubmit.email = 'Vui long nhap email';
        }
        if(password == ''){
            flag = false;
            errorSubmit.password = 'Vui long nhap password';
        }
        if(phone == ''){
            flag = false;
            errorSubmit.phone = 'Vui long nhap sdt';
        }
        if(address == ''){
            flag = false;
            errorSubmit.address = 'Vui long nhap dia chi';
        }  
        if(file == ''){
            flag = false;
            errorSubmit.file = 'Vui long nhap avatar';
        }
        else{
            if(file.size > 1024 * 1024 ){
                flag = false;
                errorSubmit.file = 'anh tai len qua 1mb';
            }
            else{
                const typeImg = ['png','jpg','jpeg','PNG','JPG'];
                let res = file.name.split('.');
                console.log(typeImg.includes(res[1]))
                if(!typeImg.includes(res[1])){
                    errorSubmit.file = 'vui long nhap dinh dang hinh anh';
                }
            }
        }      
        if(!flag){
            this.setState({
                formError:errorSubmit
            })
        }
        
        else{
            const data = {
                name : this.state.name,
                email : this.state.email,
                password : this.state.password,
                phone : this.state.phone,
                address : this.state.address,
                level : 0,
                avatar : this.state.avatar
            };
            axios.post("http://localhost/laravel/public/api/register", data)
            .then(res => {
                console.log(res)
                if(res.data.errors){
                    this.setState({
                        formError : res.data.errors
                    })
                }
                else{
                    this.setState({
                        msg:'success'
                       
                    })
                    alert('Dang ky thanh cong')
                }
            })
    }
 }
    render(){
        // console.log(this.state.formError)
        return(
            <>
                <p>{this.state.msg}</p>
                <ErrorForm formError={this.state.formError}/>
                <div class="col-sm-4">
                    <div class="signup-form">
                        <h2>New User Signup!</h2>
                        <form  onSubmit={this.submitForm} enctype="multipart/form-data">
                            <input type="text" placeholder="Name" name="name" value={this.state.value} onChange={this.handleValue} />
                            <input type="text" placeholder="Email" name="email" value={this.state.value} onChange={this.handleValue} />
                            <input type="text" placeholder="Password" name="password" value={this.state.value} onChange={this.handleValue} />                          
                            <input type="text" placeholder="Address" name="address" value={this.state.value} onChange={this.handleValue} />
                            <input type="text" placeholder="Phone" name="phone" value={this.state.value} onChange={this.handleValue} /> 
                            <input type="file" name="avatar"  onChange={this.handleInputFile}/>
                            <button type="submit" class="btn btn-default">Sign up</button>
				        </form>
                    </div>
                </div>
                
            </>
        )
    }  
}

export default Register;