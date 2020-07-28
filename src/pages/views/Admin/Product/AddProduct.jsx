import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddProduct(props) {
    const redColor = {}
    const [valueInput,setValueInput] = useState({});
    const { register, handleSubmit, watch, errors } = useForm();
    // const history = useHistory();

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
         console.log(data);
         axios.post("http://localhost:8000/api/product/",data)
          .then(function (response) {
            console.log(response);
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
                <h3 className="box-title">Thêm mới sản phẩm</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" action=""  onSubmit={handleSubmit(onSubmit)}>
                <div className="box-body">
                    <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Tên sản phẩm</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" ref={register({ required: true })} name="name_product"  onChange={onHandleChange} placeholder="Tên sản phẩm" />
                        {errors.name_product && <p style={redColor}>Bạn chưa nhập tên sản phẩm</p>}
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Ảnh</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control"  ref={register({ required: true })} name="feature_image" onChange={onHandleChange} placeholder="Ảnh sản phẩm" />
                        {errors.feature_image && <p style={redColor}>Bạn chưa nhập ảnh</p>}
                       
                         </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Price</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" ref={register({ required: true })} name="price" onChange={onHandleChange} placeholder="Giá" />
                        {errors.price && <p style={redColor}>Bạn chưa nhập giá</p>}
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Mô tả ngắn:</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" ref={register({ required: true })} name="short_description" onChange={onHandleChange} placeholder="Mô tả ngắn" />
                        {errors.short_description && <p style={redColor}>Chưa nhập thông tin</p>}
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Mô tả chi tiết</label>
                        <div className="col-sm-10">
                        <textarea type="text" className="form-control" ref={register({ required: true })} name="information" onChange={onHandleChange} placeholder="Mô tả chi tiết" />
                        {errors.information && <p style={redColor}>Chưa nhập thông tin</p>}
                         </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Danh mục</label>
                        <div className="col-sm-10">
                        <textarea type="text" className="form-control" ref={register({ required: true })} name="id_category" onChange={onHandleChange} placeholder="Mô tả chi tiết" />
                        {errors.id_category && <p style={redColor}>Chưa nhập thông tin</p>}
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

AddProduct.propTypes = {

}

export default AddProduct

