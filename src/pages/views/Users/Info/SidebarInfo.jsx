import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function SidebarInfo(props) {
    
    return (
        <div>
            {/* <ul class="list-group">
  <li class="list-group-item disabled">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul> */}
<h4 className="text-center">Tài khoản</h4>
     <ul className="list-group text-center">
                        <li className="list-group-item ">
                        <Link className="nav-link active" to={'/thongtincanhan'}>Thông tin cá nhân</Link>
                        </li>
                        <li className="list-group-item">
                        <Link className="nav-link"  to={'/thongtincanhan/order'}>Đơn hàng</Link>
                        </li>
                        <li className="list-group-item">
                        <Link className="nav-link" href="#" to={'/doi-mat-khau'}>Đổi mật khẩu</Link>
                        </li>
                    </ul>
        </div>
    )
}

SidebarInfo.propTypes = {

}

export default SidebarInfo

