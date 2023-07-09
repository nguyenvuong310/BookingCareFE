import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./BookingModal.scss";
//
import _ from "lodash";
import ProfileDoctor from "../ProfileDoctor";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import Select from "react-select";
import { saveBooking } from "../../../services/doctorService";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      reason: "",
      yearOfBirth: "",
      address: "",
      listGender: "",
      selectedGender: "",
      doctorId: "",
      date: "",
      timeType: "",
    };
  }

  async componentDidMount() {
    this.props.getGender();
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    let gender = this.props.genderRedux;
    let arrGender = this.buildDataInputSelect(gender);
    if (prevProps.genderRedux !== gender) {
      this.setState({
        listGender: arrGender,
      });
    }
    if (prevProps.timeIsSelected !== this.props.timeIsSelected) {
      let timeIsSelected = this.props.timeIsSelected;
      // console.log("check selected", timeIsSelected);
      if (timeIsSelected && !_.isEmpty(timeIsSelected)) {
        let doctorId = timeIsSelected.doctorId;
        let date = timeIsSelected.date;
        let timeType = timeIsSelected.timeType;
        this.setState({
          doctorId: doctorId,
          date: date,
          timeType: timeType,
        });
      }
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  buildDataInputSelect = (inputData) => {
    let results = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let labelVi = item.valueVi;
        let labelEn = item.valueEn;
        obj.label = this.props.language == LANGUAGES.VI ? labelVi : labelEn;
        obj.value = item.keyMap;
        results.push(obj);
      });
    }
    return results;
  };
  handleChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleChangeSelect = async (selectedGender) => {
    this.setState({ selectedGender });
  };
  handleRegister = async () => {
    let data = {
      doctorId: this.state.doctorId,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      fullName: this.state.fullName,
      gender: this.state.selectedGender.value,
      yearOfBirthOfBirth: this.state.yearOfBirth,
      date: this.state.date,
      reason: this.state.reason,
      address: this.state.address,
      timeType: this.state.timeType,
    };
    let res = await saveBooking(data);
    // console.log("check res from modal", res);
    if (res && res.errCode === 0) {
      toast.success("register succeed!");
      this.toggle();
    } else {
      toast.error(res.errMessage);
    }
  };
  render() {
    const { timeIsSelected } = this.props;
    // console.log("check data select", timeIsSelected);
    let doctorId =
      timeIsSelected && timeIsSelected.doctorId ? timeIsSelected.doctorId : "";
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          //   toggle={() => this.toggle()}
          className={"booking-modal-container"}
          size="lg"
        >
          <ModalHeader
            toggle={() => this.toggle()}
            className="booking-modal-header"
          >
            Đặt lịch
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12 form-group">
                <ProfileDoctor doctorId={doctorId} dataTime={timeIsSelected} />
              </div>
              <div className="col-6 form-group">
                <label>Họ tên</label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleChangeInput(event, "fullName")
                  }
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleChangeInput(event, "phoneNumber")
                  }
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <div>
                  {" "}
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.listGender}
                  />
                </div>
              </div>
              <div className="col-6 form-group">
                <label>Năm sinh</label>
                <input
                  className="form-control"
                  value={this.state.yearOfBirth}
                  onChange={(event) =>
                    this.handleChangeInput(event, "yearOfBirth")
                  }
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ email</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleChangeInput(event, "email")}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ liên hệ</label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) => this.handleChangeInput(event, "address")}
                ></input>
              </div>
              <div className="col-12 form-group">
                <label>Lý do khám</label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) => this.handleChangeInput(event, "reason")}
                ></input>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3 btn-register"
              onClick={() => this.handleRegister()}
            >
              Đăng ký khám
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Đóng
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
