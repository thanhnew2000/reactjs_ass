import React from 'react';
import Header from '../../components/client/Header';
import Footer from '../../components/client/Footer';
import '../../assets/client/css/animate.scss';
import '../../assets/client/css/main.scss';

export default ({ children ,danhsach}) => {
    return (
        <div className="layOutClient">
        <div className="user-page">
            <Header danhsach={danhsach}/>
            {/* <div className="content"> */}
                {children}
            {/* </div> */}
            <Footer />
        </div>
        </div>
    )
}
