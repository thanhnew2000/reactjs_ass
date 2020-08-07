import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import apiRequest from '../../../api/postCateApi';
import apiRequestPost from '../../../api/postApi';
import SideBarBlog from './SideBarBlog';
import { Link } from 'react-router-dom';

function LayoutPost(props) {

    const [cates,setCate] = useState([]);
    const [Allpost,setAllpost] = useState([]);

    useEffect(() => {
        async function getListPostCates(){
          try{
            const {data} = await apiRequest.getAllPostCate()
            setCate(data);
          }catch(error){
            console.log(error);
          }
        }
        getListPostCates()
      }, []);
      
      useEffect(() => {
        async function getListPosts(){
          try{
            const {data} = await apiRequestPost.getAllPost()
            setAllpost(data);
          }catch(error){
            console.log(error);
          }
        }
        getListPosts()
      }, []);

      const [list5PostCate,setList5PostCate] = useState([]);
      useEffect(() => {
        async function getListPosts(){
          try{
            const {data} = await apiRequestPost.getPostRanDom(2)
            setList5PostCate(data);
          }catch(error){
            console.log(error);
          }
        }
        getListPosts()
      }, []);

    return (
        <div>
            <div className="container">
                <div className="col-md-8">
          <h1>Index</h1>
                    {Allpost.map((el,index)=>(
                        <div className="row" key={index}>
                            <div className="col-md-4">
                                <img src={el.image}  width="200px" height="120px"/>
                            </div>
                            <div className="col-md-8">
                               <h4><Link to={'../../post/'+el.id}>{el.title}</Link></h4>
                               <p>{(el.short_description).slice(0,250)+'...'}</p>
                            </div>
                            <br/>
                            <br/>
                        </div>
                    ))}

                </div>

                <div className="col-md-4">
                  <SideBarBlog  cates={cates} list5Post={list5PostCate} />
               </div>
            </div>
        </div>
    )
}

LayoutPost.propTypes = {

}

export default LayoutPost

