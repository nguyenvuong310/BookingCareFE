import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import "./DoctorSchedule.scss";
import { getScheduleByDay } from "../../services/doctorService";
//
import { LANGUAGES } from "../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import Select from "react-select";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DoctorSchedule: {},
      listAllDay: [],
      selectedDay: new Date(),
      listHourByDay: [],
      language: this.props.language,
    };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  componentDidMount() {
    let arrDay = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      let label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      obj.label = this.capitalizeFirstLetter(label);
      arrDay.push(obj);
    }
    console.log("check arr day", arrDay);
    this.setState({
      listAllDay: arrDay,
    });
  }
  handleChangeSelect = async (selectedDay) => {
    this.setState({ selectedDay }, () =>
      console.log(`Option selected:`, this.state.selectedDay)
    );
    // console.log("check prosp", this.props.doctorInfor);
    let doctorInfor = this.props.doctorInfor;
    let res = await getScheduleByDay(doctorInfor.id, selectedDay.value);
    if (res && res.data) {
      this.setState({
        listHourByDay: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        language: this.props.language,
      });
    }
  }
  render() {
    // console.log(this.props.match.params.id);
    const { listHourByDay, language } = this.state;
    return (
      <>
        <div className="doctor-detail-containers">
          <div className="doctor-day-container">
            <div className="up">
              <Select
                value={this.state.selectedDay}
                onChange={this.handleChangeSelect}
                options={this.state.listAllDay}
                className=""
              />
            </div>
            <div className="down">
              <i className="fas fa-calendar-alt icon"> </i>
              <span className="txt">Lịch khám </span>
              <div className="calendarByDay">
                {listHourByDay && listHourByDay.length > 0 ? (
                  listHourByDay.map((item, index) => {
                    return (
                      <button className="btn-time" key={index}>
                        {language === LANGUAGES.VI
                          ? item.timeData.valueVi
                          : item.timeData.valueEn}
                      </button>
                    );
                  })
                ) : (
                  <div>
                    {" "}
                    Không có lịch trong thời gian này. Xin vui lòng chọn thời
                    gian khác!!
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
