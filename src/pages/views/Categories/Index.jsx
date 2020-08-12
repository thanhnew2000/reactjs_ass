import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import functionAddCart from '../Cart/functionAddCart'
import Swal from 'sweetalert2'
import '../../../../src/assets/client/css/menudrop.scss'

const Categorie = (props) => {
  let {id} = useParams();
  const {products2} = props;
  const  listProduct_cate = products2.filter(product => product.id_category == id);
  const {danhsach} = props;
  const danhsachHavefillter =danhsach.filter(el => el.id !== 1);
  const danhsachHavefillter_detail = danhsachHavefillter.filter(el => el.id == id);
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

useEffect(functionAddCart.countCart,[])

function addCart(pro){
  functionAddCart.addCart(pro)
}
function formatMoney(price) {
  return functionAddCart.formatMoney(price)
}

function giamGia(old_price,price){
  var phantram = (Math.round(((old_price - price)/old_price)*100))+'%';
  return phantram;
}
// function addCart(pro){
//   const arrayCart2 = functionAddCart.addCart(pro)
//    var arrayCartJson = JSON.stringify(arrayCart2);
//    localStorage.setItem('cart',arrayCartJson);

//    Swal.fire({
//      title: 'Thêm giỏ hàng thành công ',
//      icon: 'success',
//      showCancelButton: false,
//      times:1000,
//    })
// }

// function formatMoney(price) {
//   return new Intl.NumberFormat("vi-VN", {
//     style: "currency",
//     currency: "VND",
//   }).format(price);
// }

// phân trang
const [currentProduct, setCurrentProduct] = useState(1);
const [productPerpage] = useState(6);
const indexOflastProduct = currentProduct * productPerpage;
const indexOfFirstProduct = indexOflastProduct - productPerpage;
const paginati_Product = listProduct_cate.slice(indexOfFirstProduct,indexOflastProduct);
const paginate = productNumber => (setCurrentProduct(productNumber));

    return (
       <div>
        <section id="advertisement">
          <div className="container" style={styleContanerImage} >
            {danhsachHavefillter_detail.map((el,index) =>(
              <div key={index}>
              <h5 style={styleContanerChild} >{el.name_category}</h5>
                 <img height="400" src={el.image} alt="" />
              </div>
            ))}
         
            </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="left-sidebar">
                  <h2>Category</h2>
                  <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                {danhsachHavefillter.map((ds,index) => (
                    <div className="panel panel-default" key={index}>
                      <div className="panel-heading">
                         <h4 className="panel-title">
                           <Link to={'../danh-muc/'+ds.id}>{ds.name_category}</Link></h4>
                      </div>
                    </div>
                ))}
                  </div>{/*/category-productsr*/}
                  
                  {/* <div className="brands_products">
                    <h2>Brands</h2>
                    <div className="brands-name">
                      <ul className="nav nav-pills nav-stacked">
                        <li><a href> <span className="pull-right">(50)</span>Acne</a></li>
                        <li><a href> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                        <li><a href> <span className="pull-right">(27)</span>Albiro</a></li>
                        <li><a href> <span className="pull-right">(32)</span>Ronhill</a></li>
                        <li><a href> <span className="pull-right">(5)</span>Oddmolly</a></li>
                        <li><a href> <span className="pull-right">(9)</span>Boudestijn</a></li>
                        <li><a href> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                      </ul>
                    </div>
                  </div> */}
                  {/* <div className="price-range">
                    <h2>Price Range</h2>
                    <div className="well">
                      <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
                      <b>$ 0</b> <b className="pull-right">$ 600</b>
                    </div>
                  </div> */}
                  <div className="shipping text-center">{/*shipping*/}
                    <img src="../client/images/home/shipping.jpg" alt="" />
                  </div>{/*/shipping*/}
                </div>
              </div>
              <div className="col-sm-9 padding-right">
                <div className="features_items">{/*features_items*/}
                  <h2 className="title text-center">Features Items</h2>
                  {paginati_Product.map((pro,index) => (
                  <div className="col-sm-4"  key={index}>
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">

                        <p className="containerImage">
                          <img src={pro.feature_image} alt="" height='250px' />
                          <p  className="top-left" style={{color:'white',fontSize:'17px',display:pro.old_price == 0 ? 'none'  : ''}}>
                            Sale {giamGia(pro.old_price,pro.price)}</p>
                         </p>
                         <span align="center" style={{color:'#c8c8c8',textDecoration: 'line-through',display:pro.old_price == 0 ? 'none'  : ''}}>
                           {formatMoney(pro.old_price)}
                         </span> 
                          <span style={{fontSize:'20px',color:'#FE980F',fontWeight:'BOLD'}}> {formatMoney(pro.price)}</span>

                          <p>{pro.name_product}</p>
                          {/* <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a> */}
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>{pro.name_product}</h2>
                            <p>{pro.short_description}</p>
                            <a  style={{display: pro.quantity <= 0 ? 'none' : ''}}  onClick={() => addCart(pro)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</a>
                            <h5 style={{color:'red', display: pro.quantity <= 0 ? '' : 'none' }}> Hết hàng </h5>
                          </div>
                        </div>
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                        <li> <Link to={'../san-pham/'+pro.id+'/'+pro.id_category}><i className="fa fa-plus-square" />Xem chi tiết</Link></li>
                          {/* <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                 ))}
                 <Pagination productPerPage={productPerpage} totolProduct={listProduct_cate.length} paginate={paginate}/>
                 
                </div>{/*features_items*/}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}

export default Categorie
