import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import apiRequest from '../../../api/postCateApi';
import apiRequestPost from '../../../api/postApi';
import SideBarBlog from './SideBarBlog';
import { Link, useParams } from 'react-router-dom';
function PostOfCate(props) {
    let { id }  = useParams();
    const [Allpost,setAllpost] = useState([]);
    const [cates,setCate] = useState([]);

    useEffect(() => {
        async function getListPostCates(){
          try{
            const {data} = await apiRequestPost.getAllPostOfCate(id)
            setAllpost(data);
          }catch(error){
            console.log(error);
          }
        }
        getListPostCates()
      }, []);

      useEffect(() => {
        async function getListProduct(){
          try{
            const {data} = await apiRequest.getAllPostCate()
            setCate(data);
          }catch(error){
            console.log(error);
          }
        }
        getListProduct()
      }, []);


      const [list5Post,setList5Post] = useState([]);

      useEffect(() => {
          async function getlist5Post(){
            try{
              const {data} = await apiRequestPost.getPostOfCateRanDom(1,5)
              setList5Post(data);
            }catch(error){
              console.log(error);
            }
          }
          getlist5Post()
        }, []);


    return (
        <div>
              <div className="container">
                <div className="col-md-8">

                    {Allpost.map((el,index)=>(
                        <div className="row" key={index}>
                            <div className="col-md-4">
                                <img src={el.image}  width="200px" height="120px"/>
                            </div>
                            <div className="col-md-8">
                               <h4><Link to={'../../blog/'+el.id_cate+'/'+el.id}>{el.title}</Link></h4>
                               <p>{(el.short_description).slice(0,250)+'...'}</p>
                            </div>
                            <br/>
                            <br/>
                        </div>
                    ))}

                </div>

                <div className="col-md-4">
                  <SideBarBlog  cates={cates} list5Post={list5Post} />
               </div>
            </div>
        </div>
    )
}

PostOfCate.propTypes = {

}

export default PostOfCate

