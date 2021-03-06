
import React,{ Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class BlogContent  extends Component {
  constructor(props){
    super(props)
    this.state = {
      content : []
    }
    
  }
    componentDidMount(){
        axios.get('http://localhost/laravel/public/api/blog')
        .then(res => {
         let content = res.data.blog.data;
         console.log(content)
          this.setState({ content });
  
        })
        .catch(error => console.log(error));
    }
    // constructor -> render -> componentDidMount
    // render se chay lai khi nao co state thay doi
    renderBlog(){
      let {content} = this.state;
      //console.log(content)
      if(content.length > 0) {
        return content.map((value, key)=>{
            return (
              <div className="single-blog-post">
                  <h3>{value['title']}</h3>
                  <div className="post-meta">
                    <ul>
                      <li><i className="fa fa-user" /> Mac Doe</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <span>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-half-o" />
                    </span>
                  </div>
                  <a href>
                    <img src={"http://localhost/laravel/public/upload/Blog/image/" + value['image']} alt="" />
                  </a>
                  <p>
                    {value['description']} 
                  </p>
                  <Link to ={'/blog/detail/' + value['id']} className="btn btn-primary" >Read More</Link>
            </div>
            )
        })
      }
    }
  render(){
    return (
      <div class="col-sm-9">
          <div class="blog-post-area">
            <h2 class="title text-center">Latest From our Blog</h2>
            {this.renderBlog()}
          </div>
      </div>
      
    )
  }
}
 
export default BlogContent;
