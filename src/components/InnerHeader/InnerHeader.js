import { Menu } from 'antd';
import React, { useState } from 'react';
import './InnerHeader.scss';
import { Tooltip } from 'antd';

const InnerHeader = ({ data, onclick, activeCount = 0, ...props }) => {
  const [current, setCurrent] = useState(data[0]?.label?.toLowerCase());

  if (data?.length === 0) return null;
  return (
    <div className="inner-header-component">
      <div className="inner-header flex items-center justify-center">
        <Menu defaultSelectedKeys={current} mode="horizontal">
          {data.map((label, index) => (
            <Menu.Item
              onClick={(e) => {
                if (!label.isComingSoon) {
                  onclick(label?.label.toLowerCase());
                  setCurrent(label?.label.toLowerCase());
                }
              }}
              disabled={!label.isComingSoon ? false : true}
              key={[label?.label.toLowerCase()]}
              className={`${
                label.isComingSoon
                  ? 'cursor-default,disabled-menu'
                  : 'cursor-pointer,selected-menu'
              }`}
            >
              {!label.isComingSoon ? (
                label.label
              ) : (
                <Tooltip title={'Coming soon..'}>{label.label}</Tooltip>
              )}
              {label?.label.toLowerCase() === current && (
                <div className={'count-container'}>
                  <span className={'count'}>{activeCount}</span>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default InnerHeader;
