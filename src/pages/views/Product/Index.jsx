import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import functionAddCart from '../Cart/functionAddCart'
import Swal from 'sweetalert2'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link
  } from "react-router-dom";

function Product(props) {
  const {danhsach} = props;
  const danhsachNew = danhsach.filter(el => el.id !== 1);
  let {id} = useParams();
  let {id_cate} = useParams();
  const [oneSanPham, setOneSanPham] = useState([]);
  // const [id_cate, setIdCate] = useState(0);
  const [sanPhamOfCate, setsanPhamOfCate] = useState([]);

  useEffect(() => {
    async function getListProduct(){
      try{
        const {data} = await axios.get("http://localhost:8000/api/product/"+id);
        setOneSanPham(data);
        // setIdCate(data.id_category);
      }catch(error){
        console.log(error);
      }
    }
    getListProduct()
  }, []);

  useEffect(() => {
    async function getList3Product(){
      try{
        const {data} = await axios.get("http://localhost:8000/api/product/3product/"+id_cate);
        setsanPhamOfCate(data);
        console.log(id_cate)
      }catch(error){
        console.log(error);
      }
    }
    getList3Product()
  }, []);

  let  first3product = sanPhamOfCate.filter((el,index) => index <= 2 );
  let  last3product = sanPhamOfCate.filter((el,index) => index > 2 );
  console.log(sanPhamOfCate)

  
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

    return (
        <div>
          <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                {danhsachNew.map((el,index) =>(
                  <div className="panel panel-default" key={index}>
                    <div className="panel-heading">
                      <h4 className="panel-title">
                      <Link to={'../danh-muc/'+el.id}>{el.name_category}</Link></h4>
                    </div>
                  </div>
                ))}
                 
                </div>{/*/category-products*/}
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
                  <img src="../../client/images/home/shipping.jpg" alt="" />
                </div>{/*/shipping*/}
              </div>
            </div>
            <div className="col-sm-9 padding-right">
              <div className="product-details">{/*product-details*/}
                <div className="col-sm-5">
                  <div className="view-product">
                    <img src={oneSanPham.feature_image} alt="" />
                    <h3>ZOOM</h3>
                  </div>
                  <div id="similar-product" className="carousel slide" data-ride="carousel">
                    {/* Wrapper for slides */}
                    {/* <div className="carousel-inner">
                      <div className="item active">
                        <a href><img src="../client/images/product-details/similar1.jpg" alt="" /></a>
                        <a href><img src="../client/images/product-details/similar2.jpg" alt="" /></a>
                        <a href><img src="../client/images/product-details/similar3.jpg" alt="" /></a>
                      </div>
                      <div className="item">
                        <a href><img src="../client/images/product-details/similar1.jpg" alt="" /></a>
                        <a href><img src="../client/images/product-details/similar2.jpg" alt="" /></a>
                        <a href><img src="../client/images/product-details/similar3.jpg" alt="" /></a>
                      </div>
                      <div className="item">
                        <a href><img src="../client/images/product-details/similar1.jpg" alt="" /></a>
                        <a href><img src="../client/images/product-details/similar2.jpg" alt="" /></a>
                        <a href><img src="../client/images/product-details/similar3.jpg" alt="" /></a>
                      </div>
                    </div> */}
                    {/* Controls */}
                    <a className="left item-control" href="#similar-product" data-slide="prev">
                      <i className="fa fa-angle-left" />
                    </a>
                    <a className="right item-control" href="#similar-product" data-slide="next">
                      <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="product-information">{/*/product-information*/}
                    <img src="../client/images/product-details/new.jpg" className="newarrival" alt="" />
                    <h2>{oneSanPham.name_product}</h2>
                        <p>Mã sản phẩm: {oneSanPham.id}</p>
                        <p>Mô tả: {oneSanPham.short_description}</p>
                      <span>
                      <span>{oneSanPham.price}đ</span>
                      {/* <label>Quantity:</label> */}
                      {/* <input type="text" defaultValue={3} /> */}
                    
                    </span>
                    <p>
                    <a  onClick={() => addCart(oneSanPham)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</a>
                      </p>
                    {/* <p><b>Availability:</b> In Stock</p>
                    <p><b>Condition:</b> New</p>
                    <p><b>Brand:</b> E-SHOPPER</p>
                    <a href><img src="../client/images/product-details/share.png" className="share img-responsive" alt="" /></a> */}
                  </div>{/*/product-information*/}
                </div>
              </div>{/*/product-details*/}
              <div className="category-tab shop-details-tab">{/*category-tab*/}
                <div className="col-sm-12">
                  <ul className="nav nav-tabs">
                    <li><a href="#details" data-toggle="tab">Thông tin  </a></li>
                    {/* <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li> */}
                  </ul>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade active in" id="details">
                  <p>{oneSanPham.information}</p>
                  </div>
                  <div className="tab-pane fade " id="reviews">
                    <div className="col-sm-12">
                      <ul>
                        <li><a href><i className="fa fa-user" />EUGEN</a></li>
                        <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                        <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                      </ul>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                      <p><b>Write Your Review</b></p>
                      <form action="#">
                        <span>
                          <input type="text" placeholder="Your Name" />
                          <input type="email" placeholder="Email Address" />
                        </span>
                        <textarea name defaultValue={""} />
                        <b>Rating: </b> <img src="../client/images/product-details/rating.png" alt="" />
                        <button type="button" className="btn btn-default pull-right">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>{/*/category-tab*/}
              <div className="recommended_items">{/*recommended_items*/}
                <h2 className="title text-center">recommended items</h2>
                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="item active">	
                    {first3product.map((el,index) => (
                      <div className="col-sm-4" key={index}>
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src={el.feature_image} alt="" />
                              <h2>{el.price}</h2>
                              <p>{el.name_product}</p>
                              <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                    <div className="item">	
                    {last3product.map((el,index) => (
                   
                        <div className="col-sm-4" key={index}>
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src={el.feature_image} alt="" />
                                  <h2>{el.price}</h2>
                                  <p>{el.name_product}</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                      </div>
                  </div>
                  <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                    <i className="fa fa-angle-left" />
                  </a>
                  <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                    <i className="fa fa-angle-right" />
                  </a>			
                </div>
              </div>{/*/recommended_items*/}
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}


export default Product

