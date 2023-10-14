import { ImageCell } from '../../components/TableCells/ImageCell';
import { TextCell } from '../../components/TableCells/TextCell';
import { ColumnHeaderWithSorter } from '../../components/ColumnHeaderWithSorter';
import { DateCell } from '../../components/TableCells/DateCell';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import { COLUMN_ACTIONS } from '../../constants/dummyData';
import { Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const returnCityColumns = ({
  innerTab,
  onSort,
  sortColumn,
  performColumnAction,
  selectedIds,
  setSelectedIds,
}) => [
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
    title: 'State',
    width: '20%',
    render: (rowData) => <TextCell data={rowData?.state?.name} />,
  },
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
    title: 'Fact/Description',
    width: '30%',
    render: (rowData) => <TextCell enableReadMore={true} data={rowData?.description} />,
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
export const returnStatesColumns = (
  innerTab,
  onSort,
  sortColumn,
  performColumnAction,
  selectedIds,
  setSelectedIds,
) => [
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
        title={'State'}
        sortKey={'name'}
        onSort={onSort}
        sortCol={sortColumn}
        {...colProp}
      />
    ),
    width: '6%',
    render: (rowData) => (
      <TextCell sortedColumn={true} isBold={true} data={rowData?.name} />
    ),
  },
  {
    title: '# Cities',
    width: '7%',
    render: (rowData) => (
      <TextCell data={rowData?.cityCount?.toString()?.padStart(2, 0)} />
    ),
  },
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
    width: '5%',
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
