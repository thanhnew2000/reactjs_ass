import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/postCateApi';

function EditCatePost(props) {
    const redColor = {color:'red'}
    const [valueInput,setValueInput] = useState({});
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    
    let { id }  = useParams();
    // console.log(productEdit);
    const onHandleChange = (e) => {
        const {name,value} = e.target
        console.log(value)
        setValueInput({
            ...valueInput,
            [name]:value
        })
    }

    useEffect(() => {
        async function getDataOneCate(){
          try{
            const {data} = await apiRequest.getOneCate(id)
            setValueInput(data);
            console.log(data);
          }catch(error){
            console.log(error);
          }
        }
        getDataOneCate()
      }, []);

    // const onSubmit = data => console.log(data);
    function onSubmit (data){
        //  let data = valueInput;
         apiRequest.updateCatePost(id,data)
          .then(function (response) {
            console.log(response);
            Swal.fire({
                title: 'Cập nhập thành công ',
                icon: 'success',
                showCancelButton: false,
                times:1500,
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
                <h3 className="box-title">Sửa danh mục bài viết</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" action=""  onSubmit={handleSubmit(onSubmit)}>
                <div className="box-body">
                    <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Tên danh mục </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" ref={register({ required: true  , minLength:2, pattern:/^[^\s].*/  })} name="name_cate" value={valueInput.name_cate}  onChange={onHandleChange} placeholder="Tên danh mục" />
                        {errors.name_cate && <p style={redColor}>Bạn chưa nhập danh mục và ít nhất 2 ký tự</p>}
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
            </div>
    
        </div>
    )
}

EditCatePost.propTypes = {

}

export default EditCatePost

