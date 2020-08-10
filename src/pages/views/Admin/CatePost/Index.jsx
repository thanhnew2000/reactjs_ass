import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/postCateApi';

function CatePost(props) {
  const history = useHistory();
  const [catePost, setcatePost] = useState([]);

  const getList = () => {
    apiRequest.getAllPostCate()
    .then(function (response) {
      let newData = response.data.filter((el,index)=> (el.id != 1))
      setcatePost(newData);
    })
    .catch(function (error) {
      console.log(error);
    });
};
useEffect(getList, []);

  // useEffect(() => {
  //   async function getList(){
  //     try{
  //       const {data} = await apiRequest.getAllPostCate()
  //       console.log(data);
  //       let newData = data.filter((el,index)=> (el.id != 1))
  //       setcatePost(newData);
  //     }catch(error){
  //       console.log(error);
  //     }
  //   }
  //   getList()
  // }, []);

  function deleteCate(id){
    Swal.fire({
        title: 'Bạn có chắc chắc muốn xóa danh mục này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.value) {
            apiRequest.removeCatePost(id)
            .then(function (response) {
              console.log(response);
              // window.location.reload();
              getList();
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

    return (
        <div>
            <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Danh mục bài viết</h3>
        </div>
        {/* /.box-header */}
        <div className="box-body">
          <table className="table table-bordered">
            <tbody><tr>
                <th style={{width: '10px'}} scope="col">Id</th>
                    <th scope="col">Tên danh mục</th>
                    <th scope="col">Chức năng 
                    <Link to={'../admin/catepost/add'} className="btn btn-success" style={{marginLeft: '10px'}} >Thêm mới</Link></th>
              </tr>
              {catePost.map((el,index) => (
                        <tr key={index}>
                            <th scope="row">{el.id}</th>
                            <td>{el.name_cate} </td>
                            <td>
                                <Link to={'../admin/catepost/'+el.id}  className="btn btn-primary " >Sửa</Link>
                                <a  className="btn btn-danger ml-2"  onClick={() => deleteCate(el.id)} style={{marginLeft: '5px'}}>Xóa</a>
                            </td>
                        </tr>
                    ))}
            </tbody></table>
        </div>
        {/* /.box-body */}
        <div className="box-footer clearfix">
          <ul className="pagination pagination-sm no-margin pull-right">
            <li><a href="#">«</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul>
        </div>
      </div>
        </div>
    )
}

CatePost.propTypes = {

}

export default CatePost

