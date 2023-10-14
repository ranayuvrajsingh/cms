import { TextCell } from '../../components/TableCells/TextCell';
import { ColumnHeaderWithSorter } from '../../components/ColumnHeaderWithSorter';
import { DateCell } from '../../components/TableCells/DateCell';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import { ColorCell } from '../../components/TableCells/ColorCell';
import { COLUMN_ACTIONS } from '../../constants/dummyData';

export const returnCategoryColumns = ({
  onSort,
  sortColumn,
  performColumnAction,
}) => [
  // {
  //   title: 'S.No',
  //   width: '7%',
  //   render: (rowData, _, index) => (
  //     <TextCell data={(++index)?.toString()?.padStart(2, 0) + '.'} />
  //   ),
  // },
  {
    title: 'Category Name',
    width: '16%',
    render: (rowData) => (
      <TextCell sortedColumn={true} isBold={true} data={rowData.name} />
    ),
  },
  {
    title: 'Description',
    width: '25%',
    render: (rowData) => (
      <TextCell enableReadMore={true} data={rowData.shortDescription} />
    ),
  },
  {
    title: 'No. of Tags',
    width: '20%',
    render: (rowData) => <TextCell data={rowData.tagCount?.toString()} />,
  },

  {
    title: 'Color Code',
    width: '16%',
    render: (rowData) => <ColorCell data={rowData.colorCode} />,
  },
  {
    // width: '20%',
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
        data={rowData.createdAt}
        format={'Do MMM YYYY'}
      />
    ),
  },
  {
    width: '8%',
    title: 'Status',
    render: (rowData) => (
      <ToggleCell
        status={rowData?.isActive}
        onToggle={(isActive) =>
          performColumnAction &&
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
export const returnTagsColumn = ({ onSort, sortColumn }) => [
  {
    title: 'Name Of Tag',
    width: '6%',
    render: (rowData) => (
      <TextCell sortedColumn={false} isBold={true} data={rowData.name} />
    ),
  },
  {
    title: 'Category',
    width: '7%',
    render: (rowData) => (
      <TextCell
        sortedColumn={false}
        isBold={true}
        data={rowData.category?.name}
      />
    ),
  },
  {
    title: 'Description',
    width: '25%',
    render: (rowData) => (
      <TextCell enableReadMore={true} data={rowData.shortDescription} />
    ),
  },
];
