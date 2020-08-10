import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/cateApi';
import Pagination from '../../Categories/Pagination';

function CategoryAdmin(props) {
  const history = useHistory();
  const [danhsach, setDanhSach] = useState([]);
  useEffect(() => {
    async function getList(){
      try{
        const {data} = await apiRequest.getAllCate()
        console.log(data);
        let newData = data.filter((el,index)=> (el.id != 1))
        setDanhSach(newData);
      }catch(error){
        console.log(error);
      }
    }
    getList()
  }, []);


  function deleteCate(id){
    Swal.fire({
        title: 'Bạn có chắc chắc muốn xóa danh mục này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.value) {
            apiRequest.removeCate(id)
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

  // phân trang
const [currentProduct, setCurrentProduct] = useState(1);
const [productPerpage] = useState(5);
const indexOflastProduct = currentProduct * productPerpage;
const indexOfFirstProduct = indexOflastProduct - productPerpage;
const paginati_Danhsach = danhsach.slice(indexOfFirstProduct,indexOflastProduct);
const paginate = productNumber => (setCurrentProduct(productNumber));


const [totalProductCate, settotalProductCate] = useState([]);

useEffect(() => {
  async function getList(){
    try{
      const newArray = [];
      const {data} = await apiRequest.test()
      var result = Object.entries(data);
      result.forEach(([key, value]) => {
        newArray[key] = value;
      });
      settotalProductCate(newArray);
    }catch(error){
      console.log(error);
    }
  }
  getList()
}, []);
console.log(totalProductCate[10])
    return (
        <div>
            <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Danh mục </h3>
        </div>
        {/* /.box-header */}
        <div className="box-body">
          <table className="table table-bordered">
            <tbody><tr>
                <th style={{width: '10px'}} scope="col">Id</th>
                    <th scope="col">Tên danh mục</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Cấp danh mục</th>
                    <th scope="col">Số sản phẩm</th>
                    <th scope="col">Chức năng 
                    <Link to={'../admin/danhmuc/add'} className="btn btn-success" style={{marginLeft: '10px'}} >Thêm mới</Link></th>
              </tr>
              {paginati_Danhsach.map((el,index) => (
                        <tr key={index}>
                            <th scope="row">{el.id}</th>
                            <td>{el.name_category} </td>
                            <td><img src={el.image} width="100" /></td>
                            <td>{el.cap_cate}</td>
                             <td>{totalProductCate[el.id] == undefined ? 0 : totalProductCate[el.id] }</td>

                            <td>
                                <Link to={'../admin/danhmuc/'+el.id}  className="btn btn-primary " >Sửa</Link>
                                <a  className="btn btn-danger ml-2"  onClick={() => deleteCate(el.id)} style={{marginLeft: '5px'}}>Xóa</a>
                            </td>
                        </tr>
                    ))}
            </tbody></table>
        </div>
        {/* /.box-body */}
        <Pagination productPerPage={productPerpage} totolProduct={danhsach.length} paginate={paginate}/>
      
      </div>
        </div>
    )
}

CategoryAdmin.propTypes = {

}

export default CategoryAdmin

