import React from 'react';
import TopBar from '../../components/admin/TopBar';
import Footer from '../../components/admin/Footer';
import SideBar from '../../components/admin/SideBar';
import { useHistory } from 'react-router-dom';

export default ({ children}) => {
  var localUser = localStorage.getItem('user');
  const history = useHistory();
  var localUserParse = JSON.parse(localUser)
  if(localUser == null || localUserParse.roles !== 2 ){
    history.push('../../');
  }

    return (
        
        <div className="hold-transition skin-blue sidebar-mini">
            <body className="hold-transition skin-blue sidebar-mini">
                <div className="wrapper">

            <TopBar />
            <SideBar/>
            <div className="content-wrapper">
                {children}
            </div>
            <Footer />
            </div>

            </body>

        </div>
    )
}
