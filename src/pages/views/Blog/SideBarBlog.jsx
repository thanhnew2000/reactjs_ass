import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiRequest from '../../../api/postCateApi';
import apiRequestPost from '../../../api/postApi';
import { Link } from 'react-router-dom';

function SideBarBlog({cates,list5Post}) {

    return (
        <div>
              <div>
                <ul className="list-group text-center">
                    <li className="list-group-item"><h4>Danh mục blog</h4></li>
                    {cates.map((el,index) => (
                    <li className="list-group-item"><Link to={'../../category-post/'+el.id}>{el.name_cate}</Link></li>
                    ))}

                </ul>
                  </div>
                  <div className="list-group-item">
                      {list5Post.map((el,index)=>(
                      <div className="row" key={index}>
                        <div className="col-md-4">
                            <img src={el.image} width="100px" height="70px"/>
                        </div>
                        <div className="col-md-8">
                            <p><Link to={'../../post/'+el.id}>{el.title}</Link> </p>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        </div>
                      ))}

                  </div>
        </div>
    )
}

SideBarBlog.propTypes = {

}

export default SideBarBlog

