import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/slideApi';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

function EditSlide(props) {
    const [oneSlide,setOneSlide] = useState({});
    const history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm();

    let { id }  = useParams();
    useEffect(() => {
        async function getOnlyOneSlide(){
          try{
            const {data} = await apiRequest.getOneSlide(id);
            setOneSlide(data);
          }catch(error){
            console.log(error);
          }
        }
        getOnlyOneSlide()
      }, []);

      const onHandleChange = (e) => {
        const {name,value} = e.target
        setOneSlide({
            ...oneSlide,
            [name]:value
        })
    }

      function onSubmit (data){
         data.image =  document.querySelector('#show_img').src;
         apiRequest.updateSlide(id,data)
         .then(function (response) {
           console.log(response);
           Swal.fire({
             title: 'Cập nhập thành công ',
             icon: 'success',
             showCancelButton: false,
             times:1500,
           }).then(function (response) {
              history.push('../../admin/slide-show');
           })
         })
         .catch(function (error) {
           console.log(error);
         })
   }

      const loadImageFileAsURL = (e) => {
        var file = e.target
        var fileSelected = file.files;
        if(fileSelected.length > 0 ){
            var fileToLoad = fileSelected[0];
            var fileReader = new FileReader();
            fileReader.onload= function(fileloadEvent){
                var srcData= fileloadEvent.target.result; 
                document.querySelector('#show_img').src=srcData
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }


    return (
        <div>
            <div className="container">
                <form action=""  onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="">Tiêu đề</label>
                                <input type='text' className="form-control" name="title" ref={register({ required: true , minLength:2, pattern:/^[^\s].*/  })}  onChange={onHandleChange}  value={oneSlide.title} />
                               {errors.title && <p style={{color:'red'}}>Bạn chưa tiêu đề và ít nhất 2 ký tự</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Mô tả ngắn</label>
                                <textarea className="form-control" name="content" ref={register({ required: true , minLength:2, maxLength: 400,pattern:/^[^\s].*/  })}  onChange={onHandleChange}  value={oneSlide.content} />
                                {errors.content && <p style={{color:'red'}}>Nhập mô tả và ít nhất 2 ký tự nhiều nhất 400 ký tự</p>}
                            </div>
                    
                            <div className="form-group">
                            <label htmlFor="">Ảnh</label>
                            <input  type="file" className="form-control" name="image" onChange={loadImageFileAsURL} id="images" />
                          </div>

                        </div>
                    <div className="col-md-5">
                        <div className="box box-info  pull-right">
                              <img id="show_img" src={oneSlide.image} width="300px" />
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="col-md-11"></div>
                        <div className="col-md-1">
                        <button type="submit" className=" float-right btn btn-primary">Cập nhập</button>
                        </div>

                    </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

EditSlide.propTypes = {

}

export default EditSlide

