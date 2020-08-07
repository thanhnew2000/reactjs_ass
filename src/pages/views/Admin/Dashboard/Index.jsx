import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiRequest from '../../../../api/orderApi';
import axios from 'axios';

function Dashboard(props) {
  const [total,setTotal] = useState([]);

  useEffect(() => {
    async function getAllOrdersTotal(){
         try{
             const {data} = await apiRequest.dashBoardTotal();
             setTotal(data)
             console.log(data)
         }catch(error){
           console.log(error);
         }
       }
       getAllOrdersTotal()
 }, [])

    return (
        <div>
            <section className="content">
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box bg-aqua">
              <div className="inner">
                <h3>{total[0]}</h3>
                <p>Tổng đơn hàng</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box bg-green">
              <div className="inner">
                <h3>  {total[1]}</h3>
                <p>Tổng sản phẩm</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box bg-yellow">
              <div className="inner">
                <h3>{total[2]}</h3>
                <p>Tổng tài khoản</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box bg-red">
              <div className="inner">
                <h3>{total[3]}</h3>
                <p>Tổng liên hệ chưa xem</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
        </div>
        {/* /.row */}
        {/* Main row */}
        <div className="row">
      
        </div>
        {/* /.row (main row) */}
      </section>  
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard

