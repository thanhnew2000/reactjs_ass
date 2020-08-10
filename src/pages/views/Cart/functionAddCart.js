import React from 'react'
import Swal from 'sweetalert2'
import functionAddCart from '../Cart/functionAddCart'

function addCartDetail(pro){

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

function countCart(){
  var localCart = localStorage.getItem('cart');
  var localCartParse = JSON.parse(localCart);
  if(localCart !== null){
    document.querySelector('.borderCart').innerHTML =localCartParse.length
    document.querySelector('.borderCart2').innerHTML =localCartParse.length
  }
}

function addCart(pro){
  const arrayCart2 = addCartDetail(pro)
   var arrayCartJson = JSON.stringify(arrayCart2);
   localStorage.setItem('cart',arrayCartJson);
   countCart();
   Swal.fire({
     title: 'Thêm giỏ hàng thành công ',
     icon: 'success',
     showCancelButton: false,
     times:1000,
   })
}

function formatMoney(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}


export default {
    addCartDetail,
    countCart,
    addCart,
    formatMoney
}