import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medicalFacility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-more">Tìm kiếm</button>
          </div>
          <div className="section-body">
            {/* setting ke thua tu HomePage.js */}
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Bệnh viện Hữu nghị Việt Đức 1</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Bệnh viện Hữu nghị Việt Đức 2</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Bệnh viện Hữu nghị Việt Đức 3</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Bệnh viện Hữu nghị Việt Đức 4</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Bệnh viện Hữu nghị Việt Đức 5</div>
              </div>
              <div className="section-customize">
                <div className="img-cus"></div>
                <div className="txt">Bệnh viện Hữu nghị Việt Đức 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
