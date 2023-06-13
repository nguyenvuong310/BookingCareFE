import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./manage-schedule.scss";
// import UserRedux from "./UserRedux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

import { getDetailInforDoctor } from "../../../services/doctorService";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";

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
      console.log("check range time", this.props.allScheduleTime);
      this.setState({
        rangeTime: this.props.allScheduleTime,
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
                value={this.state.currentDate[0]}
              />
            </div>
            <div className="col-12 form-group pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button className="btn btn-schedule" key={index}>
                      {this.props.language == LANGUAGES.VI
                        ? item.valueVi
                        : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <button className="btn btn-primary">save</button>
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
