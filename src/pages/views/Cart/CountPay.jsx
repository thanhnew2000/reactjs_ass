import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import apiRequest from '../../../api/orderApi';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import functionAddCart from '../Cart/functionAddCart'

function CountPay(props) {
    var localUser = localStorage.getItem('user');
    if(localUser == null){
        Swal.fire({
            title: 'Bạn hãy đăng nhập tài khoản',
            icon: 'success',
            showCancelButton: false,
        }).then(() =>{
            history.push('../../dangnhap');
        })
    }


    const [user,setUser] = useState({});
    const [addressTo,setAddressTo] = useState('');
    const [nameTo,setNameTo] = useState('');
    const [phoneTo,setPhoneTo] = useState(0);
    const cartJson = localStorage.getItem('cart');
    const [arrayCart, setarrayCart] = useState(JSON.parse(cartJson))
    const [totalPrice, setTotalPrice] = useState(0)
    const history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm();

    useEffect(() => {
        function getInfoUser(){
            try{
              if(localUser != null){
                var localUserParse = JSON.parse(localUser);
                setUser(localUserParse);
                setAddressTo(localUserParse.address)
                setNameTo(localUserParse.name)
                setPhoneTo('0'+localUserParse.phone_number)
                let total_weight = arrayCart.reduce((total, value ,index) => {
                    return total += (value.price * value.number)
                }, 0)
                setTotalPrice(total_weight);

                 functionAddCart.countCart()

              }
            }catch(error){
              console.log(error);
            }
          }
          getInfoUser()
        }, []);


        function onSubmit (event){
            apiRequest.createOrder(user.id,totalPrice,nameTo,addressTo,phoneTo,JSON.parse(cartJson))
              .then(function (response) {
                  if(response.data == 'Ok'){
                        Swal.fire({
                            title: ' Đặt hàng thành công ',
                            icon: 'success',
                            showCancelButton: false,
                        })
                    localStorage.removeItem('cart');
                    functionAddCart.countCart()
                    history.push('../../thankyou');
                }else{
                    Swal.fire({
                        title: response.data,
                        icon: 'success',
                        showCancelButton: false,
                    })
                }
              })
              .catch(function (error) {
                console.log(error);
              })
           }

           const [styleShowFormChange,setShowFormChange] = useState({display:'none'});
           function submitChangeAdress(data){
            setAddressTo(data.addressChange)
            setPhoneTo(data.phoneChange)
            setNameTo(data.nameChange)
            setShowFormChange({display:'none'})

           }
           
           function showFormChange(){
            setShowFormChange({display:'block'})
           }

           function formatMoney(price) {
            return new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price);
          }
    
        return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="list-group border-warning">
                            <div className="list-group-item list-group-item-warning">
                            Thông tin người nhận
                            <button onClick={showFormChange}  className="ml-5"> Thay đổi</button>
                            </div>
                             <p>Tên người nhận: {nameTo}</p>
                             <p>Địa chỉ : {addressTo}</p>
                             <p>Số điện thoại : {phoneTo}</p>
                             <div style={styleShowFormChange} >
                            <form action="" onSubmit={handleSubmit(submitChangeAdress)}>
                                <p>Tên người nhận :  <input type="text" ref={register({ required: true})} name="nameChange"/></p>
                                <p>Địa chỉ mới :  <input type="text" ref={register({ required: true})} name="addressChange"/></p>
                                <p>Số điện thoại mới : <input type="number"  ref={register}  name="phoneChange" /></p>
                                <button type="submit" className="btn btn-primary">Chuyển đến địa chỉ này</button>
                             </form>
                             </div>
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
                           <p> Tổng sản phẩm : {formatMoney(totalPrice)} </p>
                           <p>Phí vận chuyển : 45.000 đ</p>
                           <p>Tổng thanh toán : {formatMoney(totalPrice + 45000)}</p>
                            
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
                                    <td>{formatMoney(el.price)}</td>
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

