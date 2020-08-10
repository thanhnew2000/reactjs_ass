import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/orderApi';

function OrderAdmin(props) {
  const history = useHistory();
  const [listOrder, setlistOrder] = useState([]);
  const [listOrder2, setlistOrder2] = useState([]);

  useEffect(() => {
    async function getList(){
      try{
        const {data} = await apiRequest.getAllOrder()
        setlistOrder(data);
        setlistOrder2(data);
        console.log(data)
      }catch(error){
        console.log(error);
      }
    }
    getList()
  }, []);

  function textTrangThai($number){
    if($number == 1){
      return 'Chờ xác nhận đơn'
    }else if($number == 2){
      return 'Đã chốt đơn'
    }else if($number == 3){
      return 'Đang giao hàng'
    }else if($number == 4){
      return 'Hoàn thành'
    }
  }


  function colorStatus($number){
    if($number == 1){
      return 'red'
    }else if($number == 2){
      return 'blue'
    }else if($number == 3){
      return 'blue'
    }else if($number == 4){
      return 'green'
    }
  }

  
  function locFolowStatus(e){
    const {value} = e.target;
    const newOrders =listOrder2.filter(el => el.status == parseInt(value))
    if(value == 'all'){
      setlistOrder(listOrder2);
    }else{
      setlistOrder(newOrders);
    }
  }


  function deleteOrder(id){
    Swal.fire({
        title: 'Bạn có chắc chắc muốn đơn hàng này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.value) {
          apiRequest.remove(id)
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

function formatMoney(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

    return (
        <div>
            <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Đơn hàng </h3>
        </div>
        {/* /.box-header */}
        <div className="row">
          <div className="col-md-7"></div>
          <div className="col-md-1">Trạng thái:</div>
          <div className="col-md-3">
            <select onChange={locFolowStatus} className="form-control">
                        <option value="all">Tất cả</option>
                        <option  value='1'>Chờ xác nhận đơn</option>
                        <option  value='2'>Đã chốt đơn</option>
                        <option  value='3'>Đang giao hàng</option>
                        <option  value='4'>Hoàn thành</option>
              </select>
          </div>
          </div>

        <div className="box-body">
          <table className="table table-bordered">
            <tbody><tr>
                <th style={{width: '10px'}} scope="col">Id</th>
                    <th scope="col">id_user</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Tổng giá</th>
                    <th scope="col">Chức năng 
                   </th>
              </tr>
              {listOrder.map((el,index) => (
                        <tr key={index}>
                            <th scope="row">{el.id}</th>
                            <td>{el.id_user} </td>
                            <td>{el.name} </td>
                            <td>0{el.phonenumber} </td>
                            <td style={{color:colorStatus(el.status)}}>{textTrangThai(el.status)}</td>
                            <td>{formatMoney(el.total_price)}</td>
                            <td>
                                <Link to={'../admin/order/'+el.id}  className="btn btn-primary " >Sửa</Link>
                                <a   onClick={() => deleteOrder(el.id)}  className="btn btn-danger ml-2"  style={{marginLeft: '5px'}}>Xóa</a>
                            </td>
                        </tr>
                    ))}
            </tbody></table>
        </div>
        {/* /.box-body */}
        <div className="box-footer clearfix">
          <ul className="pagination pagination-sm no-margin pull-right">
            <li><a href="#">«</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul>
        </div>
      </div>
        </div>
    )
}

OrderAdmin.propTypes = {

}

export default OrderAdmin

