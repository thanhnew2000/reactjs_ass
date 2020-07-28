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
                              <ProductAdmin products={products}/>
                                {/* <ProductsManager  onRemove={onHandleRemove} /> */}
                            </Route>
                            <Route path='/admin/products/add'>
                              <AddProduct/>
                            </Route>
                            <Route path='/admin/products/:id'>
                              <EditProduct/>
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
                           <Route path="/san-pham/:id" >
                              <Product  danhsach={danhsach} products={products} /> 
                           </Route>
                           <Route path="/gio-hang" >
                              <Cart  danhsach={danhsach} products3={products} /> 
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
