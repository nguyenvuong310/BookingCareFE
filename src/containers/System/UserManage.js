import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  delUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./modalUser";
import modalEditUser from "./modalEditUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./modalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }
  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUser: response.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.message.errCode !== 0) {
        alert(response.message.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleDelUser = async (user) => {
    try {
      let res = await delUserService(user.id);
      if (res && res.message.errCode !== 0) {
        alert(res.message.errMessage);
      } else {
        await this.getAllUserFromReact();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  doEdit = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalEditUser: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="users-container">
        <ModalUser
          // truyen function cho modalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
          //
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.doEdit}
          />
        )}
        <div className="title text-center">Manager users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>
            Add new users
          </button>
        </div>
        <div className="users-table" mt-3 mx-1>
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Action</th>
              </tr>

              {arrUser &&
                arrUser.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn-del"
                          onClick={() => this.handleDelUser(item)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
