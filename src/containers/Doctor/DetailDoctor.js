import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../services/doctorService";
//

import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailDoctor: {},
      currentId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentId: id,
      });
      let res = await getDetailInforDoctor(id);
      console.log(res);
      if (res && res.errCode === 0) {
        this.setState({
          DetailDoctor: res.data,
        });
      }
    }
  }

  render() {
    // console.log(this.props.match.params.id);
    const { DetailDoctor } = this.state;
    console.log("check detail doctor", DetailDoctor);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-containers">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${DetailDoctor.image})`,
              }}
            ></div>
            <div className="content-right">
              <div className="title-doctor">
                Bác sĩ
                {" " + DetailDoctor.firstName + " " + DetailDoctor.lastName}
              </div>
              <div className="detail">
                {DetailDoctor.markdown && DetailDoctor.markdown.intro && (
                  <span>{DetailDoctor.markdown.intro}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorId={this.state.currentId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor doctorId={this.state.currentId} />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {DetailDoctor &&
              DetailDoctor.markdown &&
              DetailDoctor.markdown.contentHTML && (
                <div>
                  <div
                    className="content-detail"
                    dangerouslySetInnerHTML={{
                      __html: DetailDoctor.markdown.contentHTML,
                    }}
                  ></div>
                </div>
              )}
          </div>
          <div className="comment-doctoc"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
