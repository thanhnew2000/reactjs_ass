import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
function ProductAdmin({products}) {
    return (
        <div>
            <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách sản phẩm</h3>
        </div>
        {/* /.box-header */}
        <div className="box-body">
          <table className="table table-bordered">
            <tbody><tr>
                <th style={{width: '10px'}} scope="col">Id</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Chức năng 
                    <Link to={'../admin/products/add'} className="btn btn-success" style={{marginLeft: '10px'}} >Thêm mới</Link></th>
              </tr>
              {products.map(el => (
                        <tr>
                            <th scope="row">{el.id}</th>
                            <td>{el.name_product} </td>
                            <td><img src={el.feature_image} width="100" /></td>
                            <td>{el.price}</td>
                            <td>
                                <a href className="btn btn-primary " >Sửa</a>

                                <a href className="btn btn-danger ml-2  " style={{marginLeft: '5px'}}>Xóa</a>
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
            {/* <div className="col-md-7 mt-5">
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Chức năng</th>
                </tr>
                </thead>
                <tbody>
     
                
                </tbody>
            </table>
        </div> */}
        </div>
    )
}

ProductAdmin.propTypes = {

}

export default ProductAdmin

