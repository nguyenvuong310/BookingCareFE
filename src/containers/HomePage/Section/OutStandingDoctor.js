import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils/constant";
// Import css files

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctor();
    console.log("test");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctor: this.props.topDoctorRedux,
      });
    }
  }
  handleViewDetailDoctor = (Infor) => {
    console.log(Infor);
    this.props.history.push(`/doctors/${Infor.id}`);
  };
  render() {
    console.log("check props", this.props.topDoctorRedux);
    let { arrDoctor } = this.state;
    arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor);
    let language = this.props.language;
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
              {arrDoctor &&
                arrDoctor.length > 0 &&
                arrDoctor.map((item, index) => {
                  let image64 = "";
                  if (item.image) {
                    image64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi =
                    item.positionData.valueVi +
                    " " +
                    item.firstName +
                    " " +
                    item.lastName;
                  let nameEn =
                    item.positionData.valueEn +
                    " " +
                    item.lastName +
                    " " +
                    item.firstName;
                  //console.log(nameEn);
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="cus-border">
                        <div className="outer-bg">
                          <div
                            className="img-cus"
                            style={{
                              backgroundImage: `url(${image64})`,
                            }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorRedux: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
