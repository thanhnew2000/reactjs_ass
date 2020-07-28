import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Pagination from './Pagination';

const Categorie = (props) => {
  let {id} = useParams();
  const {products2} = props;
  const  listProduct_cate = products2.filter(product => product.id_category == id);
  const {danhsach} = props;
  const danhsach_detail = danhsach.find(product => product.id == id);
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
// phân trang
const [currentProduct, setCurrentProduct] = useState(1);
const [productPerpage] = useState(2);
const indexOflastProduct = currentProduct * productPerpage;
const indexOfFirstProduct = indexOflastProduct - productPerpage;
const paginati_Product = listProduct_cate.slice(indexOfFirstProduct,indexOflastProduct);
const paginate = productNumber => (setCurrentProduct(productNumber));

    return (
       <div>
        <section id="advertisement">
          <div className="container" style={styleContanerImage} >
           <p style={styleContanerChild} >Giay Vans</p>
            <img height="400" src="https://images.solecollector.com/complex/images/c_fill,dpr_2.0,f_auto,fl_lossy,q_auto,w_680/su4e8szwoz0nstswdigk/nike-hyperadapt-1-triple-white-release-date-ah9389-102-dark-main" alt="" />
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="left-sidebar">
                  <h2>Category</h2>
                  <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                {danhsach.map((ds,index) => (
                    <div className="panel panel-default" key={index}>
                      <div className="panel-heading">
                         <h4 className="panel-title">
                           <Link to={'../danh-muc/'+ds.id}>{ds.name_category}</Link></h4>
                      </div>
                    </div>
                ))}
                  </div>{/*/category-productsr*/}
                  
                  <div className="brands_products">{/*brands_products*/}
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
                  </div>{/*/brands_products*/}
                  <div className="price-range">{/*price-range*/}
                    <h2>Price Range</h2>
                    <div className="well">
                      <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
                      <b>$ 0</b> <b className="pull-right">$ 600</b>
                    </div>
                  </div>{/*/price-range*/}
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
                          <img src={pro.feature_image} alt="" />
                         <h2>{pro.price}</h2>
                          <p>{pro.name_product}</p>
                          {/* <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a> */}
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>{pro.name_product}</h2>
                            <p>{pro.short_description}</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</a>
                          </div>
                        </div>
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                          <li><a href="#"><i className="fa fa-plus-square" />Xem chi tiết</a></li>
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
