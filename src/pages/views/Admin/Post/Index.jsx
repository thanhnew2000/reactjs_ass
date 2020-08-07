import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiRequest from '../../../../api/postApi';
import { Link } from "react-router-dom";
import Pagination from "../../Categories/Pagination";
import Swal from 'sweetalert2'

let arrayTest = [];

function PostAdmin(props) {

    const [listPost, setlistPost] = useState([]);
    const [listPost2, setlistPost2] = useState([]);

    useEffect(() => {
      async function getList(){
        try{
          const {data} = await apiRequest.getAllPost()
          setlistPost(data);
          setlistPost2(data);
          console.log(data)
        }catch(error){
          console.log(error);
        }
      }
      getList()
    }, []);

      function colorStatus($number){
        if($number == 1){
          return 'red'
        }else if($number == 2){
          return 'green'
        }
      }

  const [styleShowButton,setstyleShowButton] = useState({display:'none'});
      
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

  function removeAllId(id){
    Swal.fire({
      title: 'Bạn có chắc chắc xóa các bài viết này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        apiRequest.removePost(arrayTest)
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

  function deleteBaiViet(id){
    Swal.fire({
        title: 'Bạn có chắc chắc muốn xóa bài viết này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.value) {
          apiRequest.removePost(id)
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


function locFolowStatus(e){
  const {value} = e.target;
  const newPosts =listPost2.filter(el => el.status == parseInt(value))
  if(value == 'all'){
    setlistPost(listPost2);
  }else{
    setlistPost(newPosts);
  }
}

function locSort(e){
  const {value} = e.target;
    apiRequest.searchOrder(value)
      .then(function (response) {
        setlistPost(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
}

      // phân trang
const [currentPost, setCurrentPost] = useState(1);
const [postPerpage] = useState(5);
const indexOflastPost = currentPost * postPerpage;
const indexOfFirstPost = indexOflastPost - postPerpage;
const paginati_Post = listPost.slice(indexOfFirstPost,indexOflastPost);
const paginate = productNumber => (setCurrentPost(productNumber));

  return (
    <div>
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Bài viết </h3>
        </div>
        {/* /.box-header */}
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-1">Trạng thái:</div>
          <div className="col-md-2">
            <select onChange={locFolowStatus} className="form-control">
                        <option value="all">Tất cả</option>
                        <option  value='1'>Chưa published</option>
                        <option  value='2'>Đã published</option>
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
          </div>
        <div className="box-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
              <th style={{width: '10px'}} scope="col">
                    <button style={styleShowButton} onClick={removeAllId} >Xóa</button>
                </th>
                <th style={{ width: "10px" }} scope="col">
                  Id
                </th>
                <th scope="col" width="600px">Tiêu đề</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">
                  Chức năng
                  <Link
                    to={"../admin/post/add"}
                    className="btn btn-success"
                    style={{ marginLeft: "10px" }}
                  >
                    Thêm mới
                  </Link>
                </th>
              </tr>
              {paginati_Post.map((el, index) => (
                <tr key={index}>
                  <th><input type="checkbox"  id={'ac'+el.id} name={el.name_product} value={el.id} onChange={checkBoxChange} /></th>
                  <th scope="row">{el.id}</th>
                  <td>{el.title} </td>
                  <td><img src={el.image} width="50px" /></td>
                  <td style={{color:colorStatus(el.status)}}>{el.status == 1 ? 'Chưa published' : 'Đã published'}</td>
                  <td>
                    <Link
                      to={"../admin/post/" + el.id}
                      className="btn btn-primary "
                    >
                      Sửa
                    </Link>
                    <a
                     onClick={() => deleteBaiViet(el.id)}
                      className="btn btn-danger ml-2"
                      style={{ marginLeft: "5px" }}
                    >
                      Xóa
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* /.box-body */}
        <div className="box-footer clearfix">
        <Pagination productPerPage={postPerpage} totolProduct={listPost.length} paginate={paginate}/>
        </div>
      </div>
    </div>
  );
}

PostAdmin.propTypes = {};

export default PostAdmin;
