import {notification} from 'antd';
import React from 'react';
import './Toast.scss';
import ToastTemplate from './ToastTemplate';
import {imagesUrl} from '../../constants/imagesUrl';

const Toast = (
    type = 'success',
    description = '',
    message = '',
    placement = 'topRight'
) => {
    notification.open({
        className: 'toster',
        placement,
        duration: 2,
        closeIcon: imagesUrl.icons.cancelBlackBackground,
        description: (
            <ToastTemplate type={type} description={description} message={message}/>
        ),
    });
};

export default Toast;
