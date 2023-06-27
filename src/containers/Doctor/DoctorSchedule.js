import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { getScheduleByDay } from "../../services/doctorService";
//
import BookingModal from "./Modal/BookingModal";
import { LANGUAGES } from "../../utils";
import moment, { lang } from "moment";
import localization from "moment/locale/vi";
import Select from "react-select";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DoctorSchedule: {},
      listAllDay: [],
      selectedDay: {},
      listHourByDay: [],
      language: this.props.language,
      isOpenBookingModal: false,
      timeIsSelected: "",
    };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async componentDidMount() {
    let arrDay = [];
    for (let i = 1; i < 8; i++) {
      let obj = {};
      let label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      obj.label = this.capitalizeFirstLetter(label);
      if (i == 1) {
        this.setState({
          selectedDay: obj,
        });
      }
      arrDay.push(obj);
    }
    console.log("check arr day", arrDay);
    this.setState({
      listAllDay: arrDay,
    });
  }
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let res = await getScheduleByDay(
        this.props.doctorId,
        this.state.selectedDay.value
      );
      console.log("check res fro didmount", res);
      if (res && res.data) {
        this.setState({
          listHourByDay: res.data,
        });
      }
    }
  }
  handleChangeSelect = async (selectedDay) => {
    this.setState({ selectedDay }, () =>
      console.log(`Option selected:`, this.state.selectedDay)
    );
    let res = await getScheduleByDay(this.props.doctorId, selectedDay.value);
    if (res && res.data) {
      this.setState({
        listHourByDay: res.data,
      });
    }
  };
  openBookingModal = (data) => {
    this.setState({
      isOpenBookingModal: !this.state.isOpenBookingModal,
      timeIsSelected: data,
    });
    console.log("check data", data);
  };
  render() {
    // console.log(this.props.match.params.id);
    const { listHourByDay } = this.state;
    const { language } = this.props;
    console.log("check test", language);
    return (
      <>
        <div className="doctor-detail-containers">
          <div className="doctor-day-container">
            <div className="up">
              <Select
                value={this.state.selectedDay}
                onChange={this.handleChangeSelect}
                options={this.state.listAllDay}
                className="custom-react-select"
              />
            </div>
            <hr width="180px" align="left" color="black"></hr>
            <div className="down">
              <i className="fas fa-calendar-alt icon"> </i>
              <span className="txt">Lịch khám </span>
              <div className="calendarByDay">
                {listHourByDay && listHourByDay.length > 0 ? (
                  listHourByDay.map((item, index) => {
                    return (
                      <button
                        className="btn-time"
                        key={index}
                        onClick={() => this.openBookingModal(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.timeData.valueVi
                          : item.timeData.valueEn}
                      </button>
                    );
                  })
                ) : (
                  <div className="txt-no">
                    {" "}
                    Không có lịch trong thời gian này. Xin vui lòng chọn thời
                    gian khác!!
                  </div>
                )}
              </div>
              {listHourByDay && listHourByDay.length > 0 && (
                <div className="txt-huongdan">
                  Chọn <i className="fas fa-hand-point-up"></i> và đặt (Phí đặt
                  lịch 0<sup>đ</sup>)
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpen={this.state.isOpenBookingModal}
          toggleFromParent={this.openBookingModal}
          timeIsSelected={this.state.timeIsSelected}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
