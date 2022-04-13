import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import '../css/login.css';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          password: "",
          msg: "",
          btnstatus:true,
          msgColor:"",
          redirect: false
        };
    }
    onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
      };
    

      onSignInHandler = () => {
        this.setState({ btnstatus: false });
        let  baseURL= process.env.REACT_APP_API_URL;
        axios
          .post(baseURL+"/login", {
            name: this.state.name,
            password: this.state.password,
          })
          .then((response) => {
            this.setState({ btnstatus: true });
          
            if (response.data.status === 200) {
                console.log(response.data.user);
            //   this.props.changeAuth(true);
            //     localStorage.setItem("isLoggedIn", true);
            //     localStorage.setItem("userData", JSON.stringify(response.data.user));
            //     //localStorage.setItem("token", JSON.stringify(response.data.access_token));
                swal({
                    title: "Success!",
                    text: response.data.msg,
                    icon: "success",
                  }); 
              this.props.navigation("/dasboard") ;
            }
            if (
              response.data.status === "failed" &&
              response.data.success === undefined
            ) {
              this.setState({
                msg: response.data.message,
                 msgColor:"red",
              });
              setTimeout(() => {
                this.setState({ msg: ""});
              }, 2000);
            } else if (
              response.data.status === "failed" &&
              response.data.success === false
            ) {
              this.setState({
                msg: response.data.message,
                msgColor:"red",
              });
              setTimeout(() => {
                this.setState({ msg: "" });
              }, 2000);
            }
          })
          .catch((error) => {
            
            console.log(error);
          });
      };

    render() {
        return (
            <div className="container">
	            <div className="d-flex justify-content-center h-100">
		            <div className="card">
			            <div className="card-header">
				            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
			            </div>
                        <div className="card-body">
                            <form action=''>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.onChangehandler} value={this.state.name} name='name' placeholder="username"/>
                                    
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" onChange={this.onChangehandler} value={this.state.password} name='password' placeholder="password"/>
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox"/>Remember Me
                                </div>
                                <div className="form-group">
                                <button className="btn btn-primary w-sm waves-effect waves-light" type="button" disabled={!this.state.btnstatus}   onClick={this.onSignInHandler} >Log In</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<Link to={'/register'}>Sign Up</Link>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </div>
		            </div>
	            </div>
            </div>
        );
    }
}

export default Login;