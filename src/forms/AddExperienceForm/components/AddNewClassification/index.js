

  
import { Button, Input } from 'antd';
import './index.scss';
import { useState } from 'react';

export const AddNewClassification = ({ onAdd, setClassificationDiv, ...props  }) => {
  const [payload1, setpayload1] = useState({name: '', description: ''});

  return (
    <div >
     

        <p className="mb-10 mt-24 field-label">Name</p>
                <Input
                value={payload1.name}
                onKeyDown={(e) => {
                e.stopPropagation();
                }}
                onChange={(e) => {
                setpayload1({...payload1, name : e?.target?.value});
                }}
                placeholder={'Enter classification name'}
            />

        <p className="mb-10 mt-24 field-label">Description (Optional)</p>
            <Input
                value={payload1.contentUrl}
                onKeyDown={(e) => {
                e.stopPropagation();
                }}
                onChange={(e) => {
                setpayload1({...payload1, contentUrl : e?.target?.value});
                }}
                placeholder={'Enter content Url'}
            />

      <Button
        onClick={(e) => {
          e.preventDefault();
          onAdd(payload1);
          setTimeout(() => setpayload1({name: '', description: ''}), 400);
          setClassificationDiv(false)
        }}
        className=""
        type="primary"
        htmlType="submit"
      >
        Add Classification
      </Button>
    </div>
  );
};
