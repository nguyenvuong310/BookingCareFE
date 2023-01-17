import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

// import adminService from "../services/adminService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isShowPassword: false,
    };
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = () => {
    console.log(
      "UserName: ",
      this.state.userName,
      " Password",
      this.state.password
    );
    console.log(this.state);
    alert("Login succeed!");
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content">
              <div className="col-12 text-login">Login </div>
              <div className="col-12 form-group login-input">
                <label>UserName</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your name"
                  value={this.state.userName}
                  onChange={(event) => this.handleOnChangeUserName(event)}
                ></input>
              </div>
              <div className="col-12 form-group login-input">
                <label>Password</label>
                <div className="custom-input-password">
                  <input
                    className="form-control"
                    type={this.state.isShowPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnChangePassword(event)}
                  ></input>
                  <span
                    onClick={() => {
                      this.handleShowHidePassword();
                    }}
                  >
                    <i
                      class={
                        this.state.isShowPassword
                          ? "fas fa-eye"
                          : "fas fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={() => this.handleLogin()}
                >
                  Login
                </button>
              </div>
              <div className="col-12">
                <span className="forgot-password">Forgot your password ?</span>
              </div>
              <div className="col-12 text-center login-input">
                <span>Or login with: </span>
              </div>
              <div className="col-12 social-login">
                <i class="fab fa-google gg"></i>
                <i class="fab fa-facebook fb"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
