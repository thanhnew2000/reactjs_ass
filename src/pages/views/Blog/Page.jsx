import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiRequest from '../../../api/postCateApi';
import apiRequestPost from '../../../api/postApi';
import SideBarBlog from './SideBarBlog';
import { useParams, Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
function Page(props) {
    let { id }  = useParams();

    const [cates,setCate] = useState([]);
    const [onepost,setOnepost] = useState({});

    useEffect(() => {
        async function getOneOfPost(){
          try{
            const {data} = await apiRequestPost.getPost(id)
            setOnepost(data);
          }catch(error){
            console.log(error);
          }
        }
        getOneOfPost()
      },[]);


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
              const {data} = await apiRequestPost.getPostOfCateRanDom(onepost.id_cate,5)
              setList5Post(data);
              console.log(data)
            }catch(error){
              console.log(error);
            }
          }
          getlist5Post()
        }, []);
  
    return (
        <div>
            <div className="container">
              <h1>Page</h1>
                <div className="col-md-8">
                  <h1>{onepost.title}</h1>
                  <h3>{onepost.short_description}</h3>
                  <div>{ReactHtmlParser(onepost.content)}</div>
                </div>

                <div className="col-md-4">
                  <div className="list-group-item">
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
                       {/* <SideBarBlog  cates={cates} list5Post={list5Post}/> */}
               </div>
            </div>
        </div>
    )
}

Page.propTypes = {

}

export default Page

