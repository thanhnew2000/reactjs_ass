import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import apiRequest from '../../../api/productApi';
import Swal from 'sweetalert2'
import functionAddCart from '../Cart/functionAddCart'
import '../../../../src/assets/client/css/menudrop.scss'

const Home = (props) => {

  // function countCart(){
  //   var localCart = localStorage.getItem('cart');
  //   var localCartParse = JSON.parse(localCart);
  //   if(localCart !== null){
  //     document.querySelector('.borderCart').innerHTML =localCartParse.length
  //   }
  // }

  function addCart(pro){
    functionAddCart.addCart(pro)
  }

  // function addCart(pro){
  //    const arrayCart2 = functionAddCart.addCart(pro)
  //     var arrayCartJson = JSON.stringify(arrayCart2);
  //     localStorage.setItem('cart',arrayCartJson);
  //     countCart();
  //     Swal.fire({
  //       title: 'Thêm giỏ hàng thành công ',
  //       icon: 'success',
  //       showCancelButton: false,
  //       times:1000,
  //     })
  // }

  
 

  const {products} = props;
  var indexProducts = products.filter((el,index) => index <= 8);
  const {slide} = props;
  const {danhsach} = props;
  const danhsachNew = danhsach.filter(el => el.id != 1);
  const check = '';

  const [AdidasPro,setAdidasPro] = useState([]);
  const [NikePro,setNikePro] = useState([]);
  const [GiayDaNamPro,setDaNamPro] = useState([]);
  const [VansPro,setVansPro] = useState([]);

  useEffect(() => {
    async function get4Productfor5cates(){
      try{
        const {data} = await apiRequest.get4productFor5cate()
        setAdidasPro(data.adidas)
        setNikePro(data.nikes)
        setVansPro(data.vans)
        setDaNamPro(data.giayda)
        functionAddCart.countCart()
        // setValueInput(data);
      }catch(error){
        console.log(error);
      }
    }
    get4Productfor5cates()
  }, []);

  function formatMoney(price) {
    return functionAddCart.formatMoney(price)
  }
  function giamGia(old_price,price){
    var phantram = (Math.round(((old_price - price)/old_price)*100))+'%';
    return phantram;
  }

    return (
      <div>
      <section id="slider">{/*slider*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                    <li data-target="#slider-carousel" data-slide-to={0} className="active" />
                    <li data-target="#slider-carousel" data-slide-to={1} />
                    <li data-target="#slider-carousel" data-slide-to={2} />
                  </ol>
                  <div className="carousel-inner">
                    {slide.map((sl,index) => (
                      <div className={index == 0 ? 'item active' : 'item'} key={index}>
                      <div className="col-sm-6">
                        <h1><span>E</span>-SHOPPER</h1>
                        <h2>{sl.title}</h2>
                        <p>{sl.content} </p>
                        {/* <button type="button" className="btn btn-default get"></button> */}
                        <br/>
                        <br/>
                      </div>
                      <div className="col-sm-6">
                        <img src={sl.image} className="girl img-responsive" alt="" />
                        {/* <img src="client/images/home/pricing.png" className="pricing" alt="" /> */}
                      </div>
                    </div>
                 ))}
                  </div>
                  <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                    <i className="fa fa-angle-left" />
                  </a>
                  <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>{/*/slider*/}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="left-sidebar">
                  <h2>Category</h2>
                  <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                    {danhsachNew.map((ds,index) => (
                    <div className="panel panel-default" key={index}>
                      <div className="panel-heading">
                         <h4 className="panel-title">
                           <Link to={'../danh-muc/'+ds.id}>{ds.name_category}</Link></h4>
                      </div>
                    </div>
                ))}
                  </div>{/*/category-products*/}

                  {/*/price-range*/}
                  <div className="shipping text-center">{/*shipping*/}
                    <img src="client/images/home/shipping.jpg" alt="" />
                  </div>{/*/shipping*/}
                </div>
              </div>
              <div className="col-sm-9 padding-right">
                <div className="features_items">{/*features_items*/}
                  <h2 className="title text-center">Features Items</h2>
                  {indexProducts.map((pro,index) => (
                  <div className="col-sm-4" key={index}>
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
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>{pro.name_product}</h2>
                            <p>{pro.short_description}</p>
                            <span style={{display: pro.quantity <= 0 ? 'none' : ''}} onClick={() => addCart(pro)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</span>
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
                </div>{/*features_items*/}
                <div className="category-tab">{/*category-tab*/}
                  <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                      <li className="active"><a href="#nikes" data-toggle="tab">Nikes</a></li>
                      <li><a href="#adidas" data-toggle="tab">Adidas</a></li>
                      <li><a href="#vans" data-toggle="tab">Vans</a></li>
                      <li><a href="#giaydanam" data-toggle="tab">Giầy Da Nam</a></li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade active in" id="nikes">
                      {NikePro.map((el,index) => (
                      <div className="col-sm-3" key={index}>
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">

                            <p className="containerImage">
                          <img src={el.feature_image} alt="" height='150px' />
                          <p  className="top-left" style={{color:'white',fontSize:'17px',display:el.old_price == 0 ? 'none'  : ''}}>
                            Sale {giamGia(el.old_price,el.price)}</p>
                         </p>
                         <span align="center" style={{color:'#c8c8c8',textDecoration: 'line-through',display:el.old_price == 0 ? 'none'  : ''}}>
                           {formatMoney(el.old_price)}
                         </span> 
                          <span style={{fontSize:'20px',color:'#FE980F',fontWeight:'BOLD'}}> {formatMoney(el.price)}</span>



                              <p>{el.name_product}</p>
                              <span onClick={() => addCart(el)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>

                    <div className="tab-pane fade" id="adidas">
                    {AdidasPro.map((el,index) => (
                      <div className="col-sm-3" key={index}>
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                            <img src={el.feature_image}  alt="" />
                             <h2>{formatMoney(el.price)}</h2>
                              <p>{el.name_product}</p>
                              <span onClick={() => addCart(el)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>


                    <div className="tab-pane fade" id="vans">
                    {VansPro.map((el,index) => (
                      <div className="col-sm-3" key={index}>
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                            <img src={el.feature_image}  alt="" />
                             <h2>{formatMoney(el.price)}</h2>
                              <p>{el.name_product}</p>
                              <span onClick={() => addCart(el)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>

                    <div className="tab-pane fade" id="giaydanam">
                    {GiayDaNamPro.map((el,index) => (
                      <div className="col-sm-3" key={index}>
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                            <img src={el.feature_image}  alt="" />
                             <h2>{formatMoney(el.price)}</h2>
                              <p>{el.name_product}</p>
                              <span onClick={() => addCart(el)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>{/*/category-tab*/}
              </div>
            </div>
          </div>
        </section>
      </div>

    )
}

export default Home
