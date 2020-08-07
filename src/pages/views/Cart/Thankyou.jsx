import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Thankyou(props) {
    return (
        <div>
            <div className="container text-center" 
            style={{backgroundImage: "url('https://i.pinimg.com/originals/4a/de/9a/4ade9a536cafc673fc92a6fa071b752f.gif')",height:'350px',width:'450px'}}
            >
                {/* <img src="https://thumbs.gfycat.com/SoftFaintIncatern-small.gif" height="700px" width="1000px" /> */}

                <div className="col-md-7">
                <Link to={'../../thongtincanhan/order/'} className="btn btn-primary ml-5" >Xem đơn hàng của bạn</Link>

                </div>
                <div className="col-md-5">
                <Link to={'../../'} className="btn btn-primary" >Tiếp tục mua hàng</Link>

                </div>

            </div>
        </div>
    )
}

Thankyou.propTypes = {

}

export default Thankyou

