import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import apiRequest from '../../../../api/userApi';
import Swal from 'sweetalert2'
import SidebarInfo from './SidebarInfo';


function Doimatkhau(props) {
    var localUser = localStorage.getItem('user');
    const [user,setUser] = useState({});
    const { register, handleSubmit, watch, errors } = useForm();

    useEffect(() => {
        function getInfoUser(){
            try{
              if(localUser != null){
                var localUserParse = JSON.parse(localUser);
                setUser(localUserParse);
              }
            }catch(error){
              console.log(error);
            }
          }
          getInfoUser()
    }, [])
    
    function onSubmit(data){
        console.log(data)
        var localUserParse = JSON.parse(localUser);
        if ( data.oldpassword != localUserParse.password ){
            Swal.fire({
                    title: 'Mật khẩu cũ không chính xác',
                    icon: 'success',
                    showCancelButton: false,
                    times:1500,
            })
        }else if(data.password != data.password2){
            Swal.fire({
                title: 'Mật khẩu mới không trùng khớp',
                icon: 'success',
                showCancelButton: false,
                times:1500,
            })
        }else{
           apiRequest.updateUser(user.id,data)
            .then(function (response) {
            console.log(response);
            var responseJSON = JSON.stringify(response.data)
            localStorage.setItem('user',responseJSON);
            Swal.fire({
                title: 'Cập nhập thành công ',
                icon: 'success',
                showCancelButton: false,
                times:1500,
            })
            window.location.reload();
            })
            .catch(function (error) {
            console.log(error);
            })
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
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-7">
                       <div className="form-groud">
                           <label>Mật khẩu cũ</label>
                           <input type="password" name="oldpassword" ref={register({ required: true })} className="form-control"/>
                           {errors.oldpassword && <p style={{color:'red'}}>Hãy nhập mật khẩu cũ</p>}
                       </div>

                       <div className="form-groud">
                           <label>Mật khẩu mới</label>
                           <input type="password" name="password" ref={register({ required: true, minLength:5 })}  className="form-control"/>
                           {errors.password && <p style={{color:'red'}}>Hãy nhập mật khẩu mới và ít nhất 5 ký tự</p>}
                       </div>

                       <div className="form-groud">
                           <label>Nhập lại mật khẩu mới</label>
                           <input type="password" name="password2" ref={register({ required: true })}   className="form-control"/>
                           {errors.password2 && <p style={{color:'red'}}>Hãy nhập lại mật khẩu mới</p>}
                       </div>
                   
                     <button className="btn btn-primary offset-mr-5">Cập nhập</button>
                    </div>
                  </form>
                </div>

                </div>
            </div>
        </div>
    )
}

Doimatkhau.propTypes = {

}

export default Doimatkhau

