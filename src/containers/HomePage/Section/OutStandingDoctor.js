import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files

class OutStandingDoctor extends Component {
  render() {
    return (
      <div className="section-share section-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-more">Tìm kiếm</button>
          </div>
          <div className="section-body">
            {/* setting ke thua tu HomePage.js */}
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="cus-border">
                  <div className="outer-bg">
                    <div className="img-cus"></div>
                  </div>
                  <div className="position text-center">
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="cus-border">
                  <div className="outer-bg">
                    <div className="img-cus"></div>
                  </div>
                  <div className="position text-center">
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="cus-border">
                  <div className="outer-bg">
                    <div className="img-cus"></div>
                  </div>
                  <div className="position text-center">
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="cus-border">
                  <div className="outer-bg">
                    <div className="img-cus"></div>
                  </div>
                  <div className="position text-center">
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="cus-border">
                  <div className="outer-bg">
                    <div className="img-cus"></div>
                  </div>
                  <div className="position text-center">
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="cus-border">
                  <div className="outer-bg">
                    <div className="img-cus"></div>
                  </div>
                  <div className="position text-center">
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                    <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
