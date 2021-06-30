import React,{ Component} from 'react';
import axios from 'axios';
import ErrorForm from "../Member/ErrorForm";

class Comment  extends Component{
    constructor(props){
        super(props)
        this.state = {
            msg:'',
            message:'',
            formError:{}
        }
        this.submitForm = this.submitForm.bind(this)
        this.handleValue = this.handleValue.bind(this)
    }
    handleValue(e) {
        let nameInput = e.target.name;
        let value = e.target.value;
        this.setState({
          [nameInput]: value,
        })
    }
    submitForm(e){
        e.preventDefault();
        let flag = true;
        let {message} = this.state;
        let errorSubmit = this.state.formError;
        const isLogin = localStorage.getItem('isLogin') ;
        if(!JSON.parse(isLogin)){
            errorSubmit.msg='vui long login'
        }else{
            if(message == ''){
                flag = false;
                errorSubmit.message ='Vui long nhap binh luan'
            }
            else{
                flag = true;
                errorSubmit.message =''
            }
            if(!flag){
                this.setState({
                    formError :errorSubmit           
                })    
            }
            else{
                
                const userData = localStorage.getItem('info')
                let getData = JSON.parse(userData);
                const getId = this.props.getId;
                // console.log(getId)
                let url = "http://localhost/laravel/public/api/blog/comment/ " + getId;

            //    console.log(getData.Auth.name)
                let accessToken = getData.success.token; 
                let config = {
                    headers: {
                      Authorization: "Bearer " + accessToken,
                      "Content-Type": "application/x-www-form-urlencoded",
                      Accept: "application/json",
                    },
                  };
                  
                const formData = new FormData();
                formData.append("id_blog", getId);
                formData.append("id_user", getData.Auth.id);
                formData.append("id_comment",this.props.getIds ? this.props.getIds : 0);
                formData.append("comment", this.state.message);
                formData.append("image_user", getData.Auth.avatar);
                formData.append("name_user", getData.Auth.name);
                axios.post(url,formData,config)
                .then(res =>{
                    // console.log(res)
                    if (res.data.errors) {
                      this.setState({
                        formErrors: res.data.errors,
                      });
                    } else {
                        this.props.getComment(res.data.data);
                    //   console.log(res)
                      this.setState({
                        message: "comment thanh cong "
                       
                      });
                    }
                  
                })

            }
        }

        
        

    }
    render(){
        return(
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <p>{this.state.message} </p>
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <h1>{this.state.mgs} </h1> 
                            <ErrorForm formError={this.state.formError}/>
                            <form onSubmit={this.submitForm}>
                                <div className="blank-arrow">
                                    <label>Your Name</label>
                                </div>
                                <span>*</span>
                                <textarea name="message" rows={11} defaultValue={""} 
                                value={this.state.value} onChange={this.handleValue} />
                                <button className="btn btn-primary" >post comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}
export default Comment;
// - kiem tra login chua?
//  + chua thi bao loi 
//  + roi thi cho phep cmt 
//    - neu submit form ma chua nhap cmt: 
//       + thi bao loi 
//       + else ok: 
//         lay all nhung thong tin ma api can  và gui qua cho no .
//         Kiem tra tung cai thong tin xem co day du chua ? 
//         GUI data qua api: 
//         - lay token ra . ( lay khi login xong) 
//         - dua all data lay dc vao formData 
//         - url api 
//         => tien hanh gui :
//           + xem ket qua tra ve dung hay sai :
//             - sai thi show loi ra 
//             - dung thi hien thong bao ra.