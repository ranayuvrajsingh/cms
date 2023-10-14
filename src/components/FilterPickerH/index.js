import {Modal as AntdModal} from 'antd';
import React from 'react';
import {imagesUrl} from '../../constants/imagesUrl';


const FilterPickerH = (props) => {
    const {className, children, backdropClosable = false} = props;
    return (
        <div className='filterpicker'>
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
        </div>
    );
};

Modal.propTypes = {};

export default Modal;
