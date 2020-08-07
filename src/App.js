import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/client/Header';
// import Home from './components/client/Home';
// import Footer from './components/client/Footer';
// import Categorie from './components/client/Categorie';
import RouteApp from './route/Route';
import axios from 'axios';
import {
  BrowserRouter as Router,Route,
  Link,
  Redirect,
} from "react-router-dom";
// import Pagination from './components/client/Pagination';
import apiRequest from './api/productApi';


function App() {
  
  const [danh_sach, setDanhSach] = useState([]);
  const [san_pham, setSanPham] = useState([]);
  const [slide, setSlide] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerpage] = useState(2);

  useEffect(() => {
    async function getList(){
      try{
        const {data} = await axios.get("http://localhost:8000/api/cate");
        // let newDatas = data.filter((el,index)=> (el.id != 999))
        setDanhSach(data);
      }catch(error){
        console.log(error);
      }
    }
    getList()
  }, []);

  useEffect(() => {
    async function getListProduct(){
      try{
        const {data} = await apiRequest.getAll();
        setSanPham(data);
      }catch(error){
        console.log(error);
      }
    }
    getListProduct()
  }, []);

  useEffect(() => {
    async function getSlideShow(){
      try{
        const {data} = await axios.get("http://localhost:8000/api/slides");
        setSlide(data);
      }catch(error){
        console.log(error);
      }
    }
    getSlideShow()
  }, []);

  const indexOflastProduct = currentPage * productPerpage;
  const indexOfFirstProduct = indexOflastProduct - productPerpage;
  const currentProduct = san_pham.slice(indexOfFirstProduct,indexOflastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div>
    <div className="App">
      <RouteApp products={san_pham}
       slide={slide}
       danhsach={danh_sach}
      />
    </div>
      {/* <Router>
        <Header danhsach={danh_sach}/>
          <RouteApp danhsach={danh_sach} slide={slide} products={san_pham}/> */}
          {/* <Pagination productPerPage={productPerpage} totolProduct={san_pham.length} paginate={paginate}/> */}
        {/* <Footer/>
      </Router> */}
    </div>

  );
}

export default App;
