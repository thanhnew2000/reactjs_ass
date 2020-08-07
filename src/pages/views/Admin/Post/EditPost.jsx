import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import apiRequest from '../../../../api/postApi';
import apiRequestCate from '../../../../api/postCateApi';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

function EditPost(props) {
    const [catePost,setCatePost] = useState([]);
    const [onePost,setOnePost] = useState({});
    const [content,setContent] = useState('');
    const history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm();

    let { id }  = useParams();
    useEffect(() => {
        async function getOnlyOnePost(){
          try{
            const {data} = await apiRequest.getPost(id);
            setOnePost(data);
            setContent(data.content);
          }catch(error){
            console.log(error);
          }
        }
        getOnlyOnePost()
      }, []);

      useEffect(() => {
        async function getAllCatePost(){
          try{
            const {data} = await apiRequestCate.getAllPostCate();
            setCatePost(data);
          }catch(error){
            console.log(error);
          }
        }
        getAllCatePost()
      }, []);

      const onHandleChange = (e) => {
        const {name,value} = e.target
        setOnePost({
            ...onePost,
            [name]:value
        })
    }

      function onSubmit (data){
        // let data = onePost;
         data.image =  document.querySelector('#show_img').src;
         data.content = content;
         apiRequest.updatePost(id,data)
         .then(function (response) {
           console.log(response);
           Swal.fire({
             title: 'Cập nhập thành công ',
             icon: 'success',
             showCancelButton: false,
             times:1500,
           }).then(function (response) {
              history.push('../../admin/post');
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

    const onInfoChange = (content, editor) => {
        setContent(content.level.content);
      }
    return (
        <div>
            <div className="container">
                <form action=""  onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-5">
                        <div className="form-group">
                                <label htmlFor="" >Trạng thái</label>
                                <select name="status" ref={register} className="form-control">
                                <option value="1" selected={onePost.status == 1 ? 'true' : ''}>Ẩn</option>
                                <option value="2" selected={onePost.status == 2 ? 'true' : ''} >Published</option>
                                </select>
                         </div>

                            <div className="form-group">
                                <label htmlFor="">Tiêu đề</label>
                                <input type='text' className="form-control" name="title" ref={register({ required: true , minLength:2, pattern:/^[^\s].*/  })}  onChange={onHandleChange}  value={onePost.title} />
                              {errors.title && <p style={{color:'red'}}>Bạn chưa tiêu đề và ít nhất 2 ký tự</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Short_description</label>
                                <input type='text' className="form-control" name="short_description" ref={register({ required: true })} value={onePost.short_description} />
                                {errors.short_description && <p style={{color:'red'}}>Bạn chưa mô tả ngắn</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="" >Danh mục</label>
                                <select name="id_cate" ref={register} className="form-control">
                                {catePost.map(el => (
                                 <option selected={el.id == onePost.id_cate} value={el.id}>{el.name_cate} </option>
                                ))}                              
                                </select>
                         </div>
                            <div className="form-group">
                            <label htmlFor="">Ảnh</label>
                            <input  type="file" className="form-control" name="image" onChange={loadImageFileAsURL} id="images" />
                            {/* <input type="text" className="form-control"  ref={register({ required: true })} name="feature_image"   onChange={onHandleChange} placeholder="Ảnh sản phẩm" /> */}
                          </div>

                        </div>
                    <div className="col-md-5">
                        <div className="box box-info  pull-right">
                              <img id="show_img" src={onePost.image} width="300px" />
                        </div>
                    </div>
                    <div className="col-md-10">
                    <label >Nội dung</label>
                    <br/>
                        <div>
                        <Editor value={content}  onChange={onInfoChange} />
                        </div>
                    <br/>
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                     <button type="submit" className=" float-right btn btn-primary">Cập nhập</button>
                    </div>

                    </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

EditPost.propTypes = {

}

export default EditPost

