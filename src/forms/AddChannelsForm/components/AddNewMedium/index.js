
        import { Button, Input } from 'antd';
import './index.scss';
import { useState } from 'react';

export const AddNewMedium = ({ onAdd, setMediumDiv, ...props  }) => {
  const [payload1, setpayload1] = useState({name: '', contentUrl: '', type: '', thumbnail: ''});

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
                placeholder={'Enter medium name'}
            />

        <p className="mb-10 mt-24 field-label">Content Url</p>
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

          <p className="mb-10 mt-24 field-label">type (example: audio, video or gif)</p>
            <Input
                value={payload1.type}
                onKeyDown={(e) => {
                e.stopPropagation();
                }}
                onChange={(e) => {
                setpayload1({...payload1, type : e?.target?.value});
                }}
                placeholder={'Enter Type'}
            />

        <p className="mb-10 mt-24 field-label">Thumbnail Image</p>
            <Input
                value={payload1.thumbnail}
                onKeyDown={(e) => {
                e.stopPropagation();
                }}
                onChange={(e) => {
                setpayload1({...payload1, thumbnail : e?.target?.value});
                }}
                placeholder={'Enter thumbnail image'}
            />
      <Button
        onClick={(e) => {
          e.preventDefault();
          onAdd(payload1);
          setTimeout(() => setpayload1({name: '', thumbnail: '', type:'', contentUrl:''}), 400);
          setMediumDiv(false)
        }}
        className=""
        type="primary"
        htmlType="submit"
      >
        Add Medium
      </Button>
    </div>
  );
};
