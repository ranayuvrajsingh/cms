import React from 'react';
import './Loading.scss';
import Loader from '../../assets/svgs/loader.svg';

const Loading = () => {
  return (
    <div className="loading">
      <img alt={'loading...'} style={{ width: '100px' }} src={Loader} />
    </div>
  );
};
export default Loading;
