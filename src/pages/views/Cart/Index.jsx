import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import functionAddCart from '../Cart/functionAddCart'

function Cart(props) {
    const cartJson = localStorage.getItem('cart');
    const [arrayCart, setarrayCart] = useState(cartJson == null ? [] : JSON.parse(cartJson))
    let total_weight = arrayCart.reduce((total, value ,index) => {
        return total += (value.price * value.number)
    }, 0)
    const [totalPrice, setTotalPrice] = useState(total_weight)
    // console.log(total_weight)
    const styleImg = {
        width:'100px',
    }

    function deleteCart(id){
     var arrayAfter = arrayCart.filter(el => el.id != id)
         setarrayCart(arrayAfter);
         let total_weight = arrayAfter.reduce((total, value ,index) => {
            return total += (value.price * value.number)
        }, 0)
        setTotalPrice(total_weight);
         var changeArraytoJson = JSON.stringify(arrayAfter)
         localStorage.setItem('cart',changeArraytoJson)
         functionAddCart.countCart()
    }

    function addNumberCart(id){
        var newArray =[...arrayCart];
        newArray.map((value,index) => {
            if(value.id == id){
              arrayCart[index].number = value.number + 1 ;
            }
         });
         let total_weight = newArray.reduce((total, value ,index) => {
            return total += (value.price * value.number)
        }, 0)
         setarrayCart(newArray);
         setTotalPrice(total_weight);
         var changeArraytoJson = JSON.stringify(newArray)
         localStorage.setItem('cart',changeArraytoJson)

         
         functionAddCart.countCart()

    }
    const minusNumberCart = (id) => { 
        var newArray =[...arrayCart];
        newArray.map((value,index) => {
            if(value.id == id){
              arrayCart[index].number = value.number - 1 ;
            }
         });
         let total_weight = newArray.reduce((total, value ,index) => {
            return total += (value.price * value.number)
        }, 0)
         setarrayCart(newArray);
         setTotalPrice(total_weight);
         var changeArraytoJson = JSON.stringify(newArray)
         localStorage.setItem('cart',changeArraytoJson)

         functionAddCart.countCart()

    }

    
    function formatMoney(price) {
        return functionAddCart.formatMoney(price)
      }

    return (
        <div>
             <div>
                <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li className="active">Shopping Cart</li>
                    </ol>
                    </div>
                    <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                        <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description" />
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td />
                        </tr>
                        </thead>
                        <tbody>
                        {arrayCart.map((el,index) =>(
                            <tr key={index}>
                            <td className="cart_product">
                            <a href><img src={el.feature_image} style={styleImg}  alt="" /></a>
                            </td>
                            <td className="cart_description">
                            <h4><a href>{el.name_product}</a></h4>
                            <p>Web ID: {el.id}</p>
                            </td>
                            <td className="cart_price">
                            <p>{formatMoney(el.price)}</p>
                            </td>
                            <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a className="cart_quantity_up" onClick={()=>addNumberCart(el.id)} > + </a>
                                <input className="cart_quantity_input" type="text" disabled id={'number'+el.id} name="quantity" value={el.number} autoComplete="off" size={2} />
                                <a className="cart_quantity_down"  
                                onClick={()=>minusNumberCart(el.id)}
                                > - </a>
                            </div>
                            </td>
                            <td className="cart_total">
                            <p className="cart_total_price">{formatMoney(el.price*el.number)}</p>
                            </td>
                            <td className="cart_delete">
                            <a onClick={()=>deleteCart(el.id)} className="cart_quantity_delete" href><i className="fa fa-times" />
                            </a>
                            </td>
                        </tr>
                        ))}
             


                        </tbody>
                    </table>
                    </div>
                    <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-3">
                                <h4>Tổng tiền : {formatMoney(totalPrice)}</h4>
                                <Link to={'/gio-hang/thanh-toan'} className="btn btn-primary">Thanh toan</Link>
                                </div>
                    </div>
                </div>
                </section> {/*/#cart_items*/}
                <section id="do_action">
                <div className="container">
                    {/* <div className="heading">
                    <h3>What would you like to do next?</h3>
                    <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                    <div className="col-sm-6">
                        <div className="chose_area">
                        <ul className="user_option">
                            <li>
                            <input type="checkbox" />
                            <label>Use Coupon Code</label>
                            </li>
                            <li>
                            <input type="checkbox" />
                            <label>Use Gift Voucher</label>
                            </li>
                            <li>
                            <input type="checkbox" />
                            <label>Estimate Shipping &amp; Taxes</label>
                            </li>
                        </ul>
                        <ul className="user_info">
                            <li className="single_field">
                            <label>Country:</label>
                            <select>
                                <option>United States</option>
                                <option>Bangladesh</option>
                                <option>UK</option>
                                <option>India</option>
                                <option>Pakistan</option>
                                <option>Ucrane</option>
                                <option>Canada</option>
                                <option>Dubai</option>
                            </select>
                            </li>
                            <li className="single_field">
                            <label>Region / State:</label>
                            <select>
                                <option>Select</option>
                                <option>Dhaka</option>
                                <option>London</option>
                                <option>Dillih</option>
                                <option>Lahore</option>
                                <option>Alaska</option>
                                <option>Canada</option>
                                <option>Dubai</option>
                            </select>
                            </li>
                            <li className="single_field zip-field">
                            <label>Zip Code:</label>
                            <input type="text" />
                            </li>
                        </ul>
                        <a className="btn btn-default update" href>Get Quotes</a>
                        <a className="btn btn-default check_out" href>Continue</a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="total_area">
                        <ul>
                            <li>Cart Sub Total <span>$59</span></li>
                            <li>Eco Tax <span>$2</span></li>
                            <li>Shipping Cost <span>Free</span></li>
                            <li>Total <span>$61</span></li>
                        </ul>
                        <a className="btn btn-default update" href>Update</a>
                        <a className="btn btn-default check_out" href>Check Out</a>
                        </div>
                    </div>
                    </div> */}
                </div>
        </section>{/*/#do_action*/}
      </div>
        </div>
    )
}

Cart.propTypes = {

}

export default Cart

