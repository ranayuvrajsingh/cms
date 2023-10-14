import { storage } from '../../services/config/storage';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { mainHeader } from '../../constants/header';
import { imagesUrl } from '../../constants/imagesUrl';
import InnerHeader from '../InnerHeader';
import './Header.scss';
import { Tooltip,Avatar } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../../store/auth/actions';
import { LogoutIcon, ProfileIcon} from '../../assets/svgs';




const Header = (props) => {
  const history = useHistory();
  const { parent } = props;
  const [renderonRouteChange, setRenderonRouteChange] = useState(true);
  const [activePath, setActivePath] = useState('');

  const handleRouteChange = (path) => {
    // setActivePath(path);
    // if (path === 'resources') history.push('/' + path + '/activities');
    // else
    history.push('/' + path);
    // setRenderonRouteChange(!renderonRouteChange);
  };

  useEffect(() => {
    setActivePath(history.location.pathname);
  }, []);

  async function signOut() {
    storage.destroy.all();
    history.push('/login');
    props.logout();
  }
  

  return (
    <div className="header-component">
      <div>
        <div className="main-header flex items-center justify-between">
          <Link to="/">{imagesUrl.icons.appLogo}</Link>

          <div className="category-container flex  justify-between">
            {mainHeader.map((item, index) => {
              let tab = (
                <div
                  onClick={() =>
                    !item.isComingSoon &&
                    handleRouteChange(item.title.toLowerCase())
                  }
                  key={index}
                  className={`${
                    item.isComingSoon ? 'cursor-default' : 'cursor-pointer'
                  } category-holder flex items-center ${
                    !item.isComingSoon &&
                    history.location.pathname.includes(item.title.toLowerCase())
                      ? 'active-category'
                      : ' '
                  }`}
                >
                  {/* <span className="menu-icon">{item.icon}</span> */}
                  <span className="category-name text-white semibold">
                    {item.title}
                  </span>
                </div>
              );
              if (item.isComingSoon) {
                tab = <Tooltip title={'Coming soon..'}>{tab}</Tooltip>;
              }
              return tab;
            })}
          </div>

          <div className="flex items-center">
            {/* <img
              className="cursor-pointer bell-icon mr-30"
              src={imagesUrl.icons.bell}
              alt="bell-icon"
            /> */}
            {/* <div className="user-info flex items-center"> */}
              {/* <Avatar size={30} src={imagesUrl.icons.user} className="avatar"/>
               */}
               {/* <ProfileIcon /> */}
            {/* </div> */}
            <div className="logout cursor-pointer" onClick={() => signOut()}>
              {/* <Tooltip placement="bottomRight" title="Click to log out">
                <PoweroffOutlined style={{ color: '#fff' }} />
              </Tooltip> */}
              <LogoutIcon />
            </div>
          </div>
        </div>
      </div>
      {parent === 'reports' && (
        <div className="sub-header">
          <InnerHeader parent={parent} />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: bindActionCreators(authActionCreators.logout, dispatch),
});

export default connect(null, mapDispatchToProps)(Header);
