import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  let {danhsach} = props;
  let menuDanhSach = danhsach.filter(el => (el.id <= 4 && el.id !== 1 ));
  const [user,setUser] = useState({});
  const [keySreach,setKeySeach] = useState({});
  var localUser = localStorage.getItem('user');

  var styleDaDangNhap={};
  var styleChuaDangNhap={};
  if(localUser != null){
    styleDaDangNhap = {display:'block'};
    styleChuaDangNhap = {display:'none'};
  }else{
    styleDaDangNhap = {display:'none'};
    styleChuaDangNhap = {display:'block'};
  }

  useEffect(() => {
  function getInfoUser(){
      try{
        if(localUser != null){
          var localUserParse = JSON.parse(localUser);
          setUser(localUserParse);
        }
      }catch(error){
        console.log(error);
      }
    }
    getInfoUser()
  }, []);

  const onHandleChange = (e) => {
    const {name,value} = e.target
    setKeySeach({
        ...keySreach,
        [name]:value
    })
  }

  const logout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    window.location.reload();
  }
    return (
      <div>
      <header id="header">{/*header*/}
      <div className="header_top">{/*header_top*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="contactinfo">
                <ul className="nav nav-pills">
                  <li><a href="#"><i className="fa fa-phone" /> +84 99 99 99 79</a></li>
                  <li><a href="#"><i className="fa fa-envelope" /> eshop@gmail.com</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="social-icons pull-right">
                <ul className="nav navbar-nav">
                  <li><a href="#"><i className="fa fa-facebook" /></a></li>
                  <li><a href="#"><i className="fa fa-twitter" /></a></li>
                  <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                  <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                  <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>{/*/header_top*/}
      <div className="header-middle">{/*header-middle*/}
        <div className="container">
          <div className="row">
            <div className="col-md-4 clearfix">
              <div className="logo pull-left">
                <a href="index.html"><img src="../../client/images/home/logo.png" alt="" /></a>
              </div>
          
            </div>
            <div className="col-md-4">
              {/* <div className="col-md-10">
                <input type="text" className="form-control" name="key" onChange={onHandleChange} />
              </div>
              <div className="col-md-2">
                 <a  href={'../tim-kiem/'+keySreach.key} className="btn btn-flat" id="search-btn">    <i className="fa fa-search" /></a>
              </div> */}
              <div className="input-group">
              <input type="text" className="form-control" name="key" onChange={onHandleChange} />
                  <span className="input-group-btn">
                    <a  href={'../tim-kiem/'+keySreach.key}  name="search" id="search-btn" className="btn btn-outline-warning"><i className="fa fa-search" />
                    </a>
                  </span>
              </div>
            </div>


            <div className="col-md-4 clearfix" style={styleDaDangNhap}>
              <div className="shop-menu clearfix pull-right">
                <ul className="nav navbar-nav">
                 <li ><Link to={'/thongtincanhan'}>
                   <i className="fa fa-user" />Chào :
                    {user.name}</Link></li>
                  {/* <li><a href="checkout.html"><i className="fa fa-crosshairs" /> Checkout</a></li> */}
                  <li><Link to={'/gio-hang'}>
                    <i className="fa fa-shopping-cart" />
                     Cart</Link></li>
                  {/* <li><a href="login.html"><i className="fa fa-lock" /> Login</a></li> */}
                  <li><a href="" onClick={logout}> Đăng xuất</a></li>
                </ul>
              </div>
            </div>

            <div className="col-md-4 clearfix" style={styleChuaDangNhap}>
              <div className="shop-menu clearfix pull-right">
                <ul className="nav navbar-nav">
                  <li><Link to={'/gio-hang'}>
                    <i className="fa fa-shopping-cart" />
                     Cart</Link></li>
                  <li><Link to={'/dangnhap'}><i className="fa fa-lock" /> Đăng nhập</Link></li>
                  <li><Link to={'/dangky'}><i className="fa fa-lock" /> Đăng ký</Link></li>
                </ul>
              </div>
            </div>


          </div>
        </div>
      </div>{/*/header-middle*/}
      <div className="header-bottom">{/*header-bottom*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
              </div>
              <div className="mainmenu pull-left">
                <ul className="nav navbar-nav collapse navbar-collapse">
                  <li><Link  to={'../'} 
                  // className="active"
                  >Home</Link></li>
                  {menuDanhSach.map((ds,index) => (
                   <li key={index}> <Link to={'../danh-muc/'+ds.id} >{ds.name_category}</Link></li>
                  ))}

              
                  {/* <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down" /></a>
                    <ul role="menu" className="sub-menu">
                      <li><a href="blog.html">Blog List</a></li>
                      <li><a href="blog-single.html">Blog Single</a></li>
                    </ul>
                  </li>  */}
              
                  <li><Link to={'../lien-he/'}>Liên Hệ</Link></li>
                </ul>
              </div>
            </div>
            {/* <form action="" method="get"> */}
            <div className="col-sm-3">
              {/* <div className="search pull-right">
                
                <input type="text"  name="key" onChange={onHandleChange} />
                <a  href={'../tim-kiem/'+keySreach.key}>Tìm kiếm</a>
              </div> */}
            </div>
            {/* </form> */}

          </div>
        </div>
      </div>{/*/header-bottom*/}
    </header>{/*/header*/}
    </div>
    )
}

export default Header
