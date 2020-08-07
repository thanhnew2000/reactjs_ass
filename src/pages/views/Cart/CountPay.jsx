import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import apiRequest from '../../../api/orderApi';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';

function CountPay(props) {
    var localUser = localStorage.getItem('user');
    const [user,setUser] = useState({});
    const cartJson = localStorage.getItem('cart');
    const [arrayCart, setarrayCart] = useState(JSON.parse(cartJson))
    const [totalPrice, setTotalPrice] = useState(0)
    const history = useHistory();

    useEffect(() => {
        function getInfoUser(){
            try{
              if(localUser != null){
                var localUserParse = JSON.parse(localUser);
                setUser(localUserParse);
                let total_weight = arrayCart.reduce((total, value ,index) => {
                    return total += (value.price * value.number)
                }, 0)
                setTotalPrice(total_weight);

              }
            }catch(error){
              console.log(error);
            }
          }
          getInfoUser()
        }, []);


        function onSubmit (event){
            apiRequest.createOrder(user.id,totalPrice,JSON.parse(cartJson))
              .then(function (response) {
                  console.log(response)
                    Swal.fire({
                        title: response.data,
                        icon: 'success',
                        showCancelButton: false,
                      })
                  localStorage.removeItem('cart');
                  history.push('../../thankyou');

              })
              .catch(function (error) {
                console.log(error);
              })
           }
        return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="list-group border-warning">
                            <div className="list-group-item list-group-item-warning">
                            Thông tin người nhận
                            </div>
                             <p>Địa chỉ : {user.address}</p>
                             <p>Số điện thoại : {user.phone_number}</p>
                         </div>

                        <div className="list-group border-warning">
                            <div className="list-group-item list-group-item-warning">
                            Phương thức thanh toán
                            </div>
                            <input type="checkbox" checked/> Thanh toán khi nhận hàng
                        </div>

                        <div className="list-group border-warning">
                            <div className="list-group-item list-group-item-warning">
                            Tổng chi phí
                            </div>
                           <p> Tổng sản phẩm : {totalPrice}.đ </p>
                           <p>Phí vận chuyển : 45,000.đ</p>
                           <p>Tổng thanh toán : {totalPrice + 45000}.đ</p>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                    <table className="table table-hover warning">
                         <thead style={{background:'#f9f0d1'}}>
                            <tr>
                                <th scope="col">Mã</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Giá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {arrayCart.map((el,index)=>(
                                    
                                <tr key={index}>
                                    <th scope="row">{el.id}</th>
                                    <td><img src={el.feature_image} width="50px" /></td>
                                    <td>{el.name_product}</td>
                                    <td>{el.number}</td>
                                    <td>{el.price}</td>
                                </tr>
                                
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-11"></div>
                <div className="col-md-1"><button onClick={onSubmit} className="btn btn-primary ">Xác nhận</button></div>
            </div>
        </div>
    )
}

CountPay.propTypes = {

}

export default CountPay

