import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-more">xem thêm</button>
          </div>
          <div className="section-body">
            {/* setting ke thua tu HomePage.js */}
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Cơ xương Khớp 1</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Cơ xương Khớp 2</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Cơ xương Khớp 3</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Cơ xương Khớp 4</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Cơ xương Khớp 5</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Cơ xương Khớp 6</div>
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
