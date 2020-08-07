import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function SideBar(props) {
  var localUser = localStorage.getItem('user');
  var localUserParse = JSON.parse(localUser);

    return (
             <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel">
            <div className="pull-left image">
              <img src={localUserParse.avatar} className="img-circle" alt="User Image" />
            </div>
            <div className="pull-left info">
              <p>{localUserParse.name}</p>
              <a href="#"><i className="fa fa-circle text-success" /> Online</a>
            </div>
          </div>
          {/* search form */}
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search" />
                </button>
              </span>
            </div>
          </form>
          {/* /.search form */}
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header"> Admin</li>
            <li>
              <a href="pages/widgets.html">
                <i className="fa fa-th" /> <span>Dashbord</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </a>
            </li>

            <li>
              <Link to={'../../admin/products'}>
                <i className="fa fa-th" /> <span>Product</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </Link>
            </li>
            <li>
              <Link to={'../../admin/danhmuc'}>
                <i className="fa fa-th" /> <span>Danh sách</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </Link>
            </li>
            <li>
              <Link to={'../../admin/contacts'}>
                <i className="fa fa-envelope" /> <span>Contact</span>
                <span className="pull-right-container">
                <small className="label pull-right bg-green">new</small>
{/* 
                  <small className="label pull-right bg-yellow">12</small>
                  <small className="label pull-right bg-green">16</small>
                  <small className="label pull-right bg-red">5</small> */}
                </span>
              </Link>
            </li>
            <li>
              <Link to={'../../admin/order'}>
                <i className="fa fa-th" /> <span>Đơn hàng</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </Link>
            </li>

            <li>
              <Link to={'../../admin/post'}>
                <i className="fa fa-th" /> <span>Bài viết</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </Link>
            </li>

            <li>
              <Link to={'../../admin/catePost'}>
                <i className="fa fa-th" /> <span>Danh mục bài viết</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </Link>
            </li>

            <li>
              <Link to={'../../admin/tai-khoan'}>
                <i className="fa fa-th" /> <span>Tài khoản</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </Link>
            </li>

            <li>
              <Link to={'../../admin/slide-show'}>
                <i className="fa fa-th" /> <span>SlideShow</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </Link>
            </li>

          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
    )
}

SideBar.propTypes = {

}

export default SideBar

