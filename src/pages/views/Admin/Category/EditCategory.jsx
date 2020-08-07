import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/cateApi';

function EditCategory(props) {
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
        async function getListCate(){
          try{
            const {data} = await apiRequest.getCate(id)
            setValueInput(data);
          }catch(error){
            console.log(error);
          }
        }
        getListCate()
      }, []);

    // const onSubmit = data => console.log(data);
    function onSubmit (event){
         let data = valueInput;
         data.image =  document.querySelector('#show_img').src
         console.log(data);
         apiRequest.updateCate(id,data)
          .then(function (response) {
            console.log(response);
            Swal.fire({
                title: 'Cập nhập thành công ',
                icon: 'success',
                showCancelButton: false,
                times:1500,
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
                <h3 className="box-title">Sửa danh mục</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" action=""  onSubmit={handleSubmit(onSubmit)}>
                <div className="box-body">
                    <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Danh mục </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" ref={register({ required: true  , minLength:2, pattern:/^[^\s].*/  })} name="name_category" value={valueInput.name_category}  onChange={onHandleChange} placeholder="Tên danh mục" />
                        {errors.name_category && <p style={redColor}>Bạn chưa nhập danh mục và ít nhất 2 ký tự</p>}
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Ảnh</label>
                        <div className="col-sm-10">
                        <input  type="file" name="image" onChange={loadImageFileAsURL} id="images" />
                        {/* <input type="text" className="form-control"  ref={register({ required: true })} name="image" onChange={onHandleChange} placeholder="Ảnh danh mục" /> */}
                        {errors.image && <p style={redColor}>Bạn chưa nhập ảnh</p>}
                       
                         </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Cấp bậc</label>
                        <div className="col-sm-10">
                          <select classname="form-control" onChange={onHandleChange} name="cap_cate">
                            <option value={1}   selected={valueInput.cap_cate == 1 ? 'true' : ''} >Bậc 1</option>
                            <option value={2}  selected={valueInput.cap_cate == 2 ? 'true' : ''} >Bậc 2</option>
                          </select>
                        {errors.cap_cate && <p style={redColor}>Chưa chọn danh mục</p>}
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
            <div className="col-md-4">   
                   <div className="box box-info  pull-right">
                     <img src={valueInput.image} id="show_img" width="300px" />
                  </div>
            </div>
        </div>
    )
}

EditCategory.propTypes = {

}

export default EditCategory

