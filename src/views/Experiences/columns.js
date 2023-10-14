import { ImageCell } from '../../components/TableCells/ImageCell';
import { TextCell } from '../../components/TableCells/TextCell';
import { ColumnHeaderWithSorter } from '../../components/ColumnHeaderWithSorter';
import { DateCell } from '../../components/TableCells/DateCell';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import { COLUMN_ACTIONS } from '../../constants/dummyData';
import { Rating } from '../../components/Rating';
import { ContentInfoCell } from '../../components/TableCells/ContentInfoCell';
import { ExtraInfoCell } from '../../components/TableCells/ExtraInfoCell';
import { Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { StarredCell } from '../../components/TableCells/StarredCell';

export const returnExperiencesColumns = ({
  innerTab,
  onSort,
  sortColumn,
  selectedIds,
  setSelectedIds,
  performColumnAction,
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
    width: '7%',
    render: (rowData) => <ImageCell data={rowData?.images?.[0]} />,
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
    render: (rowData) => <ContentInfoCell text={true}  contentType= "Experience" title={rowData.title} 
     publisheOnDate={rowData.createdAt}/>,
  },
 
  // {
  //   width: '20%',
  //   render: (rowData) => (

  //     <ExtraInfoCell
  //       sortedColumn={true}
  //       // data={rowData.createdAt}
  //       tags={rowData.tags?.map(tag=> {return tag.name})}
  //        city ={rowData.city?.name}
  //       contributor ='Internal Team'
  //       inApp = {rowData.inApp ? 'Yes' : 'No'}
  //       inWeb = {rowData.inWeb ? 'Yes' : 'No'}
  //       format={'Do MMM YYYY'}
        
  //     />
  //   ), 
  // },

  {
    title: ({ ...colProp }) => (
      <ColumnHeaderWithSorter
        title={'Published on'}
        sortKey={'createdAt'}
        onSort={onSort}
        sortCol={sortColumn}
        {...colProp}
      />
    ),
    width: '20%',
    render: (rowData) => (
      <>
      <ExtraInfoCell
        sortedColumn={true}
        // data={rowData.createdAt}
        tags={rowData.tags?.map(tag=> {return tag.name})}
         city ={rowData.city?.name}
        contributor ='Internal Author'
        inApp = {rowData.inApp ? 'Yes' : 'No'}
        // inWeb = {rowData.inWeb ? 'Yes' : 'No'}
        // format={'Do MMM YYYY'}
      />
      <StarredCell
      showIn = 'App'
        status={rowData?.inApp}
        onToggle={(inApp) =>
          performColumnAction &&
          performColumnAction(
            COLUMN_ACTIONS.APP,
            rowData.id,
            inApp
          )
        }
      />
            <StarredCell
            showIn = 'Web'
        status={rowData?.inWeb}
        onToggle={(inWeb) =>
          performColumnAction &&
          performColumnAction(
            COLUMN_ACTIONS.WEB,
            rowData.id,
            inWeb
          )
        }
      />
      </>
    ),
  },
   {
    title: ({ ...colProp }) => (
      <ColumnHeaderWithSorter
        title={'Price'}
        sortKey={'pricePerPass'}
        onSort={onSort}
        sortCol={sortColumn}
        {...colProp}
      />
    ),
    width: '11%',
    render: (rowData) => (
      <TextCell
        data={rowData.pricePerPass && `₹ ${rowData.pricePerPass}/person`}
      />
    ),
  },

  {
    title: 'Featured',
    width: '7%',
    render: (rowData) => (
      <ToggleCell
        status={rowData?.isFeatured}
        onToggle={(isFeatured) =>{
          performColumnAction &&
          performColumnAction(
            COLUMN_ACTIONS.TOGGLE_STATUS,
            rowData.id,
            isFeatured
          )
        }
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




 // {
  //   title: 'Location',
  //   width: '11%',
  //   render: (rowData) => <TextCell data={rowData.city?.name} />,
  // },
  // {
  //   title: ({ ...colProp }) => (
  //     <ColumnHeaderWithSorter
  //       title={'Rating'}
  //       sortKey={'rating'}
  //       onSort={onSort}
  //       sortCol={sortColumn}
  //       {...colProp}
  //     />
  //   ),
  //   width: '11%',
  //   render: (rowData) => (
  //     <Rating
  //       onHoverChange={() => {}}
  //       disabled={true}
  //       sortedColumn={true}
  //       value={rowData.rating?.toFixed(1)}
  //     />
  //   ),
  // },
  // {
  //   title: ({ ...colProp }) => (
  //     <ColumnHeaderWithSorter
  //       title={'Price'}
  //       sortKey={'pricePerPass'}
  //       onSort={onSort}
  //       sortCol={sortColumn}
  //       {...colProp}
  //     />
  //   ),
  //   width: '11%',
  //   render: (rowData) => (
  //     <TextCell
  //       data={rowData.pricePerPass && `₹ ${rowData.pricePerPass}/person`}
  //     />
  //   ),
  // },
  // {
  //   title: ({ ...colProp }) => (
  //     <ColumnHeaderWithSorter
  //       title={'Published on'}
  //       sortKey={'createdAt'}
  //       onSort={onSort}
  //       sortCol={sortColumn}
  //       {...colProp}
  //     />
  //   ),
  //   width: '15%',
  //   render: (rowData) => (
  //     <DateCell
  //       sortedColumn={true}
  //       data={rowData.createdAt}
  //       format={'Do MMM YYYY'}
  //     />
  //   ),
  // },