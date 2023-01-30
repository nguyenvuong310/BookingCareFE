import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        {/* {console.log("props", this.props)} */}
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="Header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-center-content">
                <div>
                  <b>Chuyên khoa</b>
                </div>
                <div>Tìm bác sĩ theo chuyên khoa</div>
              </div>
              <div className="child-center-content">
                <div>
                  <b>Cơ sở y tế</b>
                </div>
                <div>Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-center-content">
                <div>
                  <b>Bác sĩ</b>
                </div>
                <div>Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-center-content">
                <div>
                  <b>Gói khám</b>
                </div>
                <div>Khám sức khỏe tổng quát</div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question"> support</i>
              </div>
              <div className="flag">VN</div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">NỀN TẢNG Y TẾ</div>
            <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
            <div className="search">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Tìm bệnh viện" />
            </div>
          </div>
          <div className="content-down">
            <div className="option">
              <div className="option-child">
                <div className="icon-child">
                  <i class="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">Khám chuyên khoa</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fas fa-mobile"></i>
                </div>
                <div className="text-child">Khám từ xa</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fas fa-procedures"></i>
                </div>
                <div className="text-child">Khám tổng quát</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fas fa-syringe"></i>
                </div>
                <div className="text-child">Xét nghiệm y học</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fas fa-user-alt"></i>
                </div>
                <div className="text-child">Sức khỏe tinh thần</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fas fa-notes-medical"></i>
                </div>
                <div className="text-child">Khám nha khoa</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  //props
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
