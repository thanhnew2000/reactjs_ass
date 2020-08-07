import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import apiRequest from '../../../../api/userApi';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import SideBar from '../../../../components/admin/SideBar';
import SidebarInfo from './SidebarInfo';

function Info(props) {
    var localUser = localStorage.getItem('user');
   
    const [user,setUser] = useState({});
    const { register, handleSubmit, watch, errors } = useForm();
    const [valueInput,setValueInput] = useState({});

    const history = useHistory();
    if(localUser == null){
        history.push('../../');
    }
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
        }, []);

    function onSubmit(data){
        console.log(user.id);
            data.avatar =  document.querySelector('#show_img').src
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

    const onHandleChange = (e) => {
        const {name,value} = e.target
        setUser({
            ...user,
            [name]:value
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
            <div className="row">
            <div className="col-md-3">
                 <div className="mt-5">
                  <SidebarInfo/>
               </div>
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-4">
                          <img id="show_img" src={user.avatar}
                           width="250px"/>
                    </div>
                    <form action=""  onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-7">
                       <div className="form-groud">
                           <label>Họ tên</label>
                           <input text="text" name="name" ref={register({ required: true})}  value={user.name} onChange={onHandleChange} className="form-control"/>
                           {errors.name && <p style={{color:'red'}}>Bạn chưa nhập tài khoản</p>}
                       </div>

                       <div className="form-groud">
                           <label>Số điện thoại</label>
                           <input text="number" name="phone_number" ref={register({ required: true, minLength:5 })}  value={user.phone_number} onChange={onHandleChange} className="form-control"/>
                           {errors.number && <p style={{color:'red'}}>Bạn chưa nhập số điện thoại</p>}
                       </div>

                       <div className="form-groud">
                           <label>Địa chỉ</label>
                           <input text="text" name="address" ref={register({ required: true})}  value={user.address} onChange={onHandleChange} className="form-control"/>
                           {errors.address && <p style={{color:'red'}}>Bạn chưa điền địa chỉ và ít nhất 3 ký tự </p>}
                       </div>

                       <div className="form-groud">
                        <label>Image</label>
                           <input  type="file" name="image"   className="form-control" onChange={loadImageFileAsURL} id="images" />
                       </div>
                     <button className="btn btn-primary offset-mr-5">Cập nhập</button>
                    </div>
                  </form>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

Info.propTypes = {

}

export default Info

