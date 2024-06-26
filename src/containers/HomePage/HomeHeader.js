import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
class HomeHeader extends Component {
  changLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  returnToHome = () => {
    this.props.history.push(`/home`);
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        {/* {console.log("props", this.props)} */}
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="Header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-center-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.speciality" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.find-doctor" />
                </div>
              </div>
              <div className="child-center-content">
                <div>
                  <b>Cơ sở y tế</b>
                </div>
                <div>Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-center-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.chooseDoctor" />
                </div>
              </div>
              <div className="child-center-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.package" />
                  </b>
                </div>
                <div>
                  {" "}
                  <FormattedMessage id="home-header.HealthCheck" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle">
                  <FormattedMessage id="home-header.sp" />
                </i>
              </div>
              <div
                className={
                  language === LANGUAGES.VI ? "lag-vn active" : "lag-vn"
                }
              >
                <span onClick={() => this.changLanguage(LANGUAGES.VI)}>
                  {" "}
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN ? "lag-en active" : "lag-en"
                }
              >
                <span onClick={() => this.changLanguage(LANGUAGES.EN)}>
                  {" "}
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">NỀN TẢNG Y TẾ</div>
              <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm bệnh viện" />
              </div>
            </div>
            <div className="content-down">
              <div className="option">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital-alt"></i>
                  </div>
                  <div className="text-child">Khám chuyên khoa</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile"></i>
                  </div>
                  <div className="text-child">Khám từ xa</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">Khám tổng quát</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-syringe"></i>
                  </div>
                  <div className="text-child">Xét nghiệm y học</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-alt"></i>
                  </div>
                  <div className="text-child">Sức khỏe tinh thần</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-notes-medical"></i>
                  </div>
                  <div className="text-child">Khám nha khoa</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  //props
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (languageInput) =>
      dispatch(changeLanguageApp(languageInput)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
