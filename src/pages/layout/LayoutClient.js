import React from 'react';
import Header from '../../components/client/Header';
import Footer from '../../components/client/Footer';

export default ({ children ,danhsach}) => {
    return (
        <div className="user-page">
            <Header danhsach={danhsach}/>
            {/* <div className="content"> */}
                {children}
            {/* </div> */}
            <Footer />
        </div>
    )
}
