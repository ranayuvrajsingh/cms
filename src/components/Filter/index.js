// import Modal from '../Modal';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { ChevronButtonIcon } from '../../assets/svgs';
// import './index.scss';
// import { Button, Checkbox, Menu, Select, Space, Dropdown } from 'antd';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as RootActions from '../../store/root/actions';
// import { DateRangePicker } from '../DatePicker/index';
// import moment from 'moment';
// import { generateOptions } from '../../utils/helper';
// import cloneDeep from 'lodash/cloneDeep';
// import uniqBy from 'lodash/uniqBy';
// import {Modal as AntdModal} from 'antd';
// import { DownOutlined } from '@ant-design/icons';


// const FILTERS = ['date created', 'location', 'isFeatured', 'Tags', 'Inactive Content'];
// const createCheckBoxOptions = (data) => {
//   if (data?.length === 0) return [];
//   return data?.map((item) => ({
//     label: item.name,
//     value: item.id,
//   }));
// };

// const Filter = ({
//   isFilterVisible,
//   setFilterVisible,
//   onApply,
//   innerTab,
//   nowactiveFilter,
//   setSelectedFilters,
//   selectedFilters,
//   // setShowFilters,
//   // showFilters,
//   ...props
// }) => {
//   const [activeFilterType, setActiveFilterType] = useState('');
//   const [activeFilters, setActiveFilters] = useState({});
//   const [acctiveFilter, setAcctiveFilter] = useState (nowactiveFilter)
//     const isFetchingMore = useRef(false);
//   const [issFilterVisible, setIssFilterVisible] = useState(isFilterVisible);
//   const [showwFilterVisible, setshowwFilterVisible] = useState(false);
//   const [location, setLocation]  = useState({})
//   const [dateCreated, setdateCreated] = useState({})
//   const [filterss, setFilterss] = useState({})
//   const [dataList, setDataList] = useState({
//     cities: {},
//     categories: {},
//   });
  

//   useEffect(() => {
//   },[])



//   useEffect(() => {
//     setActiveFilterType(acctiveFilter);
//     // setAcctiveFilter(selectedFilters);

//   },[acctiveFilter]);
//   //here dependency was acctiveFilter

//   useEffect(() => {
//     if (issFilterVisible) {
//       props.fetchFromReduxOrNetwork('categories');
//       props.fetchFromReduxOrNetwork('cities');
//       props.fetchFromReduxOrNetwork('articles');
//       setActiveFilters({
//         categories:
//           props[innerTab]?.filters?.category__in ||
//           props[innerTab]?.filters?.id__in,
//         location: props[innerTab]?.filters?.city__in,
//         'date created':
//           props[innerTab]?.filters?.createdAt__gte?.length > 0 &&
//           props[innerTab]?.filters?.createdAt__lte?.length > 0
//             ? [
//                 props[innerTab]?.filters?.createdAt__gte,
//                 props[innerTab]?.filters?.createdAt__lte,
//               ]
//             : '',
//         'isFeatured': props[innerTab]?.filters?.isFeatured,
//       });
//       setLocation({'location':props[innerTab]?.filters?.city__in});
//       setdateCreated({
//         'date created':
//         props[innerTab]?.filters?.createdAt__gte?.length > 0 &&
//         props[innerTab]?.filters?.createdAt__lte?.length > 0
//           ? [
//               props[innerTab]?.filters?.createdAt__gte,
//               props[innerTab]?.filters?.createdAt__lte,
//             ]: ''})
//       let tempData = cloneDeep(dataList);
//       generateOptions(tempData, props.cities, null, 'cities');
//       generateOptions(tempData, props.categories, null, 'categories');
//       setDataList(tempData);
      
//     }

//   }, [issFilterVisible]);

//   const onChange = (values) => {

//     let obj = {
//       ...location,
//       location: values,
//     };
//     setLocation({'location':values});
//     setActiveFilters(obj);
//   };
//   const handleDate = (date, dateString) => {
//     let dates = dateString.map((el) => moment(el).toISOString());
//     let obj = {
//       ...activeFilters,
//      ['date created']: dates,
//     };
//     setdateCreated({'date Created':dates});
//     setActiveFilters(obj);
//   };

//   const getFilterCount = (category) => {
//     if (!activeFilters[category]?.length) return '';
//     return `(${activeFilters[category]?.length})`;
//   };

//   const getOptions = useCallback(() => {
//     switch (activeFilterType) {
//       case 'categories':
//         return createCheckBoxOptions(dataList.categories?.readonlyList);
//       case 'location':
//         return createCheckBoxOptions(dataList.cities?.readonlyList);
//       case 'date created':
//         return;
//       case 'isFeatured':
//         return;
//     }
//   }, [
//     dataList.categories?.readonlyList,
//     dataList.cities?.readonlylist,
//     activeFilterType,
//   ]);

//   // useEffect(() => {
//   //   setActiveFilters({});
//   //   setActiveFilterType('location');
//   // }, [innerTab]);

//   const onScrollEndReached = (event) => {
//     if (
//       (Math.ceil(event.target.scrollHeight - event.target.scrollTop) ===
//         event.target.clientHeight ||
//         Math.floor(event.target.scrollHeight - event.target.scrollTop) ===
//           event.target.clientHeight) &&
//       !isFetchingMore?.current
//     ) {
//       //TODO: call the logic to fetch another data here

//       let filterType =
//         activeFilterType == 'categories'
//           ? 'categories'
//           : activeFilterType == 'location'
//           ? 'cities'
//           : '';

//       let page = dataList?.[filterType]?.metadata?.next;

//       if (page) {
//         isFetchingMore.current = true;
//         props
//           .fetchDataForInnerTabs(
//             filterType,
//             `page=${page}&limit=10`,
//             true,
//             false
//           )
//           .then((res) => {
//             let tempData = { ...dataList };
//             tempData[filterType].page = page;
//             tempData[filterType].readonlyList = [
//               ...tempData[filterType].readonlyList,
//               ...(res?.data || []),
//             ];
//             tempData[filterType].metadata = res?.metadata || {};
//             tempData[filterType].readonlyList = uniqBy(
//               tempData[filterType].readonlyList,
//               'id'
//             );
//             setDataList(tempData);
//             isFetchingMore.current = false;
//           })
//           .catch((err) => {
//             isFetchingMore.current = false;
//           });
//       }
//     }
//   };
//   const menu = (

//     <Menu>
     
//             <Menu.Item key="0"> 
//             <span>{acctiveFilter}</span>
//             <button onClick={() => {setSelectedFilters(selectedFilters.filter(item => item!==acctiveFilter))}}>Close</button>
    
//       </Menu.Item>
//       <Menu.Item key="1"> 
//       {activeFilterType == 'date created' ? (
//         <DateRangePicker
//           value={activeFilters[acctiveFilter]}
//           format="YYYY-MM-DD"
//           onChange={handleDate}
//         />
//       ): 
//     activeFilterType == 'location' ? (
//       <div onScroll={onScrollEndReached} className='filter-value-section'>
//       <Checkbox.Group
//         className={'filter-value-group'}
//         value={activeFilters[acctiveFilter]}
//         options={getOptions()}
//         onChange={onChange}
//      />
//      </div>
//       ): null}
      
    
//       </Menu.Item>
//       <Menu.Item key="2">
//       <Button
//           disabled={
//             activeFilters?.location?.length === 0 &&
//             activeFilters?.categories?.length === 0 &&
//             activeFilters['date created']?.length === 0
//           }
//           onClick={() => {
            
//             let filters = { ...activeFilters };
//             if(location.length > 0){
//               setFilterss({...filterss,loc:location})
//             }
//             if(dateCreated.length > 0){
//               setFilterss({...filterss,date:dateCreated})
//             }
//             filters.page = 1;
//             filters.city__in = filterss['location'];
//             {
//               innerTab === 'categories'
//                 ? (filters.id__in = filterss['categories'])
//                 : (filters.category__in = filterss['categories']);
//             }

//             filters.createdAt__gte = filterss['date created']?.[0];
//             filters.createdAt__lte = filterss['date created']?.[1];
//             filters.isFeatured = filterss['isFeatured'];
//             // delete filters.categories;
//             // delete filters.location;
//             // delete filters['isFeatured'];
//             // delete filters['date created'];

//             onApply?.(filters);
//           }}
//           type="primary"
//         >
//           Apply
//         </Button>
//       </Menu.Item>
//       <Menu.Item key="3">
//       <Button
//           onClick={() => {
//             props.updateFilters(innerTab, {});
//             setActiveFilters({});
//             onApply?.({
//               page: 1,
//               city__in: '',
//               category__in: '',
//               createdAt__gte: '',
//               createdAt__lte: '',
//               id__in: '',
//             });
//           }}
//           type="text-button"
//           style={{
//             marginLeft: 15,
//             padding: '0 30px',
//             // paddingLeft: 40,
//           }}
//         >
//           Reset
//         </Button>
//       </Menu.Item>
//       {/* <Menu.Item key="4">
//       <Button onClick={() => {
//         setIssFilterVisible(false);
//         setIssFilterVisible
//       }} type="text-button">\
//           Cancel
//         </Button>
//       </Menu.Item> */}
//       <Menu.Item key="4">
//         {/* <Button onClick={() => {
//           // setShowFilters(false);
//           setIssFilterVisible(false);
//           setshowwFilterVisible(false);
//           }}>close2</Button> */}
//       </Menu.Item>
//     </Menu>
//   );


//   return (
//     // <Modal
//     //   width="1000px"
//     //   title={
//     //     <p className="flex items-center color-black weight-700 size-20">
//     //       Apply Filter
//     //     </p>
//     //   }
//     //   destroyOnClose
//     //   onCancel={() => {
//     //     setFilterVisible(false);
//     //   }}
//     //   visible={issFilterVisible}
//     //   className={'filter-section'}
//     // >
//       // <div className="flex flex-row">
//       //   <div className={'filter-category-section'}>
//       //     {FILTERS.map((item) => (
//       //       <div
//       //         onClick={() => {
//       //           setActiveFilterType(item);
//       //         }}
//       //         className={[
//       //           'flex flex-row justify-between filter-category',
//       //           activeFilterType === item ? 'active' : '',
//       //         ].join(' ')}
//       //       >
//       //         <div className="flex flex-row items-center">
//       //           <p className={'filter-label'}>{item}</p>
//       //           <span>{getFilterCount(item)}</span>
//       //         </div>
//       //         <ChevronButtonIcon />
//       //       </div>
//       //     ))}
//       //   </div>
//       //   <div onScroll={onScrollEndReached} className={'filter-value-section'}>
//       //     <Checkbox.Group
//       //       className={'filter-value-group'}
//       //       value={activeFilters[activeFilterType]}
//       //       options={getOptions()}
//       //       onChange={onChange}
//       //     />
//       //     {activeFilterType == 'date created' ? (
//       //       <DateRangePicker
//       //         value={activeFilters[activeFilterType]}
//       //         format="YYYY-MM-DD"
//       //         onChange={handleDate}
//       //       />
//       //     ) : null}
//       //   </div>
//       // </div>
//       // <div className="buttons">
//       //   <Button
//       //     disabled={
//       //       activeFilters?.location?.length === 0 &&
//       //       activeFilters?.categories?.length === 0 &&
//       //       activeFilters['date created']?.length === 0
//       //     }
//       //     onClick={() => {
//       //       let filters = { ...activeFilters };
//       //       filters.page = 1;
//       //       filters.city__in = filters['location'];
//       //       {
//       //         innerTab === 'categories'
//       //           ? (filters.id__in = filters['categories'])
//       //           : (filters.category__in = filters['categories']);
//       //       }

//       //       filters.createdAt__gte = filters['date created']?.[0];
//       //       filters.createdAt__lte = filters['date created']?.[1];

//       //       delete filters.categories;
//       //       delete filters.location;
//       //       delete filters['date created'];

//       //       onApply?.(filters);
//       //     }}
//       //     type="primary"
//       //   >
//       //     Apply
//       //   </Button>
//       //   <Button
//       //     onClick={() => {
//       //       props.updateFilters(innerTab, {});
//       //       setActiveFilters({});
//       //       onApply?.({
//       //         page: 1,
//       //         city__in: '',
//       //         category__in: '',
//       //         createdAt__gte: '',
//       //         createdAt__lte: '',
//       //         id__in: '',
//       //       });
//       //     }}
//       //     type="text-button"
//       //     style={{
//       //       marginLeft: 15,
//       //       padding: '0 30px',
//       //       // paddingLeft: 40,
//       //     }}
//       //   >
//       //     Reset
//       //   </Button>
//       // </div>
//     // </Modal>
//     <div className='filter'>    
   
//           <div>
          
//             {/* <Select mode="multiple" value={acctiveFilter} style={{width:'300px'}} className="selectfilter">  */}
//             <Dropdown overlay={menu} className='drops' trigger={["click"]} visible={showwFilterVisible}  onClick={(e) => {
//               e.preventDefault();
//         setshowwFilterVisible(!showwFilterVisible);
//               setAcctiveFilter(acctiveFilter);
     
//       }}>
//               <a  className="ant-dropdown-link">
//               <span>{acctiveFilter}</span> <DownOutlined /> 
//               <div>
//               {/* <h3>{acctiveFilter}</h3> <DownOutlined />
//              <Checkbox.Group
//            className={'filter-value-group'}
//             value={activeFilters[activeFilterType]}
//             options={getOptions()}
//              onChange={onChange}
             
//           />
//           {activeFilterType == 'date created' ? (
//              <DateRangePicker
//                value={activeFilters[activeFilterType]}
//                format="YYYY-MM-DD"
//                onChange={handleDate}
//            />
//          ) : null}  */}
          

//              </div> 
//          {/* </Select> */}
//          </a>
//          </Dropdown>
//          {/* <div className="buttons">
//         <Button
//           disabled={
//             activeFilters?.location?.length === 0 &&
//             activeFilters?.categories?.length === 0 &&
//             activeFilters['date created']?.length === 0
//           }
//           onClick={() => {
//             let filters = { ...activeFilters };
//             filters.page = 1;
//             filters.city__in = filters['location'];
//             {
//               innerTab === 'categories'
//                 ? (filters.id__in = filters['categories'])
//                 : (filters.category__in = filters['categories']);
//             }

//             filters.createdAt__gte = filters['date created']?.[0];
//             filters.createdAt__lte = filters['date created']?.[1];
//             filters.isFeatured = filters['isFeatured'];
//             delete filters.categories;
//             delete filters.location;
//             delete filters['isFeatured'];
//             delete filters['date created'];

//             onApply?.(filters);
//           }}
//           type="primary"
//         >
//           Apply
//         </Button>
//         <Button
//           onClick={() => {
//             props.updateFilters(innerTab, {});
//             setActiveFilters({});
//             onApply?.({
//               page: 1,
//               city__in: '',
//               category__in: '',
//               createdAt__gte: '',
//               createdAt__lte: '',
//               id__in: '',
//             });
//           }}
//           type="text-button"
//           style={{
//             marginLeft: 15,
//             padding: '0 30px',
//             // paddingLeft: 40,
//           }}
//         >
//           Reset
//         </Button>
//       </div> */}


//       </div>

//     </div>
//   );
// };
// const mapStateToProps = ({
//   categories,
//   news,
//   cities,
//   collections,
//   experiences,
//   states,
//   articles,
// }) => ({
//   articles,
//   categories,
//   states,
//   collections,
//   experiences,
//   cities,
//   news,
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchFromReduxOrNetwork: bindActionCreators(
//     RootActions.fetchFromReduxOrNetwork,
//     dispatch
//   ),
//   fetchDataForInnerTabs: bindActionCreators(
//     RootActions.fetchDataForInnerTabs,
//     dispatch
//   ),
//   updateFilters: bindActionCreators(RootActions.updateFilters, dispatch),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Filter);