import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/contactApi';

function EditContact({danhsach}) {
    const redColor = {color:'red'}
    const [valueInput,setValueInput] = useState({});
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    
    let { id }  = useParams();

    useEffect(() => {
        async function getListContact(){
          try{
            const {data} = await apiRequest.getContact(id)
            setValueInput(data);
          }catch(error){
            console.log(error);
          }
        }
        getListContact()
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
    function onSubmit (event){
         var target = event.target;
         let data = valueInput;
          apiRequest.updateContact(id,data)
          .then(function (response) {
            console.log(response);
            Swal.fire({
              title: 'Cập nhập thành công',
              icon: 'success',
              showCancelButton: false,
              times:1500,
            })
          })
          .catch(function (error) {
            console.log(error);
          })
    }


    function guiMail(data){
        console.log(data);
        data.id = id;
        apiRequest.replyMail(data)
        .then(function (response) {
          console.log(response);
          Swal.fire({
            title: 'Trả lời khách hàng thành công',
            icon: 'success',
            showCancelButton: false,
            times:1500,
          })
          // .then(function (response) {
          //    history.push('../../admin/contacts');
          // })
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    return (
        <div>
            <div className="col-md-7">
             <div className="box box-info  pull-right">
                <div className="box-header with-border">
                <h3 className="box-title">Chi tiết liên hệ</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" action=""  onSubmit={handleSubmit(onSubmit)}>
                <div className="box-body">
                    <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"  disabled name="email" value={valueInput.email}   placeholder="Tên sản phẩm" />
                    </div>
                    </div>
                  
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Họ tên</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control"disabled name="name" value={valueInput.name}  placeholder="Giá" />
                         </div>
                    </div>

               

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Nội dung</label>
                        <div className="col-sm-10">
                        <textarea type="text" className="form-control" name="content" disabled value={valueInput.content} placeholder="Mô tả chi tiết" />
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Trạng Thái</label>
                        <div className="col-sm-10">
                          <select name="status" onChange={onHandleChange} className="form-control">
                            <option value="1"  selected={valueInput.status == 1 ? 'true' : ''} >Chưa xem</option>
                            <option value="2"  selected={valueInput.status == 2 ? 'true' : ''}>Đã xem</option>
                          </select>
                         </div>
                    </div>
                </div>
                {/* /.box-body */}
                <div className="box-footer">
                    <button type="submit" className="btn btn-info pull-right">Cập nhập</button>
                </div>
                {/* /.box-footer */}
                </form>




                </div>

                <div className="box box-info  pull-right">
                <form className="form-horizontal" action=""  onSubmit={handleSubmit(guiMail)}>
                    <div className="box-body">
                            <input type="hidden" className="form-control"  ref={register}  name="emailNguoiGui" value={valueInput.email}  />
                            <input type="hidden" className="form-control"   ref={register} name="nameNguoiGui" value={valueInput.name}  placeholder="Giá" />
                        <div className="form-group">
                            <label htmlFor="inputPassword3" className="col-sm-2 control-label">Trả lời</label>
                            <div className="col-sm-10">
                            <textarea type="text" className="form-control" ref={register} name="contentZep"  placeholder="Tră lời email" />
                         {errors.contentZep && <p style={{color:'red'}}>Hãy nội dung trả lời</p>}
                            </div>
                        </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                        <button type="submit" className="btn btn-info pull-right">Gửi</button>
                    </div>
                {/* /.box-footer */}
                </form>
            </div>
            </div>
            
      
        </div>
    )
}

EditContact.propTypes = {

}

export default EditContact

