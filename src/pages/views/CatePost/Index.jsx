import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import apiRequest from '../../../api/postCateApi';
import apiRequestPost from '../../../api/postApi';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../Categories/Pagination';
function CatePostClient(props) {
    let { id }  = useParams();
    const [allPost,setAllpost] = useState([]);
    const [cates,setCate] = useState([]);
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

      const postOfCate = allPost.filter(el=> el.id_cate == id);

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

      const thisCate = cates.filter(el => el.id == id );
      console.log(thisCate)
    //   getPostRandomAll
      const [postRamdom,setPostRamdom] = useState([]);
      useEffect(() => {
          async function getlistPostRandom(){
            try{
              const {data} = await apiRequestPost.getPostRandomAll()
              setPostRamdom(data);
            }catch(error){
              console.log(error);
            }
          }
          getlistPostRandom()
        }, []);

        const listPostOfCate = postRamdom.filter( el=> el.id_cate == id);
        const list5PostOfCate = listPostOfCate.slice(0,6);

        // phân trang
        const [currentProduct, setCurrentProduct] = useState(1);
        const [productPerpage] = useState(5);
        const indexOflastProduct = currentProduct * productPerpage;
        const indexOfFirstProduct = indexOflastProduct - productPerpage;
        const paginati_Product = postOfCate.slice(indexOfFirstProduct,indexOflastProduct);
        const paginate = productNumber => (setCurrentProduct(productNumber));
    return (
        <div>
       
              <div className="container">
                <div className="col-md-8">
                {thisCate.map((el,index) => (
                 <h1 className="list-group-item " style={{marginTop:'-1px'}}>{el.name_cate}</h1>
                 ))}
                 <br/>
                    {paginati_Product.map((el,index)=>(
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
                 <Pagination productPerPage={productPerpage} totolProduct={postOfCate.length} paginate={paginate}/>

                </div>

                <div className="col-md-4">
                    <div>
                        <ul className="list-group text-center">
                            <li className="list-group-item"><h4>Danh mục blog</h4></li>
                            {cates.map((el,index) => (
                            <li className="list-group-item"><Link to={'../../category-post/'+el.id}>{el.name_cate}</Link></li>
                            ))}

                        </ul>
                    </div>
                  <div className="list-group-item">
                      {list5PostOfCate.map((el,index)=>(
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
            </div>
        </div>
    )
}

CatePostClient.propTypes = {

}

export default CatePostClient

