import { ImageCell } from '../../components/TableCells/ImageCell';
import { TextCell } from '../../components/TableCells/TextCell';
import { ColumnHeaderWithSorter } from '../../components/ColumnHeaderWithSorter';
import { DateCell } from '../../components/TableCells/DateCell';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import { Rating } from '../../components/Rating';
import { COLUMN_ACTIONS } from '../../constants/dummyData';
import { ContentInfoCell } from '../../components/TableCells/ContentInfoCell';
import { StarredCell } from '../../components/TableCells/StarredCell';
import { ExtraInfoCell } from '../../components/TableCells/ExtraInfoCell';
import { DeleteOutlined } from '@ant-design/icons';
import ConfirmationPopup from '../../components/ConfirmationPopup';
import  { Checkbox } from 'antd';

export const returnArticlesColumns = ({
  innerTab,
  onSort,
  sortColumn,
  performColumnAction,
  selectedIds,
  setSelectedIds,
 
}) => 
  [
  
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
    render: (rowData) => (
      <ImageCell isTrending={false} data={rowData?.coverImage} />
    ),
  },
  {
    // title: 'Title',
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
    render: (rowData) => <ContentInfoCell   text={true}  contentType= "Article" title={rowData.title} 
    author={rowData.author} publisheOnDate={rowData.createdAt}/>,
  },
  // {
  //   title: 'Component',
  //   width: '11%',
  //   render: (rowData) => <TextCell data={rowData.component.join(", ")} />,
  // },
  // {
  //   title: ({ ...colProp }) => (
  //     <ColumnHeaderWithSorter
  //       title={'Category'}
  //       sortKey={'category'}
  //       onSort={onSort}
  //       sortCol={sortColumn}
  //       {...colProp}
  //     />
  //   ),
  //   width: '11%',
  //   render: (rowData) => (
  //     <TextCell sortedColumn={true} data={rowData.category?.name} />
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
export const returnChannelsColumns = ({
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
    width: '7%',
    render: (rowData) => <ImageCell data={rowData?.image} />,
  },
  // {
  //   title: ({ ...colProp }) => (
  //     <ColumnHeaderWithSorter
  //       title={'Title'}
  //       sortKey={'name'}
  //       onSort={onSort}
  //       sortCol={sortColumn}
  //       {...colProp}
  //     />
  //   ),
  //   width: '13%',
  //   render: (rowData) => <TextCell sortedColumn={true} data={rowData.name} />,
  // },
  {
    width: '13%',
    render: (rowData) => <ContentInfoCell text={true}  contentType= "Channel" title={rowData.name} 
     publisheOnDate={rowData.createdAt}/>,
  },
  // {
  //   title: 'Medium',
  //   width: '11%',
  //   render: (rowData) => <TextCell data={rowData.medium_type?.name} />,
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
     city ={rowData.city?.map(city=>{return city.name})}
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
  title: 'No. of Articles',
  width: '11%',
  render: (rowData) => (
    <TextCell
      data={rowData.articles && `${rowData.articles?.length}  ${rowData.articles?.length === 1 ? 'Article' : 'Articles'}`}
    />
  ),
},
 
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
  //       format={'DD MMM YYYY'}
  //     />
  //   ),
  // },

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
// export const returnExperiencesColumns = ({
//   onSort,
//   sortColumn,
//   performColumnAction,
// }) => [
//   {
//     title: 'Image',
//     width: '7%',
//     render: (rowData) => <ImageCell data={rowData?.images?.[0]} />,
//   },
//   {
//     title: ({ ...colProp }) => (
//       <ColumnHeaderWithSorter
//         title={'Title'}
//         sortKey={'title'}
//         onSort={onSort}
//         sortCol={sortColumn}
//         {...colProp}
//       />
//     ),
//     width: '13%',
//     render: (rowData) => <TextCell sortedColumn={true} data={rowData.title} />,
//   },
//   {
//     title: 'Location',
//     width: '11%',
//     render: (rowData) => <TextCell data={rowData.city?.name} />,
//   },
//   {
//     title: ({ ...colProp }) => (
//       <ColumnHeaderWithSorter
//         title={'Rating'}
//         sortKey={'rating'}
//         onSort={onSort}
//         sortCol={sortColumn}
//         {...colProp}
//       />
//     ),
//     width: '11%',
//     render: (rowData) => (
//       <Rating
//         onHoverChange={() => {}}
//         disabled={true}
//         sortedColumn={true}
//         value={rowData.rating?.toFixed(1)}
//       />
//     ),
//   },
//   {
//     title: ({ ...colProp }) => (
//       <ColumnHeaderWithSorter
//         title={'Price'}
//         sortKey={'pricePerPass'}
//         onSort={onSort}
//         sortCol={sortColumn}
//         {...colProp}
//       />
//     ),
//     width: '11%',
//     render: (rowData) => (
//       <TextCell
//         data={rowData.pricePerPass && `₹ ${rowData.pricePerPass}/person`}
//       />
//     ),
//   },
//   {
//     title: ({ ...colProp }) => (
//       <ColumnHeaderWithSorter
//         title={'Published on'}
//         sortKey={'createdAt'}
//         onSort={onSort}
//         sortCol={sortColumn}
//         {...colProp}
//       />
//     ),
//     width: '15%',
//     render: (rowData) => (
//       <DateCell
//         sortedColumn={true}
//         data={rowData.createdAt}
//         format={'Do MMM YYYY'}
//       />
//     ),
//   },

//   {
//     title: 'Status',
//     width: '7%',
//     render: (rowData) => (
//       <ToggleCell
//         status={rowData?.isActive}
//         onToggle={(isActive) =>
//           performColumnAction(
//             COLUMN_ACTIONS.TOGGLE_STATUS,
//             rowData.id,
//             isActive
//           )
//         }
//       />
//     ),
//   },
// ];
// ARTICLES

// export const returnAuthorsColumns = ({
//   onSort,
//   sortColumn,
//   performColumnAction,
// }) => [
//   {
//     title: 'Image',
//     width: '6%',
//     render: (rowData) => <ImageCell data={rowData?.image} />,
//   },
 
//   {
//     title: 'Name',
//     width: '7%',
//     render: (rowData) => <TextCell isBold={true} data={rowData?.name} />,
//   },
//   {
//     title:'Email',
//     width: '25%',
//     render:(rowData) => <TextCell data={rowData?.email} />
//   }

// ];
