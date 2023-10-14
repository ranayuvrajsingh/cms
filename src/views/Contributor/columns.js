import { ImageCell } from '../../components/TableCells/ImageCell';
import { TextCell } from '../../components/TableCells/TextCell';
import { ColumnHeaderWithSorter } from '../../components/ColumnHeaderWithSorter';
import { DateCell } from '../../components/TableCells/DateCell';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import { COLUMN_ACTIONS } from '../../constants/dummyData';
import { Rating } from '../../components/Rating';
import { Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const returnAdminsColumns = ({
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
    title: 'Name',
    width: '7%',
    render: (rowData) => 

           <TextCell sortedColumn={true} data={rowData.name} />,
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
    render: (rowData) => <TextCell sortedColumn={true} data={rowData.email} />,
  },
  {
    title: 'Role',
    width: '11%',
    render: (rowData) => <TextCell data={rowData.role?.name} />,
  },
  // {
  //   title: 'Articles Published',
  //   width: '11%',
  //   render: (rowData) => <TextCell data={rowData.articles?.length} />,
  // },
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