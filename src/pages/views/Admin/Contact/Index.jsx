import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/contactApi';
import Pagination from '../../Categories/Pagination';

function deleteContact(id){
    Swal.fire({
        title: 'Bạn có chắc chắc muốn xóa liên hệ này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.value) {
          apiRequest.removeContact(id)
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
function ContactAdmin(props) {
    const styleDaXem = {color:'green'}
    const styleNoSee = {color:'red'}
  const [contacts,setListContacts] = useState([]);
  const [contacts2,setListContacts2] = useState([]);
  useEffect(() => {
    async function getListContact(){
      try{
        const {data} = await apiRequest.getAllContact()
        console.log(data);
        setListContacts(data);
        setListContacts2(data);
      }catch(error){
        console.log(error);
      }
    }
        getListContact()
    }, []);


    function locFolowStatus(e){
      const {value} = e.target;
      const newContacts =contacts2.filter(el => el.status == parseInt(value))
      if(value == 'all'){
        setListContacts(contacts2);
      }else{
        setListContacts(newContacts);
      }
    }
    // phân trang
    const [currentContact, setcurrentContact] = useState(1);
    const [productPerpage] = useState(5);
    const indexOflastContact = currentContact * productPerpage;
    const indexOfFirstContact = indexOflastContact - productPerpage;
    const paginati_Product = contacts.slice(indexOfFirstContact,indexOflastContact);
    const paginate = productNumber => (setcurrentContact(productNumber));
    return (
        <div>
            <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Liên hệ</h3>
        </div>
        {/* /.box-header */}
        <div className="row">
          <div className="col-md-7"></div>
          <div className="col-md-1">Trạng thái:</div>
          <div className="col-md-3">
            <select onChange={locFolowStatus} className="form-control">
                        <option value="all">Tất cả</option>
                        <option  value='1'>Chưa xem</option>
                        <option  value='2'>Đã xem</option>
              </select>
          </div>
          </div>
        <div className="box-body">
          <table className="table table-bordered">
            <tbody><tr>
                <th style={{width: '10px'}} scope="col">Id</th>
                    <th scope="col">Email</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Trạng Thái</th>
                    <th scope="col">Chức năng </th>
              </tr>
              {paginati_Product.map((el,index) => (
                        <tr key={index}>
                            <th scope="row">{el.id}</th>
                            <td>{el.email} </td>
                            <td>{el.name} </td>
                            <td style={el.status == 1 ? styleNoSee : styleDaXem}>{el.status == 1 ? 'Chưa xem' : 'Đã xem'}</td>
                            <td>
                                <Link to={'../admin/contacts/'+el.id} className="btn btn-primary ">Sửa</Link>
                                <a  className="btn btn-danger ml-2"  onClick={() => deleteContact(el.id)} style={{marginLeft: '5px'}}>Xóa</a>
                            </td>
                        </tr>
                    ))}
            </tbody></table>
        </div>
        {/* /.box-body */}
        <Pagination productPerPage={productPerpage} totolProduct={contacts.length} paginate={paginate}/>
        {/* <div className="box-footer clearfix">
          <ul className="pagination pagination-sm no-margin pull-right">
            <li><a href="#">«</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul>
        </div> */}
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

ContactAdmin.propTypes = {

}

export default ContactAdmin

