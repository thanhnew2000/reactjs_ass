import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../api/userApi';




function Register(props) {
    const history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm();
    function onSubmit (data){
        //  var target = event.target;
        data.avatar =  document.querySelector('#show_img').src
        apiRequest.createUser(data)
          .then(function (response) {
            Swal.fire({
                title: 'Tạo tài khoản thành công ',
                icon: 'success',
                showCancelButton: false,
              }).then(function (response) {
                 history.push('../../dangnhap');
              })
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    const loadImageFileAsURL = (e) => {
      var file = e.target
      var fileSelected = file.files;
      if(fileSelected.length > 0 ){
          var fileToLoad = fileSelected[0];
          var fileReader = new FileReader();
          fileReader.onload= function(fileloadEvent){
          var srcData= fileloadEvent.target.result;
          document.querySelector('#show_img').src=srcData
          }
          fileReader.readAsDataURL(fileToLoad);
      }
  }


    return (
        <div>
          <div className="container">
                <div className="col-sm-5">
                <img src="" hidden  id="show_img" />

                    <div className="signup-form">{/*sign up form*/}
                    <h2 className="text-center">Đăng kí</h2>
                    <form action=""  onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Họ và tên" ref={register({ required: true, minLength:3 })}  name="name" className="form-control"/>
                        {errors.name && <p style={{color:'red'}}>Hãy nhập đầy họ tên ít nhất 3 ký tự</p>}
                        <input type="text" placeholder="Tài khoản" ref={register({ required: true, minLength:5 , pattern:/^[^\s].*/ })}  name="username" className="form-control" />
                        {errors.username && <p style={{color:'red'}}>Hãy nhập tài khoản ít nhất 5 ký tự </p>}
                        <input type="password" placeholder="Mật khẩu" ref={register({ required: true, minLength:5, pattern:/^[^\s].*/  })}  name="password" className="form-control" />
                        {errors.password && <p style={{color:'red'}}>Hãy nhập mật khẩu ít nhất 5 ký tự </p>}
                        <input type="number" placeholder="Số điện thoại" ref={register({ required: true, minLength:5 })} name="phone_number" className="form-control" />
                        {errors.phone_number && <p style={{color:'red'}}>Hãy nhập số điện thoại</p>}
                        {/* <input type="text" placeholder="Avatar"  ref={register} name="avatar" className="form-control" /> */}
                        <input  type="file" name="image"   className="form-control" onChange={loadImageFileAsURL} id="images" />
                        <input type="text" placeholder="From" ref={register({ required: true, minLength:5 })}  name="address" className="form-control" />
                        {errors.address && <p style={{color:'red'}}>Hãy nhập địa chỉ</p>}
                        <button type="submit" className="btn btn-default" >Đăng kí</button>
                    </form>
                    </div>{/*/sign up form*/}
                </div>
                </div>
        </div>
    )
}

Register.propTypes = {

}

export default Register

