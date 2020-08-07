import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import apiRequest from '../../../../api/cateApi';

function AddCategory(props) {
    const redColor = {color:'red'}

    const [valueInput,setValueInput] = useState({});
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();

    const onHandleChange = (e) => {
        const {name,value} = e.target
        setValueInput({
            ...valueInput,
            [name]:value
        })
    }
    // const onSubmit = data => console.log(data);
    function onSubmit (data){
         console.log(data);
        data.image =  document.querySelector('#show_img').src
         apiRequest.createCate(data)
          .then(function (response) {
            Swal.fire({
                title: 'Thêm mới thành công ',
                icon: 'success',
                showCancelButton: false,
              }).then(function (response) {
                 history.push('../../admin/danhmuc');
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
                        <input type="text" className="form-control" ref={register({ required: true , minLength:2, pattern:/^[^\s].*/  })} name="name_category"  onChange={onHandleChange} placeholder="Tên sản phẩm" />
                        {errors.name_category && <p style={redColor}>Bạn chưa nhập tên danh mục và ít nhất 2 ký tự</p>}
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Ảnh</label>
                        <div className="col-sm-10">
                        <input  type="file" name="image" onChange={loadImageFileAsURL} id="images" />
                        {/* <input type="text" className="form-control"  ref={register({ required: true })} name="image" onChange={onHandleChange} placeholder="Ảnh sản phẩm" /> */}
                        {errors.image && <p style={redColor}>Bạn chưa nhập ảnh</p>}
                       
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Cấp bậc</label>
                        <div className="col-sm-10">
                                <select className="form-control" onChange={onHandleChange} ref={register({ required: true })}  name="cap_cate" >
                                <option value='' > Chọn bậc</option>
                                <option value={1}>Bậc 1</option>
                                 <option value={2}>Bậc 2</option>
                                </select>
                        {errors.cap_cate && <p style={redColor}>Chưa chọn danh mục</p>}
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

            <div className="col-md-4">   
                   <div className="box box-info  pull-right">
                     <img src={valueInput.image} id="show_img"   width="300px" />
                  </div>
            </div>

        </div>
    )
}

AddCategory.propTypes = {

}

export default AddCategory

