import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import apiRequest from '../../../../api/orderApi';
import Swal from 'sweetalert2'
import SidebarInfo from '../Info/SidebarInfo';


function OrderClient(props) {
    var localUser = localStorage.getItem('user');
    const [user,setUser] = useState({});
    const [orders,setOrders] = useState([]);

    useEffect(() => {
       async function getInfoUser(){
            try{
              if(localUser != null){
                var localUserParse = JSON.parse(localUser);
                setUser(localUserParse);
                const {data} = await apiRequest.getAllOrderUser(localUserParse.id);
                setOrders(data)
              }
            }catch(error){
              console.log(error);
            }
          }
          getInfoUser()
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
                <div className="box-body table-responsive no-padding">
                <table className="table table-bordered">
                 <tbody><tr>
                <th style={{width: '10px'}} scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Tổng giá</th>
                    <th scope="col">Chức năng </th>
              </tr>
                    {orders.map((el,index) => (
                                <tr key={index}>
                                    <th scope="row">{el.id}</th>
                                    <td>{el.name} </td>
                                    <td>{el.phonenumber} </td>
                                    <td style={{color:colorStatus(el.status)}}>{textTrangThai(el.status)}</td>
                                    <td>{el.total_price}</td>
                                    <td>
                                        <Link to={'../../thongtincanhan/order/'+el.id}  className="btn btn-light">Chi tiết</Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody></table>
                           </div>
                </div>

                </div>
            </div>
        </div>
    )
}

OrderClient.propTypes = {

}

export default OrderClient

