import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-section">Chuyen khoa pho bien</span>
            <button className="btn-more">xem them</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="img-customize">
                <div className="bg-cus"></div>
                <div>Cơ xương Khớp</div>
              </div>
              <div className="img-customize">
                <div className="bg-cus"></div>
                <div>Cơ xương Khớp</div>
              </div>
              <div className="img-customize">
                <div className="bg-cus"></div>
                <div>Cơ xương Khớp</div>
              </div>
              <div className="img-customize">
                <div className="bg-cus"></div>
                <div>Cơ xương Khớp</div>
              </div>
              <div className="img-customize">
                <div className="bg-cus"></div>
                <div>Cơ xương Khớp</div>
              </div>
              <div className="img-customize">
                <div className="bg-cus"></div>
                <div>Cơ xương Khớp</div>
              </div>
            </Slider>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
