import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./BookingModal.scss";
//
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapShot) {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  render() {
    console.log("check data select", this.props.timeIsSelected);
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
            Create a new User
          </ModalHeader>
          <ModalBody>
            <div className="row">
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
              Add new
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Close
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
