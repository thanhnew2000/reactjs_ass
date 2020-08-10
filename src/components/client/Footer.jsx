import React from 'react'

const Footer = () => {
    return (
        <div>
        <footer id="footer">{/*Footer*/}
        <div className="footer-widget">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Chất lượng</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li><a href="#">Cam kết hàng chính hãng</a></li>
                    <li><a href="#">Hàng nhập khẩu</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Danh mục</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li><a href="#">Giày Nike</a></li>
                    <li><a href="#">Giày Adidas</a></li>
                    <li><a href="#">Giày Vans</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Thanh Toán</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li><a href="#">Phương thức thanh toán</a></li>
                    <li><a href="#">Hướng dẫn đặt hàng</a></li>
                    <li><a href="#">Chính sách bán buôn</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>THÔNG TIN SHOP</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li><a href="#">Địa chỉ: Mỹ đình - Hà nội</a></li>
                    <li><a href="#">Điện thoại : 0376802999</a></li>
                    <li><a href="#">Email: eshop@gmail.com</a></li>
                 
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-sm-offset-1">
                {/* <div className="single-widget"> */}
                  <div className="companyinfo mb-5">
                    <h2><span>e</span>-shopper</h2>
                    <p>Cảm ơn đã ghé shop</p>
                  </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <p className="pull-left">Copyright © 2013 E-SHOPPER Inc. All rights reserved.</p>
              <p className="pull-right">Designed by <span><a target="_blank" href="http://www.themeum.com">Themeum</a></span></p>
            </div>
          </div>
        </div>
      </footer>{/*/Footer*/}
        </div>
    )
}

export default Footer
