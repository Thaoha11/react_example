import axios from 'axios';
import React,{ Component} from 'react';
import ErrorForm from './ErrorForm'

class Login  extends Component{
    constructor(props){
        super(props)
        this.state = {           
            password: "",
            email: "",
            formError: {},
            msg:'',
            level:''
        }
        this.handleValue = this.handleValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    //    == so sanh bthuon 1=="1"
    //    === so sanh kieu 1===1
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
        let {email,password} = this.state;
        let errorSubmit = this.state.formError;
        errorSubmit.email = errorSubmit.pass = "";
        if(email == ''){
            flag = false;
            errorSubmit.email = 'Vui long nhap email';
        }
        if(password == ''){
            flag = false;
            errorSubmit.password = 'Vui long nhap pass';
        }
        if(!flag ){
            this.setState({
                formError : errorSubmit
            })
        }
        else {
            const data ={
                password : this.state.password,
                email : this.state.email,
                level : 0
            };
            axios.post("http://localhost/laravel/public/api/login", data)
            .then(res => {
                console.log(res)
                if(res.data.errors){
                    this.setState({
                        formError : res.data.errors
                    })
                } else {
                    // login xong
                    // tao bien gi do va dua vao localStorage
                    const convert = JSON.stringify(res.data);
                    localStorage.setItem("info", convert);
                    // console.log(convert);
                    localStorage.setItem("isLogin",JSON.stringify(true))
                    this.setState({
                        msg:'success'
                    })
                    
                    this.props.history.push('/');
                }
            })
        }
    }
    render(){
        // console.log(this.state.formError)
        return(
            <div className="col-sm-4 col-sm-offset-1">
                <div className="login-form">
                    <p> {this.state.msg} </p> 
                    <h2>Login to your account</h2>
                    <ErrorForm formError={this.state.formError}/>
                    <form  onSubmit={this.submitForm}> 
                        <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleValue} />
                        <input type="text" placeholder="Password" name="password" value={this.state.pass} onChange={this.handleValue} />
                        <button type="submit" class="btn btn-default">login</button>   
                    </form>
                </div>
            </div>
        )
    }  
}

export default Login;

// - loi ben frontend bat 
// - sau khi e gui data qua api, ben backend se kiem tra lai lan nua, neu co loi thhi no bao ve