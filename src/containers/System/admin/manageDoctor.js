import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./manageDoctor.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { getDetailInforDoctor } from "../../../services/doctorService";
import Select from "react-select";
import { toast } from "react-toastify";
import _ from "lodash";
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
      listAllDoctor: [],
      hasOldData: false,
      //save doctor_infor table
      listPrice: [],
      selectedPrice: "",
      listPayment: [],
      selectedPayment: "",
      listProvince: [],
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllRequireData();
    console.log(this.props.allDoctors);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      console.log(this.props.allDoctors);
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listAllDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelectDoctor = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let dataSelectPrice = this.buildDataInputSelect(
        this.props.allRequireData.listPrice,
        "DOCTOR"
      );
      let dataSelectProvince = this.buildDataInputSelect(
        this.props.allRequireData.listProvince,
        "DOCTOR"
      );
      let dataSelectPayment = this.buildDataInputSelect(
        this.props.allRequireData.listPayment,
        "DOCTOR"
      );
      this.setState({
        listAllDoctor: dataSelectDoctor,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.allRequireData !== this.props.allRequireData) {
      let allData = this.props.allRequireData;
      if (allData.listPrice && allData.listPrice.length > 0) {
        let dataSelect = this.buildDataInputSelect(allData.listPrice, "DOCTOR");
        this.setState({
          listPrice: dataSelect,
        });
      }
      if (allData.listPayment && allData.listPayment.length > 0) {
        let dataSelect = this.buildDataInputSelect(
          allData.listPayment,
          "DOCTOR"
        );
        this.setState({
          listPayment: dataSelect,
        });
      }
      if (allData.listProvince && allData.listProvince.length > 0) {
        let dataSelect = this.buildDataInputSelect(
          allData.listProvince,
          "DOCTOR"
        );
        this.setState({
          listProvince: dataSelect,
        });
      }
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
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      provinceId: this.state.selectedProvince.value,
      paymentId: this.state.selectedPayment.value,
      priceId: this.state.selectedPrice.value,
    });
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
  handleOnchangeDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    console.log("check state copy", stateCopy);
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
    console.log(this.state.description);
  };
  buildDataInputSelect = (inputData, type) => {
    let results = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let labelVi =
          type === "USERS"
            ? item.lastName + " " + item.firstName
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? item.firstName + " " + item.lastName
            : item.valueEn;
        if (item.type === "PRICE") {
          labelVi = labelVi + " VND";
          labelEn = labelEn + " USD";
        }
        obj.label = this.props.language == LANGUAGES.VI ? labelVi : labelEn;
        obj.value = type === "USERS" ? item.id : item.keyMap;
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
              placeholder="Chọn Bác Sĩ"
            />
          </div>
          <div className="content-right">
            <label>Thông Tin Giới Thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnchangText(event, "description")}
              value={this.state.description}
              placeholder=""
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra">
          <div className="row">
            <div className="col-4 form-group">
              <label className="">Chọn Giá</label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleOnchangeDoctorInfor}
                options={this.state.listPrice}
                placeholder="Chọn Giá"
                name="selectedPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label className="">Chọn Phương Thức Thanh Toán</label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleOnchangeDoctorInfor}
                options={this.state.listPayment}
                name="selectedPayment"
                placeholder="Chọn Phương Thức Thanh Toán"
              />
            </div>
            <div className="col-4 form-group">
              <label className="">Chọn Tỉnh Thành</label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleOnchangeDoctorInfor}
                options={this.state.listProvince}
                name="selectedProvince"
                placeholder="Chọn Tỉnh Thành"
              />
            </div>
            <div className="col-4 form-group">
              <label className="">Tên Phòng Khám</label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnchangText(event, "nameClinic")
                }
                value={this.state.nameClinic}
                type="text"
              ></input>
            </div>
            <div className="col-4 form-group">
              <label className="">Địa chỉ Phòng Khám</label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnchangText(event, "addressClinic")
                }
                value={this.state.addressClinic}
                type="text"
              ></input>
            </div>
            <div className="col-4 form-group">
              <label className="">Note</label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnchangText(event, "note")}
                value={this.state.note}
                type="text"
              ></input>
            </div>
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
    allRequireData: state.admin.allRequiredData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    postInforDoctor: (inputData) =>
      dispatch(actions.postInforDoctor(inputData)),
    fetchAllRequireData: () => dispatch(actions.fetchAllRequireABoutDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
