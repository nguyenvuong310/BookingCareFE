import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./manageDoctor.scss";
// import UserRedux from "./UserRedux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { getDetailInforDoctor } from "../../../services/doctorService";
import Select from "react-select";
import { toast } from "react-toastify";
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
      hasOldData: false,
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
    let { hasOldData } = this.state;
    this.props.postInforDoctor({
      intro: this.state.description,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      doctorId: this.state.selectedDoctor.value,
      actions: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
    toast.success("success!");
  };
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (
      res &&
      res.errCode === 0 &&
      res.data &&
      res.data.markdown &&
      res.data.markdown.intro &&
      res.data.markdown.contentMarkdown
    ) {
      this.setState({
        description: res.data.markdown.intro,
        contentHTML: res.data.markdown.contentHTML,
        contentMarkdown: res.data.markdown.contentMarkdown,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
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
        <div className="manage-doctor-title">Quản lý Thông Tin Bác Sĩ</div>
        <div className="more-infor">
          <div className="content-left">
            <label>Chọn Bác Sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listAllDoctor}
              className=""
            />
          </div>
          <div className="content-right">
            <label>Thông Tin Giới Thiệu</label>
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
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            this.state.hasOldData === true
              ? "save-content-doctor edit"
              : "save-content-doctor"
          }
          onClick={(event) => this.handleSaveMarkdown(event)}
        >
          Save
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
