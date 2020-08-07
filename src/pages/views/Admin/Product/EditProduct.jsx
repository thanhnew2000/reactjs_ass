import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/productApi';
import { Editor } from '@tinymce/tinymce-react';
function EditProduct({danhsach}) {
    const redColor = {color:'red'}
    const [valueInput,setValueInput] = useState({});
    const [motaChiTiet,setmotaChiTiet] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    
    let { id }  = useParams();

    useEffect(() => {
        async function getListProduct(){
          try{
            const {data} = await apiRequest.get(id)
            setValueInput(data);
            setmotaChiTiet(data.information);
            console.log(data.information)
          }catch(error){
            console.log(error);
          }
        }
        getListProduct()
      }, []);
    // console.log(productEdit);
    const onHandleChange = (e) => {
        const {name,value} = e.target
        setValueInput({
            ...valueInput,
            [name]:value
        })
    }
    const onInfoChange = (content, editor) => {
      setmotaChiTiet(content.level.content);
    }
    // const onSubmit = data => console.log(data);
    function onSubmit (event){
         var target = event.target;
         let data = valueInput;
          data.feature_image =  document.querySelector('#show_img').src;
          data.information = motaChiTiet;
          apiRequest.update(id,data)
          .then(function (response) {
            console.log(response);
            Swal.fire({
              title: 'Cập nhập thành công ',
              icon: 'success',
              showCancelButton: false,
              times:1500,
            }).then(function (response) {
               history.push('../../admin/products');
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
          <div className="row">
            <div className="col-md-7">
             <div className="box box-info  pull-right">
                <div className="box-header with-border">
                <h3 className="box-title">Sửa sản phẩm</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" action=""  onSubmit={handleSubmit(onSubmit)}>
                <div className="box-body">
                    <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Tên sản phẩm</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" ref={register({ required: true, minLength:5 , pattern:/^[^\s].*/  })} name="name_product" value={valueInput.name_product}  onChange={onHandleChange} placeholder="Tên sản phẩm" />
                        {errors.name_product && <p style={{color:'red'}}>Tên không được để trống và phải trên 5 kí tự</p>}
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Ảnh</label>
                        <div className="col-sm-10">
                        <input  type="file" name="feature_image" onChange={loadImageFileAsURL} id="images" />
                        {/* <input type="text" className="form-control"  ref={register({ required: true })} name="feature_image"   onChange={onHandleChange} placeholder="Ảnh sản phẩm" /> */}
                       
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Số lượng</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" ref={register({ required: true })} name="quantity" value={valueInput.quantity} onChange={onHandleChange} placeholder="Giá" />
                        {errors.quantity && <p style={{color:'red'}}>Bạn chưa nhập số lượng</p>}
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Price</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" ref={register({ required: true })} name="price" value={valueInput.price} onChange={onHandleChange} placeholder="Giá" />
                        {errors.price && <p style={{color:'red'}}>Bạn chưa nhập giá</p>}
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Mô tả ngắn:</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" ref={register({ required: true })} name="short_description" value={valueInput.short_description} onChange={onHandleChange} placeholder="Mô tả ngắn" />
                        {errors.short_description && <p style={{color:'red'}}>Chưa nhập mô tả</p>}
                         </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Danh mục</label>
                        <div className="col-sm-10">
                          <select className="form-control" name="id_category" >
                            {danhsach.map(el => (
                                 <option selected={el.id == valueInput.id_category} value={el.id}>{el.name_category} </option>
                            ))}
                          </select>
                        {errors.id_category && <p style={{color:'red'}}>Chưa chọn danh mục</p>}
                         </div>
                    </div>


                    
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Mô tả chi tiết</label>
                        {/* <div className="col-sm-10"> */}
                        {/* <textarea type="text" className="form-control" name="information" value={valueInput.information} onChange={onHandleChange} placeholder="Mô tả chi tiết" /> */}
                         {/* </div> */}
                      <Editor value={motaChiTiet}  onChange={onInfoChange} />
                       
                    <div>
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
                     <img id="show_img" src={valueInput.feature_image} width="300px" />
                  </div>
            </div>
        </div>
        </div>
    )
}

EditProduct.propTypes = {

}

export default EditProduct

