import axios from "axios";
import swal from "sweetalert";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/login.css';

class Login extends Component{
    state={
        name:'',
        email:'',
        password:''
    }
    handleInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    registerUser = async (e) =>{
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/register',this.state);

        if(res.data.status === 200){
           // console.log(res.data.msg);
            swal({
                title: "Success!",
                text: res.data.msg,
                icon: "success",
              });
              this.props.history.push('/');
            this.setState({
                name:'',
                email:'',
                password:''
            });
        }
    }

    render() {
        return (
            <div className="container">
	            <div className="d-flex justify-content-center h-100">
		            <div className="card">
			            <div className="card-header">
				            <h3>Sign Up</h3>
                            <div className="d-flex justify-content-end social_icon">
                                {/* <span><i className="fab fa-facebook-square"></i></span> */}
                                <span><i className="fab fa-google-plus-square"></i></span>
                                {/* <span><i className="fab fa-twitter-square"></i></span> */}
                            </div>
			            </div>
                        <div className="card-body">
                            <form onSubmit={this.registerUser}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.handleInput} value={this.state.name} name='name' placeholder="username"/>
                                    
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="email" className="form-control" onChange={this.handleInput} value={this.state.email} name='email' placeholder="Email"/>
                                    
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" onChange={this.handleInput} value={this.state.password} name='password' placeholder="password"/>
                                </div>
                                
                                <div className="form-group">
                                    <input type="submit" value="Register" className="btn float-right login_btn"/>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Already have an account?<Link to={'/'}>Sign In</Link>
                            </div>
                        </div>
		            </div>
	            </div>
            </div>
        );
    }
}

export default Login;