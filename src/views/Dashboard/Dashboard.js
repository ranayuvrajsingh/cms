import {Input, Layout} from 'antd';
import React from 'react';
import AppHeader from '../../components/Header';
import '../common.scss';

const {Header, Content, Footer, Sider} = Layout;
const {Search} = Input;
export const Dashboard = (props) => {
    return (
        <div className="wrapper">
            
           
            <Header style={{ position: 'sticky', zIndex: 99, top: 0, width: '100%' }}>
                    <AppHeader/>
            </Header>
                {/* <h1>HIIIII</h1>  */}
                <h1> Welcome to Cityscope CMS</h1>
          
        </div>
    );
};
