import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiRequest from '../../../api/postCateApi';
import apiRequestPost from '../../../api/postApi';
import { useParams, Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
function Post(props) {
    let { id }  = useParams();
    let { idcate }  = useParams();

    const [allPost,setAllpost] = useState([]);
    const [cates,setCate] = useState([]);
    // const [onePost,setonePost] = useState({});
    useEffect(() => {
        async function getListAllPost(){
          try{
            const {data} = await apiRequestPost.getAllPostStatus2()
            setAllpost(data);
          }catch(error){
            console.log(error);
          }
        }
        getListAllPost()
      }, []);


   const onePost = allPost.filter(el => el.id == id);
    console.log(onePost);

    useEffect(() => {
        async function getListProduct(){
          try{
            const {data} = await apiRequest.getAllCateallClient()
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
              const {data} = await apiRequestPost.getPostOfCateRanDom(idcate,5)
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
                <h5> - Đọc tin </h5>

                  {onePost.map((el,index)=>(
                      <div key={index}>
                        <h1>{el.title}</h1>
                        <p>{el.time_published}</p>
                        <h3>{el.short_description}</h3>
                        <div>{ReactHtmlParser(el.content)}</div>
                      </div>
                  ))}

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
                            <p><Link to={'../../post/'+el.id+'/'+el.id_cate}>{el.title}</Link> </p>
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

Post.propTypes = {

}

export default Post

