import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./manageDoctor.scss";
// import UserRedux from "./UserRedux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      listAllDoctor: "",
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctor();
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
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
    console.log("handleEditorChange", html, text);
  };
  handleSaveMarkdown = () => {
    console.log("check state", this.state);
    this.props.postInforDoctor({
      intro: this.state.description,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      doctorId: this.state.selectedDoctor.value,
    });
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
              options={this.state.listAllDoctor}
              className=""
            />
          </div>
          <div className="content-right">
            <label>Thong tin gioi thieu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnChangeDes(event)}
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
    allDoctors: state.admin.allDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    postInforDoctor: (inputData) =>
      dispatch(actions.postInforDoctor(inputData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
