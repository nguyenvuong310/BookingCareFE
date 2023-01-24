import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fisrtName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "fisrtName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("missing parameter " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewuser = () => {
    let isValid = this.checkValidInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create a new User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <lable>Email</lable>
              <input
                type="text"
                placeholder="alo@gmail.com"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                value={this.state.email}
              ></input>
            </div>
            <div className="input-container">
              <lable>Password</lable>
              <input
                type="password"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
                value={this.state.password}
              ></input>
            </div>
            <div className="input-container">
              <lable>FirstName</lable>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "fisrtName")
                }
                value={this.state.fisrtName}
              ></input>
            </div>
            <div className="input-container">
              <lable>LastName</lable>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
                value={this.state.lastName}
              ></input>
            </div>
            <div className="input-container max-width-input">
              <lable>Address</lable>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleAddNewuser()}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
