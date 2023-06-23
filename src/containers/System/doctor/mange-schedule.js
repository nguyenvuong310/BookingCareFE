import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./manage-schedule.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import { postDataSchedule } from "../../../services/userService";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      listAllDoctor: "",
      currentDate: "",
      rangeTime: [],
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
    console.log(this.props.allDoctors);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      console.log(this.props.allDoctors);
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listAllDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listAllDoctor: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      // console.log("check range time", this.props.allScheduleTime);
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      // console.log("check data", data);
      this.setState({
        rangeTime: data,
      });
    }
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };

  handleOnChangeDes = (event) => {
    this.setState({
      description: event.target.value,
    });
    console.log(this.state.description);
  };
  buildDataInputSelect = (inputData) => {
    let results = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let labelVi = item.lastName + " " + item.firstName;
        let labelEn = item.firstName + " " + item.lastName;
        obj.label = this.props.language == LANGUAGES.VI ? labelVi : labelEn;
        obj.value = item.id;
        results.push(obj);
      });
    }
    return results;
  };
  handleOnchangeDatePicker = (Date) => {
    this.setState({
      currentDate: Date[0],
    });
  };
  handleSelectTime = (obj) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      let data = rangeTime;
      data = data.map((item) => {
        if (item.id === obj.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      this.setState({
        rangeTime: data,
      });
      // console.log("check rangtime", this.state.rangeTime);
    }
  };
  handleSave = async () => {
    let { rangeTime, currentDate, selectedDoctor } = this.state;
    let results = [];
    if (!selectedDoctor) {
      toast.warn("Bạn chưa chọn bác sĩ!");
      return;
    }
    if (!currentDate) {
      toast.warn("Bạn chưa chọn ngày khám!");
      return;
    }
    let formatedDate = new Date(currentDate).getTime().toString();
    // console.log("check type of format", typeof formatedDate);
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let obj = {};
          obj.doctorId = selectedDoctor.value;
          obj.date = formatedDate;
          obj.timeType = time.keyMap;
          results.push(obj);
        });
        // console.log("check result", results);
        toast.success("success");
        await postDataSchedule({
          arrSchedule: results,
          doctorId: selectedDoctor.value,
          formatedDate: formatedDate,
        });
      } else {
        toast.warn("Bạn chưa chọn giờ khám!");
        return;
      }
    }
  };
  render() {
    let { rangeTime } = this.state;
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title">Quản lý lịch khám </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>Chọn Bác Sĩ</label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listAllDoctor}
                className=""
              />
            </div>
            <div className="col-6 form-group">
              <label>Chọn Ngày</label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                minDate={new Date()}
                value={this.state.currentDate}
              />
            </div>
            <div className="col-12 form-group pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule isSelected"
                          : "btn btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleSelectTime(item)}
                    >
                      {this.props.language === LANGUAGES.VI
                        ? item.valueVi
                        : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <button
              className="btn btn-primary btn-save col-1 form-group"
              onClick={() => this.handleSave()}
            >
              save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctor,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllSchedule()),
    postInforDoctor: (inputData) =>
      dispatch(actions.postInforDoctor(inputData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
