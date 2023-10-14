import React from "react";
import { useEffect } from "react";
import { TrashIcon } from "../../assets/svgs";
import { DeleteOutlined } from '@ant-design/icons';
import './MultipleDeleteComp.scss';

 const MultipleDeleteComp = ({
    setMulti,
    setShowConfirmationModal,
    ...props
  }) => {

    return (
        <div className="multiple-delete-component">
            <div className="multiple-delete-left">
              Delete Selected Items
            </div>
            <div className="multiple-delete-right">
                <DeleteOutlined className="trashicon" onClick={()=>{console.log('clicked'); setMulti('many'); setShowConfirmationModal(true)}}/>
            </div>
        </div>
    );
};

export default MultipleDeleteComp;


