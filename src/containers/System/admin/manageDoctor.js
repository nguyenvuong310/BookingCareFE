import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./manageDoctor.scss";
import UserRedux from "./UserRedux";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHMTL: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
    };
  }

  async componentDidMount() {}
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHMTL: html,
      contentMarkdown: text,
    });
    // console.log("handleEditorChange", html, text);
  };
  handleSaveMarkdown = () => {
    console.log("check state", this.state);
  };
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnChangeDes = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Hello</div>
        <div className="more-infor">
          <div className="content-left">
            <label>Chon bac si</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={options}
              className=""
            />
          </div>
          <div className="content-right">
            <label>Thong tin gioi thieu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={() => this.handleOnChangeDes()}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-markdown">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={(event) => this.handleSaveMarkdown(event)}
        >
          save
        </button>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
