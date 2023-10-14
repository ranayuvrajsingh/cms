import { ImageCell } from '../../components/TableCells/ImageCell';
import { TextCell } from '../../components/TableCells/TextCell';
import { ColumnHeaderWithSorter } from '../../components/ColumnHeaderWithSorter';
import { DateCell } from '../../components/TableCells/DateCell';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import { COLUMN_ACTIONS } from '../../constants/dummyData';
import { Rating } from '../../components/Rating';
import { Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const returnTagsColumns = ({
  innerTab,
  onSort,
  sortColumn,
  performColumnAction,
  selectedIds,
  setSelectedIds,
}) => [
  // {
  //   title: 'Image',
  //   width: '7%',
  //   render: (rowData) => (
  //          <TextCell sortedColumn={true} data={rowData.name} />
  //        ),
  //   },
  {
    title:'Select',
    width: '3%', 
    render: (rowData) => (
      <Checkbox  onClick={(()=> {
        if(selectedIds.includes(rowData.id)){
          setSelectedIds(selectedIds.filter((id)=>id!==rowData.id))
        }else{
          setSelectedIds([...selectedIds,rowData.id])
        }
      })}/>
    ),
  },
  {
    title: ({ ...colProp }) => (
      <ColumnHeaderWithSorter
        title={'Title'}
        sortKey={'title'}
        onSort={onSort}
        sortCol={sortColumn}
        {...colProp}
      />
    ),
    width: '13%',
    render: (rowData) => (
    <TextCell sortedColumn={true} data={rowData.name} />),
  },
  {
    title: 'Short Description',
    width: '11%',
    render: (rowData) => <TextCell data={rowData.shortDescription} />,
  },
  {
    title: 'Published At',
    width: '11%',
    render: (rowData) => <DateCell
    sortedColumn={true}
    data={rowData?.createdAt}
    format={'Do MMM YYYY'}
  />,
  },
  {
    title: 'Status',
    width: '5%',
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
  {
    width: '3%',
    render: (rowData) => (
      <DeleteOutlined
        onClick={() =>{
          performColumnAction &&
          performColumnAction(
            COLUMN_ACTIONS.DELETE,
            rowData.id,
            
          )
        }
      }
      />
    ),
  },


];

export const returnRolesColumns = ({
  innerTab,
  onSort,
  sortColumn,
  performColumnAction,
  selectedIds,
  setSelectedIds,
}) => [
  // {
  //   title: 'Image',
  //   width: '7%',
  //   render: (rowData) => (
  //          <TextCell sortedColumn={true} data={rowData.name} />
  //        ),
  //   },
  {
    title:'Select',
    width: '3%', 
    render: (rowData) => (
      <Checkbox  onClick={(()=> {
        if(selectedIds.includes(rowData.id)){
          setSelectedIds(selectedIds.filter((id)=>id!==rowData.id))
        }else{
          setSelectedIds([...selectedIds,rowData.id])
        }
      })}/>
    ),
  },
  {
    title: ({ ...colProp }) => (
      <ColumnHeaderWithSorter
        title={'Title'}
        sortKey={'title'}
        onSort={onSort}
        sortCol={sortColumn}
        {...colProp}
      />
    ),
    width: '13%',
    render: (rowData) => (
    <TextCell sortedColumn={true} data={rowData.name} />),
  },
  {
    title: 'Permissions',
    width: '11%',
    render: (rowData) => <TextCell data={rowData.permissions?.length} />,
  },
  {
    title: 'Published At',
    width: '11%',
    render: (rowData) => <DateCell
    sortedColumn={true}
    data={rowData?.createdAt}
    format={'Do MMM YYYY'}
  />,
  },
  {
    title: 'Status',
    width: '5%',
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
  {
    width: '3%',
    render: (rowData) => (
      <DeleteOutlined
        onClick={() =>{
          performColumnAction &&
          performColumnAction(
            COLUMN_ACTIONS.DELETE,
            rowData.id,
            
          )
        }
      }
      />
    ),
  },


];