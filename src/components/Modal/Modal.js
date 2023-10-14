import {Modal as AntdModal} from 'antd';
import React from 'react';
import {imagesUrl} from '../../constants/imagesUrl';

import './Modal.scss';

const Modal = (props) => {
    const {className, children, backdropClosable = false} = props;
    return (
        <div className='modall'>
        <AntdModal
            footer={null}
            keyboard={false}
            maskClosable={backdropClosable}
            className={`ub-modal ${className}`}
            closeIcon={imagesUrl.icons.cancelBlackBackground}
            {...props}
        >
            {children}
        </AntdModal>
            {/* <div className={`ub-modal{}${className}`} maskClosable={backdropClosable} {...props}>
                <span>abcd</span>
                {children}
            </div> */}

        </div>
    );
};

Modal.propTypes = {};

export default Modal;
