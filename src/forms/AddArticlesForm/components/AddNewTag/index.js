import { Button, Input } from 'antd';
import './index.scss';
import { useState } from 'react';

export const AddNewTag = ({ onAdd, ...props }) => {
  const [tagName, setTagName] = useState('');

  return (
    <div className={'add-new-tag-container'}>
      <Input
        value={tagName}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          setTagName(e?.target?.value);
        }}
        placeholder={'Enter new tag here'}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          onAdd(tagName);
          setTimeout(() => setTagName(''), 400);
        }}
        className=""
        type="primary"
        htmlType="submit"
      >
        Add Tag
      </Button>
    </div>
  );
};
