import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/userApi';

function Account(props) {
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    async function getList(){
      try{
        const {data} = await apiRequest.getAllUsers()
        setAccounts(data);
      }catch(error){
        console.log(error);
      }
    }
    getList()
  }, []);

  function deleteUser(id){
    Swal.fire({
        title: 'Bạn có chắc chắc muốn xóa tài khoản này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.value) {
            apiRequest.removeUser(id)
            .then(function (response) {
              console.log(response);
              window.location.reload();
            })
            .catch(function (error) {
              console.log(error);
            })
          Swal.fire(
            'Đã xóa!',
          )
        } 
      })
  }

    return (
        <div>
            <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Tài khoản</h3>
        </div>
        {/* /.box-header */}
        <div className="box-body">
          <table className="table table-bordered">
            <tbody><tr>
                <th style={{width: '10px'}} scope="col">Id</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Tài khoản</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Chức năng  </th>
              </tr>
              {accounts.map((el,index) => (
                        <tr key={index}>
                            <th scope="row">{el.id}</th>
                            <th>{el.name}</th>
                            <td>{el.username} </td>
                            <td>{el.phone_number} </td>
                            <td>{el.address} </td>
                            <td>
                                <Link to={'../admin/tai-khoan/'+el.id}  className="btn btn-primary " >Sửa</Link>
                                {/* <a  className="btn btn-danger ml-2"  onClick={() => deleteUser(el.id)} style={{marginLeft: '5px'}}>Xóa</a> */}
                            </td>
                        </tr>
                    ))}
            </tbody></table>
        </div>
        {/* /.box-body */}
        <div className="box-footer clearfix">
          {/* <ul className="pagination pagination-sm no-margin pull-right">
            <li><a href="#">«</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul> */}
        </div>
      </div>
        </div>
    )
}

Account.propTypes = {

}

export default Account

