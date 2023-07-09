import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileDoctor } from "../../services/doctorService";
import "./ProfileDoctor.scss";
import NumberFormat from "react-number-format";
import moment from "moment";
import localization from "moment/locale/vi";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorProfile: {},
    };
  }

  async componentDidMount() {
    console.log("check from profile doctor", this.props.doctorId);
    let res = await getProfileDoctor(this.props.doctorId);
    if (res && res.errCode === 0) {
      this.setState({
        doctorProfile: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapShot) {
    console.log("check from profile doctor", this.props.doctorId);
    if (this.props.doctorId !== prevProps.doctorId) {
      let res = await getProfileDoctor(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          doctorProfile: res.data,
        });
      }
    }
  }
  renderTimeBooking = (dataTime) => {
    let data = "";
    if (dataTime && dataTime.date) {
      data = moment.unix(+dataTime.date / 1000).format("DD/MM/YYYY");
    }
    return (
      <>
        <span style={{ fontWeight: 600 }}>Thời gian khám :</span>
        <span>
          {" "}
          {dataTime.timeData.valueVi} ({data})
        </span>
      </>
    );
  };
  render() {
    const { doctorProfile } = this.state;
    const { dataTime } = this.props;
    // console.log("check data time from profile", dataTime);
    // console.log("check doctor profile", doctorProfile);
    return (
      <>
        <div className="intro-doctor">
          {doctorProfile && doctorProfile.image && (
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${doctorProfile.image})`,
              }}
            ></div>
          )}

          <div className="content-right">
            <div className="title-doctor">
              Bác sĩ
              {doctorProfile &&
              doctorProfile.firstName &&
              doctorProfile.lastName
                ? " " + doctorProfile.firstName + " " + doctorProfile.lastName
                : ""}
            </div>
            <div className="detail">
              {doctorProfile &&
                doctorProfile.markdown &&
                doctorProfile.markdown.intro && (
                  <span>{doctorProfile.markdown.intro}</span>
                )}
            </div>
          </div>
        </div>
        <div>
          {doctorProfile &&
            doctorProfile.doctorInfor &&
            doctorProfile.doctorInfor.priceData && (
              <div style={{ padding: "18px 20px" }}>
                <span style={{ fontWeight: 600 }}>Giá Khám : </span>
                <NumberFormat
                  value={doctorProfile.doctorInfor.priceData.valueVi}
                  displayType="text"
                  thousandSeparator={true}
                  suffix="VND"
                />
              </div>
            )}
          {dataTime && dataTime.date && (
            <div style={{ padding: "0 20px" }}>
              {this.renderTimeBooking(dataTime)}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
