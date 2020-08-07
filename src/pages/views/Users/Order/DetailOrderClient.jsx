import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom';
import apiRequest from '../../../../api/orderApi';
import Swal from 'sweetalert2'
import SidebarInfo from '../Info/SidebarInfo';


function DetailOrderClient(props) {
    var localUser = localStorage.getItem('user');
    const [user,setUser] = useState({});
    const [orders,setOrders] = useState({});
    const [listOrdersDetail,setOrdersDetail] = useState([]);
    let { id }  = useParams();

    useEffect(() => {
      async function getOrderFromId(){
           try{
               const {data} = await apiRequest.getOne(id);
               setOrders(data)
           }catch(error){
             console.log(error);
           }
         }
         getOrderFromId()
   }, [])

    useEffect(() => {
       async function getOrderDetailsOfIdOrder(){
            try{
                const {data} = await apiRequest.getOrderDetails(id);
                setOrdersDetail(data)
            }catch(error){
              console.log(error);
            }
          }
          getOrderDetailsOfIdOrder()
    }, [])

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

    return (
        <div>
            <div className="container">
                <div className="row">
                <div className="col-md-3">
                        <div className="mt-5">
                        <SidebarInfo/>
                      </div>
                </div>
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item"><b>Chi tiết đơn hàng </b></li>
                          <li class="list-group-item">Mã đơn hàng:  {orders.id}</li>
                          <li class="list-group-item">Ngày đặt hàng: {orders.order_date}</li>
           
                      </ul>
                      </div>
                      <div>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item"><b>Tình trạng vận chuyển</b></li>
                          <li class="list-group-item">Nhà vận chuyển:<b>Chuyển phát tiêu chuẩn </b> </li>
                          <li class="list-group-item">Tình trạng: <span style={{color:colorStatus(orders.status)}}>{textTrangThai(orders.status)}</span></li>
                      </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <div>
                    <ul class="list-group list-group-flush">
                          <li class="list-group-item"><b>Thông tin đơn hàng</b></li>
                          <li class="list-group-item">Họ tên người nhận : {orders.name}  </li>
                          <li class="list-group-item">Địa chỉ: {orders.address}</li>
                      </ul>
                   </div>

                   <div>
                    <ul class="list-group list-group-flush">
                          <li class="list-group-item"><b>Tổng tiền thanh toán</b></li>
                          <li class="list-group-item">Tổng tiền:  {orders.total_price}.đ  </li>
                      </ul>
                   </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                    <div className="box-body table-responsive no-padding">
                            <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th>Mã đơn chi tiết</th>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Gía sản phẩm</th>
                                    <th>Số lượng</th>
                                </tr>
                                {listOrdersDetail.map((el,index)  => (
                                <tr key={index}>
                                <td>{el.id}</td>
                                <td>{el.id_product}</td>
                                <td>{el.name_product}</td>
                                <td>{el.price_each}</td>
                                <td><span className="label label-success">{el.quantity_product}</span></td>
                                </tr>
                                ))}
                                
                            </tbody>
                            </table>
                           </div>
                    </div>
                  </div>

                </div>

                </div>
            </div>
        </div>
    )
}

DetailOrderClient.propTypes = {

}

export default DetailOrderClient

