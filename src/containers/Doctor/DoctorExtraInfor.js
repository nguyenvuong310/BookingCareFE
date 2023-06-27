import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { getExtraInforDoctor } from "../../services/doctorService";
//
import NumberFormat from "react-number-format";
import { LANGUAGES } from "../../utils";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMore: false,
      extraInfor: {},
    };
  }

  componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let res = await getExtraInforDoctor(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  showMore = () => {
    this.setState({
      isShowMore: !this.state.isShowMore,
    });
  };
  render() {
    let { extraInfor } = this.state;
    console.log("check extra infor", extraInfor);
    let { language } = this.props;
    return (
      <>
        <div className="doctor-extra-containers">
          <div className="content-up">
            <div className="text-address">ĐỊA CHỈ KHÁM</div>
            <div className="text-nameClinic">
              {extraInfor && extraInfor.nameClinic}
            </div>
            <div className="text-addressClinic">
              {extraInfor && extraInfor.addressClinic}
            </div>
          </div>
          <div className="content-down">
            {this.state.isShowMore === false ? (
              <div>
                <span
                  style={{
                    fontWeight: 600,
                  }}
                >
                  GIÁ KHÁM
                </span>
                :{" "}
                {extraInfor &&
                  extraInfor.priceData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      value={extraInfor.priceData.valueVi}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="VND"
                    />
                  )}
                {extraInfor &&
                  extraInfor.priceData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      value={extraInfor.priceData.valueEn}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="$"
                    />
                  )}
                <span
                  className="show-hide-more show"
                  onClick={() => this.showMore()}
                >
                  Xem chi tiết
                </span>
              </div>
            ) : (
              <div>
                <div className="tilte-price">GIÁ KHÁM</div>
                <div className="border-custom">
                  {" "}
                  <span className="left">Giá khám</span>
                  <span className="right">
                    {extraInfor &&
                      extraInfor.priceData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          value={extraInfor.priceData.valueVi}
                          displayType="text"
                          thousandSeparator={true}
                          suffix="VND"
                        />
                      )}
                    {extraInfor &&
                      extraInfor.priceData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          value={extraInfor.priceData.valueEn}
                          displayType="text"
                          thousandSeparator={true}
                          suffix="$"
                        />
                      )}
                  </span>
                  <div> {extraInfor && extraInfor.note}</div>
                </div>
                <div className="border-custom">
                  {" "}
                  Người bệnh có thể thanh toán chi phí bằng hình thức{" "}
                  {extraInfor &&
                    extraInfor.paymentData &&
                    extraInfor.paymentData.valueVi}
                </div>
                <div
                  className="show-hide-more hiden"
                  onClick={() => this.showMore()}
                >
                  Ẩn bảng giá
                </div>
              </div>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
