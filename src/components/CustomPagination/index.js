import { ArrowButtonIcon, ArrowButtonIcon1, ArrowButtonIcon2 } from '../../assets/svgs';
import { Pagination } from 'antd';
import React from 'react';
import './index.scss';

export const CustomPagination = ({
  totalCount,
  onChange,
  pageSize = 10,
  current,
  defaultCurrent = 1,
}) => {
  if (totalCount === 0 || !totalCount) return null;
  return (
    <div  className='pagination'>
    <Pagination
    className='paginator'
      defaultCurrent={1}
      total={totalCount}
      pageSize={pageSize}
      current={current}
      hideOnSinglePage
      showSizeChanger={false}

      showTotal={(total, range) => (
        <div>
          Viewing
          <span className={'page-range'}>{` ${range[0]}- ${range[1]} `}</span>
          of {total}
        </div>
      )}

      onChange={onChange}
      itemRender={(current, type, originalElement) => {
        if (type === 'prev') {
          return <ArrowButtonIcon className="arrowbutton" />;
        }
        if (type === 'next') {
          return <ArrowButtonIcon className="arrowbutton"/>;
        }
        if (type === 'page') return null;
        return originalElement;
      }}

    />
    </div>  
  );
};
