import react,{ Component} from 'react'
class ErrorForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            formError : {}
        }
        this.renderError = this.renderError.bind(this)
    }
    renderError(){ 
        let formError = this.props.formError; 
        // console.log(formError)
        if(Object.keys(formError).length > 0){
            return Object.keys(formError).map((value,key)=>{
                return(
                    <p key={key}>  {formError[value]} </p>
                ) 
            })   
        }
    }
    render(){
        return(
            <div className='formError'>
                {this.renderError()}
            </div>
        )
         
    }
}
export default ErrorForm;