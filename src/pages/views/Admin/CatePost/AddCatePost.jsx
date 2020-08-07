import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import apiRequest from '../../../../api/postCateApi';

function AddCatePost(props) {
    const redColor = {color:'red'}
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    // const onSubmit = data => console.log(data);
    function onSubmit (data){
         console.log(data);
         apiRequest.createCatePost(data)
          .then(function (response) {
            Swal.fire({
                title: 'Thêm mới thành công ',
                icon: 'success',
                showCancelButton: false,
              }).then(function (response) {
                 history.push('../../admin/catePost');
              })
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
                <h3 className="box-title">Thêm mới danh mục</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" action=""  onSubmit={handleSubmit(onSubmit)}>
                <div className="box-body">
                    <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Tên danh mục</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" ref={register({ required: true , minLength:2, pattern:/^[^\s].*/  })} name="name_cate"  placeholder="Tên sản phẩm" />
                        {errors.name_cate && <p style={redColor}>Nhập tên danh mục và ít nhất 2 ký tự  </p>}
                    </div>
                    </div>
                </div>
                {/* /.box-body */}
                <div className="box-footer">
                    <button type="submit" className="btn btn-info pull-right">Thêm mới</button>
                </div>
                {/* /.box-footer */}
                </form>
                </div>
            </div>

        </div>
    )
}

AddCatePost.propTypes = {

}

export default AddCatePost

