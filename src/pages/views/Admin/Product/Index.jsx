import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/productApi';
import Pagination from '../../Categories/Pagination';
import { useForm } from 'react-hook-form';


let arrayTest = [];

function ProductAdmin({danhsach,applistProducts}) {
  const [products,setListProduct] = useState([]);
  const [products2,setListProduct2] = useState([]);
  // const [arrayIdRemove,setarrayIdRemove] = useState([]);
  const [styleShowButton,setstyleShowButton] = useState({display:'none'});

  const getListProduct = () => {
    apiRequest.getAll()
    .then(function (response) {
      setListProduct(response.data);
      setListProduct2(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
  useEffect(getListProduct, []);

  function deleteProduct(id){
    Swal.fire({
        title: 'Bạn có chắc chắc muốn xóa sản phẩm này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.value) {
          apiRequest.remove(id)
            .then(function (response) {
              console.log(response);
              getListProduct();
            })
            .catch(function (error) {
              console.log(error);
            })
          Swal.fire(
            'Đã xóa!',
          )
        } 
      })
}


  function checkBoxChange(e){
    const {value} = e.target;
    if(e.target.checked){
      arrayTest.push(value);
      // console.log(value);
    }else{
      arrayTest = arrayTest.filter(el => el != value);
      // console.log('bỏ')
    }
      console.log(arrayTest);

    if(arrayTest.length > 0){
      setstyleShowButton({display:'block'})
      console.log(arrayTest.length)
    }else{
      setstyleShowButton({display:'none'})
      console.log(arrayTest.length)

    }
  }

  function removeAllId(){
    Swal.fire({
      title: 'Bạn có chắc chắc xóa các sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        apiRequest.remove(arrayTest)
          .then(function (response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          })
        Swal.fire(
          'Đã xóa!',
        )
      } 
    })
  }
const cateList = danhsach.filter(el => el.id !== 1);


function locFolowDanhMuc(e){
  const {value} = e.target;
  const newProducts = products2.filter(el => el.id_category == parseInt(value))
  if(value != 'all'){
    setListProduct(newProducts);
  }else{
    setListProduct(products2);
  }
}


function locSort(e){
  const {value} = e.target;
    apiRequest.searchOrder(value)
      .then(function (response) {
        setListProduct(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
}

function filterLocStatus(value){
  if(value == 1){
    return products2.filter(el => el.quantity > 10)
   }else if(value == 2){
    return products2.filter(el => el.quantity <= 10 && el.quantity !== 0)
   }else if(value == 3){ 
    return products2.filter(el => el.quantity <= 0)
   }
}

function locStatus(e){
  const {value} = e.target;
  console.log(value);
  const newProducts = filterLocStatus(value)
  if(value != 'all'){
    setListProduct(newProducts);
  }else{
    setListProduct(products2);
  }
}


const { register, handleSubmit, watch, errors } = useForm();
function onSubmitSreach (data){
  apiRequest.searchKey(data.sreach)
    .then(function (response) {
      setListProduct(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
}

function formatMoney(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}


  // phân trang
const [currentProduct, setCurrentProduct] = useState(1);
const [productPerpage] = useState(5);
const indexOflastProduct = currentProduct * productPerpage;
const indexOfFirstProduct = indexOflastProduct - productPerpage;
const paginati_Product = products.slice(indexOfFirstProduct,indexOflastProduct);
const paginate = productNumber => (setCurrentProduct(productNumber));


function trangThaiShow(quantity){
  if(quantity <= 0){
    return 'Hết hàng';
  }else if(quantity <= 10){
    return 'Sắp hết hàng'
  }else {
    return 'Còn hàng'
  }
}

function colortrangThaiShow(quantity){
  if(quantity <= 0){
    return 'red';
  }else if(quantity <= 10){
    return 'blue'
  }else {
    return 'green'
  }
}

    return (
        <div>
            <div className="box">
        <div className="box-header with-border">
          <div className="row">
            <div className="col-md-6">
               <h3 className="box-title">Danh sách sản phẩm</h3>
            </div>
          <form action=""  onSubmit={handleSubmit(onSubmitSreach)}>
            <div className="col-md-3">
            <input type="text" name="sreach" className="form-control" ref={register({ required: true, minLength:1, pattern:/^[^\s].*/   })} placeholder="Tìm kiếm keyword"/>
            {errors.sreach && <p style={{color:'red'}}>Hãy nhập form tìm kiếm</p>}
            </div>
            <div className="col-md-3">
             <button type="submit" className="btn btn-primary">Tìm</button>
            </div>
          </form>
          </div>
     
        </div>

        {/* /.box-header */}
        <div className="box-body">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-1">
         <p>Danh mục :</p>
        </div>
        <div className="col-md-2">
   
          <select onChange={locFolowDanhMuc} className="form-control">
             <option value="all">Tất cả</option>
              {cateList.map((el,index) => (
                    <option key={index} value={el.id}>{el.name_category}</option>
              ))}
          </select>
        </div>
        <div className="col-md-1">
         <p>Thứ tự :</p>
        </div>
        <div className="col-md-2">
          <select onChange={locSort} className="form-control">
                    <option  value='asc'>Tăng dần</option>
                    <option  value='desc'>Giảm dần</option>
          </select>
        </div>
        <div className="col-md-1">
         <p>Trạng thái :</p>
        </div>
        <div className="col-md-2">
          <select onChange={locStatus} className="form-control">
                    <option  value='all'>Tất cả</option>
                    <option  value='1'>Còn hàng</option>
                    <option  value='2'>Sắp hết hàng</option>
                    <option  value='3'>Hết hàng</option>
          </select>
        </div>
        
      </div>

          <table className="table table-bordered">
            <tbody><tr>
                <th style={{width: '10px'}} scope="col">
                    <button style={styleShowButton} onClick={removeAllId} >Xóa</button>
                </th>
                <th style={{width: '10px'}} scope="col">Id</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Danh mục</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chức năng 
                    <Link to={'../admin/products/add'} className="btn btn-success" style={{marginLeft: '10px'}} >Thêm mới</Link>
                    </th>
              </tr>
              {paginati_Product.map((el,index) => (
                        <tr key={index}>
                            <th><input type="checkbox"  id={'ac'+el.id} name={el.name_product} value={el.id} onChange={checkBoxChange} /></th>
                            <th scope="row">{el.id}</th>
                            <td>{el.name_product} </td>
                            <td><img src={el.feature_image} width="100" /></td>
                            <td>{formatMoney(el.price)}</td>
                            <td>{el.quantity}</td>
                            <td>{el.name_category}</td>
                            <td style={{color:colortrangThaiShow(el.quantity)}}>{trangThaiShow(el.quantity)}</td>
                            <td>
                                <Link to={'../admin/products/'+el.id} className="btn btn-primary ">Sửa</Link>
                                <a  className="btn btn-danger ml-2"  onClick={() => deleteProduct(el.id)} style={{marginLeft: '5px'}}>Xóa</a>
                            </td>
                        </tr>
                    ))}
            </tbody></table>
        </div>
        {/* /.box-body */}
        <Pagination productPerPage={productPerpage} totolProduct={products.length} paginate={paginate}/>
      </div>
        
        </div>
    )
}

ProductAdmin.propTypes = {

}

export default ProductAdmin

