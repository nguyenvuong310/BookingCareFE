import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUser: response.users,
      });
    }
    console.log("het", response);
  }
  handleAddNewUser = () => {
    alert("click me");
  };
  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="users-container">
        <div className="title text-center">Manager users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i class="fas fa-plus"></i>
            Add new users
          </button>
        </div>
        <div className="users-table" mt-3 mx-1>
          <table id="customers">
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
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button className="btn-del">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
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
