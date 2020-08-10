import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/orderApi';

function EditOrder({danhsach}) {
    const redColor = {color:'red'}
    const [valueInput,setValueInput] = useState({});
    const [orderDetails,setOrderDetails] = useState([]);
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    
    let { id }  = useParams();
    useEffect(() => {
        async function getListOrders(){
          try{
            const {data} = await apiRequest.getOne(id)
            setValueInput(data);
          }catch(error){
            console.log(error);
          }
        }
        getListOrders()
      }, []);

      useEffect(() => {
        async function getListOrdersDetals(){
          try{
            const {data} = await apiRequest.getOrderDetails(id)
            setOrderDetails(data);
          }catch(error){
            console.log(error);
          }
        }
        getListOrdersDetals()
      }, []);
    // console.log(productEdit);
    const onHandleChange = (e) => {
        const {name,value} = e.target
        setValueInput({
            ...valueInput,
            [name]:value
        })
    }
    // const onSubmit = data => console.log(data);
    function onSubmit (data){
          apiRequest.updateStatus(id,data)
          .then(function (response) {
            console.log(response);
            Swal.fire({
              title: 'Cập nhập thành công',
              icon: 'success',
              showCancelButton: false,
              times:1500,
            }).then(function (response) {
               history.push('../../admin/order');
            })
          })
          .catch(function (error) {
            console.log(error);
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
            <div className="col-md-12">
             <div className="box box-info  pull-right">
                <div className="box-header with-border">
                <h3 className="box-title">Sửa đơn hàng</h3>
                </div>
                    <div className="row">
                    <div className="col-md-6">
                    <ul className="list-group">
                        <li className="list-group-item"><b>Mã đơn hàng</b> : {valueInput.id_user} </li>
                        <li className="list-group-item"><b>Ngày đặt đơn</b> : {valueInput.order_date}  </li>
                        <li className="list-group-item">
                        <b> Trạng thai</b>:

                            <form className="form-horizontal" action=""  onSubmit={handleSubmit(onSubmit)}>
                                <select name="status" ref={register} className="form-control">
                                    <option value="1" style={{color:'red'}} selected={valueInput.status == 1 ? 'true' : ''} >Chờ xác nhận đơn</option>
                                    <option value="2" style={{color:'blue'}} selected={valueInput.status == 2 ? 'true' : ''}>Đã chốt đơn</option>
                                    <option value="3" style={{color:'blue'}}  selected={valueInput.status == 3 ? 'true' : ''}>Đang giao hàng</option>
                                    <option value="4" style={{color:'green'}}  selected={valueInput.status == 4 ? 'true' : ''}>Hoàn thành</option>
                                </select>
                                <div className="box-footer">
                                        <button type="submit" className="btn btn-info pull-right">Cập nhập</button>
                                </div>
                            </form>

                        </li>
                    </ul>
                    </div>
                    <div className="col-md-6">
                    <ul className="list-group">
                        <li className="list-group-item"><b>Thông tin người nhận</b></li>
                        <li className="list-group-item">
                            <p>Tên : {valueInput.name} </p>
                            <p>Số điện thoại : 0{valueInput.phonenumber}</p>
                            <p>Địa chỉ : {valueInput.address}</p>
                        </li>
                    
                    </ul>
                    </div>
                    </div>
                   <br/>
                    <div className="row mt-2">
                        <div className="col-md-11">
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
                                {orderDetails.map((el,index)  => (
                                <tr key={index}>
                                <td>{el.id}</td>
                                <td>{el.id_product}</td>
                                <td>{el.name_product}</td>
                                <td>{formatMoney(el.price_each)}</td>
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
    )
}

EditOrder.propTypes = {

}

export default EditOrder

