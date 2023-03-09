import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";
//

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      posArr: [],
      roleArr: [],
      previewImg: "",
      isOpenImg: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      Role: "",
      Position: "",
      avatar: "",
      address: "",
      Gender: "",

      action: "",
      userEditId: "",
    };
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    let arrRole = this.props.roleRedux;
    let arrGender = this.props.genderRedux;
    let arrPos = this.props.posRedux;
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: arrGender,
        Gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: arrRole,
        Role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
    if (prevProps.posRedux !== this.props.posRedux) {
      this.setState({
        posArr: arrPos,
        Position: arrPos && arrPos.length > 0 ? arrPos[0].key : "",
      });
    }
    // cap nhat lai form
    if (prevProps.listUser !== this.props.listUser) {
      this.setState(
        {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          Role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
          Position: arrPos && arrPos.length > 0 ? arrPos[0].key : "",
          previewImg: "",
          Gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
          action: CRUD_ACTIONS.CREATE,
        },
        () => console.log("check address", this.state.address)
      );
    }
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPosStart();
  }
  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("data file ", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        avatar: base64,
      });
    }
  };
  handleOnClickImg = () => {
    if (!this.state.previewImg) return;
    this.setState({
      isOpenImg: true,
    });
  };
  checkValidInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "Gender",
      "Position",
      "Role",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Input required " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleOnClickSave = () => {
    let isValid = this.checkValidInput();
    if (isValid) {
      let data = {
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.Gender,
        roleId: this.state.Role,
        phoneNumber: this.state.phoneNumber,
        position: this.state.Position,
        avatar: this.state.avatar,
        previewImg: this.state.previewImg,
      };
      let { action } = this.state;
      if (action === CRUD_ACTIONS.CREATE) {
        this.props.createUserRedux(data);
      }
      if (action === CRUD_ACTIONS.EDIT) {
        this.props.editUser(data);
      }

      // setTimeout(() => {
      //   // toast.success("MY SUCCESS");
      //   this.props.getAllUserStart();
      // }, 1000);
      // ;
    }
  };
  handleOnChangeInput = (event, type) => {
    let copyState = { ...this.state };
    copyState[type] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleFillDataUser = (user) => {
    //user dc lay tu api node js
    let image64 = "";
    if (user.image) {
      image64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      Gender: user.gender,
      Role: user.roleId,
      phoneNumber: user.phoneNumber,
      Position: user.positionId,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
      previewImg: image64,
    });
  };
  render() {
    let gender = this.state.genderArr;
    let position = this.state.posArr;
    let role = this.state.roleArr;
    let language = this.props.language;
    const {
      email,
      phoneNumber,
      password,
      address,
      Role,
      Position,
      // avatar,
      lastName,
      firstName,
      Gender,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title text-center">User Redux</div>;
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                  disabled={this.state.action === CRUD_ACTIONS.EDIT}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "firstName")
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "lastName")
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.Gender" />
                </label>
                <select
                  class="form-control"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "Gender")
                  }
                  value={Gender}
                >
                  {gender &&
                    gender.length > 0 &&
                    gender.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {" "}
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.Position" />
                </label>
                <select
                  class="form-control"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "Position")
                  }
                  value={Position}
                >
                  {position &&
                    position.length > 0 &&
                    position.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {" "}
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  class="form-control"
                  onChange={(event) => this.handleOnChangeInput(event, "Role")}
                  value={Role}
                >
                  {role &&
                    role.length > 0 &&
                    role.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {" "}
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImg(event)}
                  />
                  <label htmlFor="previewImg" className="label-upload">
                    <i className="fas fa-upload"></i> Tải ảnh
                  </label>
                  <div
                    className="preViewImage"
                    style={{ backgroundImage: `url(${this.state.previewImg})` }}
                    onClick={() => this.handleOnClickImg()}
                  ></div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleOnClickSave()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 my-3">
                <TableManageUser
                  handleEditUserFromParent={this.handleFillDataUser}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpenImg && (
          <Lightbox
            mainSrc={this.state.previewImg}
            onCloseRequest={() => this.setState({ isOpenImg: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    posRedux: state.admin.positions,
    isLoading: state.admin.isLoading,
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPosStart: () => dispatch(actions.fetchPosStart()),
    createUserRedux: (data) => dispatch(actions.createNewUser(data)),
    // cap nhat lai
    getAllUserStart: () => dispatch(actions.fetchAllUserStart()),
    editUser: (data) => dispatch(actions.editUser(data)),
    // changeLanguageAppRedux: (languageInput) =>
    //   dispatch(actions.changeLanguageApp(languageInput)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
