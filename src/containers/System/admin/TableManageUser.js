import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import UserRedux from "./UserRedux";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userState: [],
    };
  }

  async componentDidMount() {
    this.props.getAllUserStartFromRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.userFromRedux !== this.props.userFromRedux) {
      this.setState({
        userState: this.props.userFromRedux,
      });
    }
  }
  handleDelUser = (user) => {
    this.props.delUserStartFromRedux(user.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };
  render() {
    let arrUser = this.state.userState;
    return (
      <>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
        <div className="users-container">
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userFromRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserStartFromRedux: () => dispatch(actions.fetchAllUserStart()),
    delUserStartFromRedux: (userId) => dispatch(actions.delUserStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
