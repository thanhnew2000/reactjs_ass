import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/userApi';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

function EditAccount(props) {
    const [account,setAccount] = useState({});
    const history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm();

    let { id }  = useParams();
    useEffect(() => {
        async function getOnlyOneAccount(){
          try{
            const {data} = await apiRequest.get(id);
            console.log(data)
            setAccount(data);
          }catch(error){
            console.log(error);
          }
        }
        getOnlyOneAccount()
      }, []);


      function onSubmit (data){
         apiRequest.updateUser(id,data)
         .then(function (response) {
           console.log(response);
           Swal.fire({
             title: 'Cập nhập thành công ',
             icon: 'success',
             showCancelButton: false,
             times:1500,
           }).then(function (response) {
              history.push('../../admin/tai-khoan');
           })
         })
         .catch(function (error) {
           console.log(error);
         })
   }

    return (
        <div>
            <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <h2>Thông tin tài khoản</h2>
                        <ul class="list-group">
                            <li class="list-group-item">Tên : {account.name}</li>
                            <li class="list-group-item">Tài khoản : {account.username}</li>
                            <li class="list-group-item">Số điện thoại : {account.phone_number}</li>
                            <li class="list-group-item">Địa chỉ : {account.address}</li>
                        </ul>
                        </div>
                 </div>
          
                <div className="row">
                        <form action=""  onSubmit={handleSubmit(onSubmit)}>
                               <div className="col-md-2">
                                    <div className="form-group">
                                            <label htmlFor="" >Role</label>
                                            <select name="roles" ref={register} className="form-control">
                                            <option value="1" selected={account.roles == 1 ? 'true' : ''}>Khách hàng</option>
                                            <option value="2" selected={account.roles == 2 ? 'true' : ''} >Quản trị</option>
                                            </select>
                                    </div>
                                </div>
                            <div className="col-md-12">
                                <button type="submit" className=" float-right btn btn-primary">Cập nhập</button>
                            </div>
                    </form>
                    </div>
            </div>
        </div>
    )
}

EditAccount.propTypes = {

}

export default EditAccount

