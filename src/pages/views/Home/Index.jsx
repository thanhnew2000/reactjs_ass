import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import apiRequest from '../../../api/productApi';
import Swal from 'sweetalert2'
import functionAddCart from '../Cart/functionAddCart'
const Home = (props) => {
  // const getStorge = localStorage.getItem('cart');
  // function ganGiaTriKhoiTaoarrayCart(getStorge){
  //   if(getStorge == null){
  //     return [];
  //   }else{
  //     let getStorgeParse = JSON.parse(getStorge);
  //     return getStorgeParse;
  //   }
  // }
  // const arrayCart = ganGiaTriKhoiTaoarrayCart(getStorge);

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
  // function addCart(pro){
  //     var id = pro.id;
  //     var cartStorage = localStorage.getItem('cart');
  //     var cartStorageParse =JSON.parse(cartStorage);
  //     if(cartStorage !== null){
  //     const findId = cartStorageParse.find(el => el.id == id);
  //     if(findId == undefined){
  //       arrayCart.push({'id':id,'number': 1,'name_product:':pro.name_product,'price':pro.price,'feature_image':pro.feature_image});
  //     }else {
  //            cartStorageParse.map((value,index) => {
  //               if(value.id == id){
  //                 arrayCart[index].number = value.number + 1 ;
  //               }
  //            });
  //     }
  //   }
  //   else if(cartStorage == null){
  //     arrayCart.push({'id':id,'number': 1,'name_product:':pro.name_product,'price':pro.price,'feature_image':pro.feature_image});
  //   }
  //     var arrayCartJson = JSON.stringify(arrayCart);
  //     localStorage.setItem('cart',arrayCartJson);

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
        // setValueInput(data);
      }catch(error){
        console.log(error);
      }
    }
    get4Productfor5cates()
  }, []);


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
                          <img src={pro.feature_image} alt="" />
                        <h2>{pro.price}</h2>
                          <p>{pro.name_product}</p>
                          {/* <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</a> */}
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>{pro.name_product}</h2>
                            <p>{pro.short_description}</p>
                            <span onClick={() => addCart(pro)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm giỏ hàng</span>
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
                              <img src={el.feature_image}  alt="" />
                             <h2>{el.price}</h2>
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
                             <h2>{el.price}</h2>
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
                             <h2>{el.price}</h2>
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
                             <h2>{el.price}</h2>
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

                {/* <div className="recommended_items">
                  <h2 className="title text-center">recommended items</h2>
                  <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                      <div className="item active">	
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="client/images/home/recommend1.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="client/images/home/recommend2.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="client/images/home/recommend3.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">	
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="client/images/home/recommend1.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="client/images/home/recommend2.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="client/images/home/recommend3.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                      <i className="fa fa-angle-left" />
                    </a>
                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                      <i className="fa fa-angle-right" />
                    </a>			
                  </div>
                </div> */}
        
              </div>
            </div>
          </div>
        </section>
      </div>

    )
}

export default Home
