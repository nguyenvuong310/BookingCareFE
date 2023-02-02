import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về BookingCare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="570"
              height="320"
              src="https://www.youtube.com/embed/vh8YU43VL0Y"
              title="Như Những Phút Ban Đầu - Myra Trần | Cover"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            - Cách hiểu thứ nhất (đoạn ý): Đoạn văn được dùng với ý nghĩa để chỉ
            sự phân đoạn nội dung, phân đoạn ý của văn bản. Một văn bản bao gồm
            nhiều đoạn văn: Đoạn mở đầu văn bản, những đoạn khai triển văn bản,
            đoạn kết thúc văn bản. Mỗi đoạn phải có sự hoàn chỉnh nhất định nào
            đó về mặt ý, về mặt nội dung. Nhưng thế nào là một nội dung, một ý
            hoàn chỉnh thì không có tiêu chí để xác định rõ ràng. Một văn bản,
            tuỳ theo người đọc cảm nhận mà phân chia ra thành các đoạn, sự phân
            chia có thể không thống nhất giữa những người đọc: có người chia
            theo ý lớn, có người chia theo ý nhỏ. Ý lớn là đoạn bài có hai hoặc
            ba ý nhỏ được khai triển từ ý lớn, bao gồm hai hoặc ba đoạn văn
            ngắn, mỗi đoạn ngắn đó là một ý nhỏ, các đoạn này hợp ý với nhau
            thành một ý lớn; ý nhỏ là ý được khai triển từ ý lớn, về mặt nội
            dung chỉ triển khai theo một phương diện, một hướng cụ thể, mỗi ý
            nhỏ là một đoạn.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
