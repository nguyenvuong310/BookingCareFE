import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./BookingModal.scss";
//
import _ from "lodash";
import ProfileDoctor from "../ProfileDoctor";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapShot) {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  render() {
    const { timeIsSelected, dateSelected } = this.props;
    console.log("check data select", timeIsSelected);
    let doctorId =
      timeIsSelected && !_.isEmpty(timeIsSelected)
        ? timeIsSelected.doctorId
        : "";
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
                <label>Ho ten</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 form-group">
                <label>Ho ten</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 form-group">
                <label>Ho ten</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 form-group">
                <label>Ho ten</label>
                <input className="form-control"></input>
              </div>
              <div className="col-12 form-group">
                <label>Ho ten</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 form-group">
                <label>Ho ten</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 form-group">
                <label>Ho ten</label>
                <input className="form-control"></input>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3 btn-register"
              // onClick={() => this.handleAddNewuser()}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
