import React from 'react';
import TopBar from '../../components/admin/TopBar';
import Footer from '../../components/admin/Footer';
import SideBar from '../../components/admin/SideBar';

export default ({ children}) => {
    return (
        <div className="hold-transition skin-blue sidebar-mini">
            <TopBar />
            <SideBar/>
            <div class="content-wrapper">
                {children}
            </div>
            <Footer />
        </div>
    )
}
