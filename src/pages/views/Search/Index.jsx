import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Pagination from '../Categories/Pagination';
import functionAddCart from '../Cart/functionAddCart'
import Swal from 'sweetalert2'
import apiRequest from '../../../api/productApi';


const Search = (props) => {
  let {key} = useParams();
  console.log(key)
  const [productSearch,setProductSearch] = useState([]);

  useEffect(() => {
    async function getProductOfSearch(){
      try{
        const {data} = await apiRequest.searchKey(key)
        setProductSearch(data)
      }catch(error){
        console.log(error);
      }
    }
    getProductOfSearch()
  }, []);

console.log(productSearch);
  const styleContanerImage={
      position: 'relative',
      'text-align': 'center',
      color: 'white',
  }
  const styleContanerChild={
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}


function addCart(pro){
  const arrayCart2 = functionAddCart.addCart(pro)
   var arrayCartJson = JSON.stringify(arrayCart2);
   localStorage.setItem('cart',arrayCartJson);

   Swal.fire({
     title: 'Thêm giỏ hàng thành công ',
     icon: 'success',
     showCancelButton: false,
     times:1000,
   })
}


// phân trang
const [currentProduct, setCurrentProduct] = useState(1);
const [productPerpage] = useState(6);
const indexOflastProduct = currentProduct * productPerpage;
const indexOfFirstProduct = indexOflastProduct - productPerpage;
const paginati_Product = productSearch.slice(indexOfFirstProduct,indexOflastProduct);
const paginate = productNumber => (setCurrentProduct(productNumber));

    return (
       <div>
        <section id="advertisement">
          <div className="container" style={styleContanerImage} >
           {/* <p style={styleContanerChild} >Giay Vans</p> */}
            {/* <img height="400" src="https://images.solecollector.com/complex/images/c_fill,dpr_2.0,f_auto,fl_lossy,q_auto,w_680/su4e8szwoz0nstswdigk/nike-hyperadapt-1-triple-white-release-date-ah9389-102-dark-main" alt="" /> */}
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 padding-right">
                <div className="features_items">{/*features_items*/}
                  <h2 className="title text-center">Kết quả tìm kiếm</h2>
                  {paginati_Product.map((pro,index) => (
                  <div className="col-sm-4"  key={index}>
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src={pro.feature_image} alt="" />
                         <h2>{pro.price}</h2>
                          <p>{pro.name_product}</p>
                          {/* <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a> */}
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>{pro.name_product}</h2>
                            <p>{pro.short_description}</p>
                            <a  onClick={() => addCart(pro)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</a>
                          </div>
                        </div>
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                        <li> <Link to={'../san-pham/'+pro.id}><i className="fa fa-plus-square" />Xem chi tiết</Link></li>
                          {/* <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                 ))}
                 <Pagination productPerPage={productPerpage} totolProduct={productSearch.length} paginate={paginate}/>
                 
                </div>{/*features_items*/}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}

export default Search
