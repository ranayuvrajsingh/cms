import { ImageCell } from '../../components/TableCells/ImageCell';
import { TextCell } from '../../components/TableCells/TextCell';
import { ColumnHeaderWithSorter } from '../../components/ColumnHeaderWithSorter';
import { DateCell } from '../../components/TableCells/DateCell';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import { COLUMN_ACTIONS } from '../../constants/dummyData';

export const returnUserColumns = (onSort, sortColumn, performColumnAction) => [
  {
    title: 'Image',
    width: '13%',
    render: (rowData) => <ImageCell data={rowData?.image} />,
  },
  {
    title: ({ ...colProp }) => (
      <ColumnHeaderWithSorter
        title={'Name'}
        sortKey={'name'}
        onSort={onSort}
        sortCol={sortColumn}
        {...colProp}
      />
    ),
    width: '10.5%',
    render: (rowData) => (
      <TextCell sortedColumn={true} isBold={true} data={rowData?.name} />
    ),
  },
  {
    title: 'Email',
    width: '20%',
    render: (rowData) => <TextCell data={rowData?.email} />,
  },


  // {
  //   title: ({ ...colProp }) => (
  //     <ColumnHeaderWithSorter
  //       title={'City'}
  //       sortKey={'city'}
  //       onSort={onSort}
  //       sortCol={sortColumn}
  //       {...colProp}
  //     />
  //   ),
  //   width: '10.5%',
  //   render: (rowData) => (
  //     <TextCell sortedColumn={true} isBold={true} data={rowData?.city} />
  //   ),
  // },
  {
    title: ({ ...colProp }) => (
      <ColumnHeaderWithSorter
        title={'Created On'}
        sortKey={'createdAt'}
        onSort={onSort}
        sortCol={sortColumn}
        {...colProp}
      />
    ),
    render: (rowData) => (
      <DateCell
        sortedColumn={true}
        data={rowData?.createdAt}
        format={'Do MMM YYYY'}
      />
    ),
  },
 
  {
    title: 'Status',
    render: (rowData) => (
      <ToggleCell
        status={rowData?.isActive}
        onToggle={(isActive) =>
          performColumnAction(
            COLUMN_ACTIONS.TOGGLE_STATUS,
            rowData.id,
            isActive
          )
        }
      />
    ),
  },
];