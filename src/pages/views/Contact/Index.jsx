import React from 'react'
import { useForm } from 'react-hook-form';
import apiRequest from '../../../api/contactApi';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';

const Contact = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const history = useHistory();
  function onSubmitContact (data){
    //  var target = event.target;
    console.log(data);
    apiRequest.createContact(data)
      .then(function (response) {
        Swal.fire({
            title: 'Chúng tôi đã nhận được liên hệ của bạn! ',
            icon: 'success',
            showCancelButton: false,
          }).then(function (response) {
             history.push('../../');
          })
      })
      .catch(function (error) {
        console.log(error);
      })
}

    return (
      <div id="contact-page" className="container">
      <div className="bg">
        <div className="row">    		
          <div className="col-sm-12">    			   			
            <h2 className="title text-center">LIÊN HỆ</h2>    			    				    				
            <div id="gmap" className="contact-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.010636745184!2d105.75155939506475!3d21.027630661867025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454bab9b67e93%3A0xbbe16aced529963f!2zTeG7uSDEkMOsbmgsIE5hbSBU4burIExpw6ptLCBIYW5vaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1596076563810!5m2!1sen!2s" width={1150} height={350} frameBorder={0} style={{border: 0}} allowFullScreen aria-hidden="false" tabIndex={0} />
            </div>
          </div>			 		
        </div>    	
        <div className="row">  	
          <div className="col-sm-8">
            <div className="contact-form">
              <h2 className="title text-center">Liên hệ</h2>
              <div className="status alert alert-success" style={{display: 'none'}} />
              <form className="contact-form row"  onSubmit={handleSubmit(onSubmitContact)}>
                <div className="form-group col-md-6">
                  <input type="text" name="name" className="form-control"  ref={register({ required: true})}  placeholder="Họ tên" />
                  {errors.name && <p style={{color:'red'}}>Hãy nhập họ tên bạn</p>}
                </div>
                <div className="form-group col-md-6">
                  <input type="email" name="email" className="form-control"  ref={register({ required: true})}  placeholder="Email" />
                  {errors.email && <p style={{color:'red'}}>Hãy nhập email</p>}
                </div>
                <div className="form-group col-md-12">
                  <textarea name="content" id="message"  ref={register({ required: true})}  className="form-control" rows={8} placeholder="Nội dung" defaultValue={""} />
                  {errors.content && <p style={{color:'red'}}>Hãy nhập nội dung</p>}
                </div>                        
                <div className="form-group col-md-12">
                  <input type="submit" className="btn btn-primary pull-right" defaultValue="Submit" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="contact-info">
              <h2 className="title text-center">Liên hệ với chúng tôi</h2>
              <address>
                <p>E-Shopper</p>
                <p>My Dinh 2, Từ Liêm, Hanoi</p>
                <p>Số điện thoại : 03899999799</p>
                <p>Email:@eshopper.gmail.com</p>
              </address>
              <div className="social-networks">
                <h2 className="title text-center">Trang mạng xã hội</h2>
                <ul>
                  <li>
                    <a href="#"><i className="fa fa-facebook" /></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-twitter" /></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-google-plus" /></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-youtube" /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>    			
        </div>  
      </div>	
    </div>
    )
}

export default Contact
