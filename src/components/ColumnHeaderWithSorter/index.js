import React, { useState } from 'react';
import { ChevronButtonIcon } from '../../assets/svgs';
import './index.scss';

const SORT_ORDERS = {
  asc: 'ASC',
  desc: 'DESC',
};
export const ColumnHeaderWithSorter = ({
  title,
  onSort,
  sortKey,
  sortCol = 's',
  ...props
}) => {
  const [sortOrder, setSortOrder] = useState(SORT_ORDERS.desc);

  return (
    <div
      className={'column-header-sorter'}
      onClick={() => {
        let sort =
          sortOrder === SORT_ORDERS.desc ? SORT_ORDERS.asc : SORT_ORDERS.desc;
        setSortOrder(sort);

        onSort(sort, sortKey);
      }}
    >
      {React.isValidElement(title) ? { title } : <div>{title}</div>}
      <div
        className={`sort-button ${sortCol === sortKey ? 'active-sort ' : ''}${
          sortOrder === SORT_ORDERS.desc ? 'reverse' : ''
        }`}
      >
        <ChevronButtonIcon />
      </div>
    </div>
  );
};
/**
 * Props:
 *      -title: <ReactNode|String> Title of column header
 *      -sortKey: <String> The key on which you want the sorting to be done. Should be present in the response structure
 *      -sortCol: <String> The active column on which sorting has to be done
 *      -onSort : <Function> Callback function gets triggered when sorter is clicked
 *
 * */
