import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiRequest from '../../../../api/slideApi';
import { Link } from "react-router-dom";
import Pagination from "../../Categories/Pagination";
import Swal from 'sweetalert2'

let arrayTest = [];

function SlideAdmin(props) {

    const [listSlide, setSlideShow] = useState([]);

    useEffect(() => {
      async function getSlideShow(){
        try{
          const {data} = await apiRequest.getAllSlide()
          console.log(data)
          setSlideShow(data);
        }catch(error){
          console.log(error);
        }
      }
      getSlideShow()
    }, []);


  return (
    <div>
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">SlideShow </h3>
        </div>
        {/* /.box-header */}
        <div className="box-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th style={{ width: "10px" }} scope="col">
                  Id
                </th>
                <th scope="col" width="300px">Tiêu đề</th>
                <th scope="col" width="600px">Mô tả ngắn</th>
                <th scope="col">
                  Chức năng
                </th>
              </tr>
              {listSlide.map((el, index) => (
                <tr key={index}>
                  <th scope="row">{el.id}</th>
                  <td>{el.title} </td>
                  <td>{el.content} </td>
                  <td>
                    <Link
                      to={"../admin/slide-show/" + el.id}
                      className="btn btn-primary "
                    >
                      Sửa
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 
      </div>
    </div>
  );
}

SlideAdmin.propTypes = {};

export default SlideAdmin;
