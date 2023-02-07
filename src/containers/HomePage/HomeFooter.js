import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import "./HomeFooter.scss"; import scss tu homepage.js
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import logoFace from "../../assets/icon/facebook-square.svg";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="txt col-4">
          <small>© 2023 BookingCare.</small>
        </div>
        <div className="icon col-8">
          <a
            target="_blank"
            href="https://www.facebook.com/vuongtheking.nguyen.9"
          >
            <img
              className="nut-mxh"
              width="32"
              height="32"
              src={logoFace}
              alt="Facebook"
            ></img>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
