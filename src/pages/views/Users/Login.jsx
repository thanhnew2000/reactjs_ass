import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../api/userApi';




function Login(props) {
    const history = useHistory();

    if(localStorage.getItem('user') != null){
        history.push('../../');
    }
    // const [user,setUser] = useState({});
    const { register, handleSubmit, watch, errors } = useForm();
    function onSubmit (data){
        //  var target = event.target;
        // data.feature_image =  document.querySelector('#show_img').src
        apiRequest.checkLogin(data)
          .then(function (response) {
              if(response.data == '' || response.data == null){
                Swal.fire({
                    title: 'Tài khoản mật khẩu không chính xác',
                    icon: 'success',
                    showCancelButton: false,
                  })
              }else{
                  var userJson = JSON.stringify(response.data);
                  localStorage.setItem('user',userJson);
                  window.location.reload();

              }
          })
          .catch(function (error) {
            console.log(error);
          })

    }

    return (
        <div>
          <div className="container">
                <div className="col-sm-5">
                    <div className="signup-form">{/*sign up form*/}
                    <h2 className="text-center">Đăng nhập</h2>
                    <form action=""  onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Tài khoản" ref={register({ required: true })}  name="username" className="form-control" />
                        {errors.username && <p style={{color:'red'}}>Bạn chưa nhập tài khoản</p>}
                        <input type="password" placeholder="Mật khẩu" ref={register({ required: true })}  name="password" className="form-control" />
                        {errors.password && <p style={{color:'red'}}>Bạn chưa nhập mật khẩu</p>}
                        <button type="submit" className="btn btn-default" >Đăng nhập</button>
                    </form>
                    </div>{/*/sign up form*/}
                </div>
                </div>
        </div>
    )
}

Login.propTypes = {

}

export default Login

