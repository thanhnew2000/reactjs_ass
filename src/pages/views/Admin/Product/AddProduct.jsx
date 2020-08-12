import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/productApi';
import { Editor } from '@tinymce/tinymce-react';
import firebase  from '../../../../api/fiseBase/index'
function AddProduct({danhsach}) {
    const redColor = {color:'red'}
    const [valueInput,setValueInput] = useState({});
    const [motaChiTiet,setmotaChiTiet] = useState('');
    const [price_Sale,setprice_Sale] = useState(0);
    const [image,setImage] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();

    const changeOldPrice = (e) => {
        const {value} = e.target
        setprice_Sale(value)
    }



    const onInfoChange = (content, editor) => {
        setmotaChiTiet(content.level.content);
      }

    function onSubmit (data){
        let file = data.feature_image[0];
        let storogeUrl=firebase.storage().ref(`images/${file.name}`);
        let uploadTask = storogeUrl.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);


        firebase.storage().ref().child(`images/${file.name}`).getDownloadURL().then((url)=>{
            data.feature_image = url;
            data.information = motaChiTiet;
            apiRequest.create(data)
            .then(function (response) {
                Swal.fire({
                    title: 'Thêm mới thành công ',
                    icon: 'success',
                    showCancelButton: false,
                }).then(function (response) {
                    history.push('../../admin/products');
                })
            })
        })

        //  var target = event.target;
        
        // data.feature_image =  document.querySelector('#show_img').src;
        // data.information = motaChiTiet;
        // apiRequest.create(data)
        //   .then(function (response) {
        //     Swal.fire({
        //         title: 'Thêm mới thành công ',
        //         icon: 'success',
        //         showCancelButton: false,
        //       }).then(function (response) {
        //          history.push('../../admin/products');
        //       })
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })
    }

    
    const loadImageFileAsURL = (e) => {
        // console.log(e)
        //         document.querySelector('#show_img').src= e.target.value

        // var file = e.target
        // var fileSelected = file.files;
        // if(fileSelected.length > 0 ){
        //     var fileToLoad = fileSelected[0];
        //     var fileReader = new FileReader();
        //     fileReader.onload= function(fileloadEvent){
        //         var srcData= fileloadEvent.target.result;
        //         document.querySelector('#show_img').src=srcData
        //     }
        //     fileReader.readAsDataURL(fileToLoad);
        // }
    }
    return (
        <div>
            <div className="row">
            <div className="col-md-7">
             <div className="box box-info  pull-right">
                <div className="box-header with-border">
                <h3 className="box-title">Thêm mới sản phẩm</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" action=""  onSubmit={handleSubmit(onSubmit)}>
                <div className="box-body">
                    <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Tên sản phẩm</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" ref={register({ required: true, minLength:5 , pattern:/^[^\s].*/   })} name="name_product"  placeholder="Tên sản phẩm" />
                        {errors.name_product && <p style={{color:'red'}}>Tên không được để trống và phải trên 5 kí tự</p>}
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Ảnh</label>
                        <div className="col-sm-10">
                        <input  type="file" name="feature_image"  ref={register({ required: true })} 
                        // onChange={loadImageFileAsURL}
                         id="images" />

                        {/* <input type="text" className="form-control"  ref={register({ required: true })} name="feature_image"  placeholder="Ảnh sản phẩm" /> */}
                        {errors.feature_image && <p style={{color:'red'}}>Bạn chưa nhập ảnh</p>}
                       
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Số lượng</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" ref={register({ required: true })} name="quantity" placeholder="Quantity" />
                        {errors.quantity && <p style={{color:'red'}}>Chưa nhập số lượng</p>}
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Giá cũ</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" ref={register({ required: true, mix:0 })} name="old_price" onChange={changeOldPrice}  placeholder="Giá cũ" />
                        {errors.old_price && <p style={{color:'red'}}>Bạn chưa nhập giá</p>}
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Giá </label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" ref={register({ required: true,  mix:0 , max:price_Sale })} name="price" placeholder="Giá" />
                        {errors.price && <p style={{color:'red'}}>Bạn chưa nhập giá và phải nhỏ hơn giá cũ</p>}
                         </div>
                    </div>
                    

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Mô tả ngắn:</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" ref={register({ required: true })} name="short_description" placeholder="Mô tả ngắn" />
                        {errors.short_description && <p style={{color:'red'}}>Chưa nhập thông tin</p>}
                         </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Danh mục</label>
                        <div className="col-sm-10">
                          <select className="form-control" ref={register({ required: true })}  name="id_category" >
                            {danhsach.map(el => (
                                 <option value={el.id}>{el.name_category} </option>
                            ))}
                          </select>
                        {errors.id_category && <p style={{color:'red'}}>Chưa chọn danh mục</p>}
                         </div>
                    </div>
               

                    <label htmlFor="inputPassword3" className="col-sm-2 control-label">Mô tả chi tiết</label>
                    <Editor value={motaChiTiet}  onChange={onInfoChange} />


                </div>
                {/* /.box-body */}
                <div className="box-footer">
                    <button type="submit" className="btn btn-info pull-right">Thêm mới</button>
                </div>
                {/* /.box-footer */}
                </form>
                </div>
            </div>
            <div className="col-md-3">
                  <img src="" id="show_img" width="300px"/>
            </div>
            
    
            </div>
          
          </div>
                  
    )
}

AddProduct.propTypes = {

}

export default AddProduct

