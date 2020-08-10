import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
} from "react-router-dom";
import Header from '../components/client/Header';
// import Home from '../components/client/Home';
// import Categorie from '../components/client/Categorie';
// import Contact from '../components/client/Contact';
// import Product from '../components/client/Product';
// import Cart from '../components/client/Cart';
import LayoutClient from '../pages/layout/LayoutClient';

// client

import Home from '../pages/views/Home/Index';
import Product from '../pages/views/Product/Index';
import Categorie from '../pages/views/Categories/Index';
import Cart from '../pages/views/Cart/Index';
import Contact from '../pages/views/Contact/Index';
import Dashboard from '../pages/views/Admin/Dashboard/Index';
import ProductAdmin from '../pages/views/Admin/Product/Index';
import LayoutAdmin from '../pages/layout/LayoutAdmin';
import AddProduct from '../pages/views/Admin/Product/AddProduct';
import EditProduct from '../pages/views/Admin/Product/EditProduct';
import CategoryAdmin from '../pages/views/Admin/Category/Index';
import EditCategory from '../pages/views/Admin/Category/EditCategory';
import AddCategory from '../pages/views/Admin/Category/AddCategory';
import ContactAdmin from '../pages/views/Admin/Contact/Index';
import EditContact from '../pages/views/Admin/Contact/EditContact';
import Search from '../pages/views/Search/Index';
import Register from '../pages/views/Users/Register';
import Login from '../pages/views/Users/Login';
import Info from '../pages/views/Users/Info/Index';
import Doimatkhau from '../pages/views/Users/Info/Doimatkhau';
import CountPay from '../pages/views/Cart/CountPay';
import OrderAdmin from '../pages/views/Admin/Order/Index';
import EditOrder from '../pages/views/Admin/Order/EditOrder';
import OrderClient from '../pages/views/Users/Order/Index';
import DetailOrderClient from '../pages/views/Users/Order/DetailOrderClient';
import Thankyou from '../pages/views/Cart/Thankyou';
import Blog from '../pages/views/Blog/Index';
import PostAdmin from '../pages/views/Admin/Post/Index';
import EditPost from '../pages/views/Admin/Post/EditPost';
import AddPost from '../pages/views/Admin/Post/AddPost';
import CatePost from '../pages/views/Admin/CatePost/Index';
import AddCatePost from '../pages/views/Admin/CatePost/AddCatePost';
import EditCatePost from '../pages/views/Admin/CatePost/EditCatePost';
import Page from '../pages/views/Blog/Page';
import PostOfCate from '../pages/views/Blog/PostOfCate';
import Post from '../pages/views/Post/Index';
import CatePostClient from '../pages/views/CatePost/Index';
import Account from '../pages/views/Admin/Account/Index';
import EditAccount from '../pages/views/Admin/Account/EditAccount';
import SlideAdmin from '../pages/views/Admin/Slide/Index';
import EditSlide from '../pages/views/Admin/Slide/EditSlide';

const RouteApp = ({products, slide, danhsach}) => {
    return (
        <div>
         <Router>
            <Switch>
                <Route path="/admin/:path?/:path?" exact>
                    <LayoutAdmin>
                        <Switch>
                            <Route path='/admin' exact>
                            {/* <p>hihi</p> */}
                                <Dashboard />
                            </Route>
                            <Route path='/admin/products' exact>
                              <ProductAdmin applistProducts={products} danhsach={danhsach}/>
                            </Route>
                            <Route path='/admin/products/add'>
                              <AddProduct danhsach={danhsach}/>
                            </Route>
                            <Route path='/admin/products/:id'>
                              <EditProduct danhsach={danhsach}/>
                            </Route>

                            <Route path='/admin/danhmuc' exact>
                              <CategoryAdmin danhsach={danhsach}/>
                            </Route>
                            <Route path='/admin/danhmuc/add'>
                              <AddCategory />
                            </Route>
                            <Route path='/admin/danhmuc/:id'>
                              <EditCategory danhsach={danhsach}/>
                            </Route>
                            
                            <Route path='/admin/contacts' exact>
                              <ContactAdmin />
                            </Route>
                            <Route path='/admin/contacts/:id'>
                              <EditContact danhsach={danhsach}/>
                            </Route>

                            <Route path='/admin/order' exact>
                              <OrderAdmin />
                            </Route>

                            <Route path='/admin/order/:id' exact>
                              <EditOrder />
                            </Route>


                            <Route path="/admin/post" exact>
                              <PostAdmin/> 
                            </Route>

                            <Route path="/admin/post/add" exact>
                              <AddPost/> 
                            </Route>

                              <Route path="/admin/post/:id" exact>
                                 <EditPost/> 
                              </Route>

                              <Route path="/admin/catepost" exact>
                                <CatePost/> 
                              </Route>

                              <Route path="/admin/catepost/add" exact>
                                <AddCatePost/> 
                              </Route>
                              <Route path="/admin/catepost/:id" exact>
                                <EditCatePost/> 
                              </Route>


                              <Route path="/admin/tai-khoan" exact>
                                <Account/> 
                              </Route>

                              <Route path="/admin/tai-khoan/:id" exact>
                                <EditAccount/> 
                              </Route>

                              <Route path="/admin/slide-show" exact>
                                <SlideAdmin/> 
                              </Route>

                              <Route path="/admin/slide-show/:id" exact>
                                <EditSlide/> 
                              </Route>
                        </Switch>
                    </LayoutAdmin>
                </Route>
                <Route>
                  <LayoutClient danhsach={danhsach}>
                        <Switch>
                            <Route path="/" exact>
                                <Home danhsach = {danhsach} slide={slide} products={products}/>
                                {/* <p>client1</p> */}
                            </Route>
                           <Route path="/danh-muc/:id" exact>
                              <Categorie danhsach={danhsach} products2={products} /> 
                           </Route>
                           <Route path="/lien-he" exact>
                              <Contact/> 
                           </Route>
                           <Route path="/post" exact>
                              <Blog/> 
                           </Route>
                            <Route path="/category-post/:id" >
                              <CatePostClient/> 
                           </Route>
                           <Route path="/post/:id/:idcate" >
                              <Post/> 
                           </Route>

                           <Route path="/san-pham/:id/:id_cate"  exact>
                              <Product  danhsach={danhsach} products={products} /> 
                           </Route>
                           <Route path="/gio-hang"  exact>
                              <Cart  danhsach={danhsach} products3={products} /> 
                           </Route>
                           <Route path="/gio-hang/thanh-toan" exact >
                              <CountPay  danhsach={danhsach} products3={products} /> 
                           </Route>

                           <Route path="/thankyou" >
                              <Thankyou  danhsach={danhsach} products3={products} /> 
                           </Route>

                           <Route path="/tim-kiem/:key" >
                              <Search  danhsach={danhsach} products3={products} /> 
                           </Route>

                           <Route path="/thongtincanhan" exact >
                              <Info /> 
                           </Route>
                           <Route path="/doi-mat-khau" >
                              <Doimatkhau /> 
                           </Route>

                           <Route path="/thongtincanhan/order" exact >
                              <OrderClient /> 
                           </Route>

                           <Route path="/thongtincanhan/order/:id" >
                              <DetailOrderClient /> 
                           </Route>

                           <Route path="/dangky" >
                              <Register /> 
                           </Route>

                           <Route path="/dangnhap" >
                              <Login /> 
                           </Route>

                        </Switch>
                    </LayoutClient>
                </Route>
            </Switch>
        </Router>
      
        </div>
    )
}

export default RouteApp
