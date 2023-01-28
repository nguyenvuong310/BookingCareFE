import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
class HomeHeader extends Component {
  changLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="Header-logo"></div>
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
                  <b>
                    <FormattedMessage id="home-header.facility" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.chooseHos" />
                </div>
              </div>
              <div className="child-center-content">
                <div>
                  <b>
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
                  <FormattedMessage id="home-header.HealthCheck" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i class="fas fa-question-circle">
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
