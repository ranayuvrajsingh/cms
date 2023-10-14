import {Modal as AntdModal} from 'antd';
import React, { useEffect } from 'react';
// import {imagesUrl} from '../../constants/imagesUrl';
import './index.scss';
// import './Modal.scss';


const ConfirmationPopup = (props) => {
    const {handleMultiSelect,
        children,
         backdropClosable = false, 
         setShowConfirmationModal,
          handleDelete,
          multi,
        //   rowId,
        //   innerTab,
          } = props;
          useEffect(() => { 
        }, []); 
    return (


        <div className='modall-2'>
            
        {multi =='single' &&
        <AntdModal
            footer={null}
            keyboard={false}
            {...props}
            closeIcon={false}
        >   
        <h1 className='heading'>Confirm Delete</h1>
            <span className='confirmation-text'>This will be permanently deleted</span> <br/><br/>
            <button className='confirm' onClick={handleDelete}>Confirm</button>
            <button className='can' onClick={()=>{setShowConfirmationModal(false)}}>Cancel</button>
        </AntdModal>
    }
{multi == 'many' &&
    <AntdModal
            footer={null}
            keyboard={false}
            closeIcon={false}
            {...props}

        >   
        <h1 className='heading'>Confirm Delete</h1>
            <span className='confirmation-text'>Selected items will be permanently deleted</span><br/> <br/>
            <button className='confirm' onClick={handleMultiSelect}>Confirm</button>
            <button className='can' onClick={()=>{setShowConfirmationModal(false)}}>Cancel</button>
        </AntdModal>
}
        </div>
    );
    
};

ConfirmationPopup.propTypes = {};

export default ConfirmationPopup;
