import React from 'react'
import Swal from 'sweetalert2'


function addCart(pro){

    const getStorge = localStorage.getItem('cart');
    function ganGiaTriKhoiTaoarrayCart(getStorge){
      if(getStorge == null){
        return [];
      }else{
        let getStorgeParse = JSON.parse(getStorge);
        return getStorgeParse;
      }
    }
    const arrayCart = ganGiaTriKhoiTaoarrayCart(getStorge);

    
    var id = pro.id;
    var cartStorage = localStorage.getItem('cart');
    var cartStorageParse =JSON.parse(cartStorage);
    if(cartStorage !== null){
    const findId = cartStorageParse.find(el => el.id == id);
    if(findId == undefined){
      arrayCart.push({'id':id,'number': 1,'name_product':pro.name_product,'price':pro.price,'feature_image':pro.feature_image});
    }else {
           cartStorageParse.map((value,index) => {
              if(value.id == id){
                arrayCart[index].number = value.number + 1 ;
              }
           });
    }
  }
  else if(cartStorage == null){
    arrayCart.push({'id':id,'number': 1,'name_product':pro.name_product,'price':pro.price,'feature_image':pro.feature_image});
  }
  return arrayCart;
}


export default {
    addCart
}